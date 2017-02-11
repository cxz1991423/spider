package com.innovate.spider.solr.service.base;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.SortClause;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.innovate.framework.query.generic.GenericDefaultPage;
import com.innovate.framework.query.generic.IGenericPage;
import com.innovate.spider.solr.exception.SolrErrorException;
import com.innovate.spider.solr.util.SearchClient;

@Service("baseMongoSolrSyncService")
public abstract class BaseMongoSolrSyncServiceImpl<T> implements BaseMongoSolrSyncService<T>{
	protected abstract String getCollection();
	protected abstract T getObjectId(String id);
	protected abstract Query getQuery(T t);
	@Autowired
	private SearchClient client;
	@Autowired
	private MongoTemplate mongoTemplate;
	@Override
	public void insert(T t) {
		//mongodb
		mongoTemplate.insert(t);
		//solr
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		try {
			solrClient.addBean(collection, t);
			solrClient.commit(collection, true, false);
//			client.getClient().optimize(collection, true, false);
		} catch (IOException e) {
			mongoTemplate.remove(t);
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (SolrServerException e) {
			mongoTemplate.remove(t);
			throw new SolrErrorException("AddBean from index error, " + e.getMessage(), e);
		}
		
	}

	@Override
	public void insertAll(List<T> ts) {
		//mongodb
		mongoTemplate.insertAll(ts);
		
		//solr
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		try {
			solrClient.addBeans(collection, ts);
			solrClient.commit(collection, true, false);
		} catch (SolrServerException e) {
			for (T t : ts) {
				mongoTemplate.remove(t);
			}
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			for (T t : ts) {
				mongoTemplate.remove(t);
			}
			throw new SolrErrorException("Add from index by object list error, " + e.getMessage(), e);
		}
	}
	
	@Override
	public void update(Map<String, Object> m,T t, String id) {
		//solr
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		if (null != t && StringUtils.isNotBlank(id)) {
			try {
				solrClient.deleteById(collection, id);
				solrClient.addBean(collection, t);
				solrClient.commit(collection, true, false);
				solrClient.optimize(collection, true, false);
			} catch (SolrServerException e) {
				throw new SolrErrorException("Solr服务器异常", e);
			} catch (IOException e) {
				throw new SolrErrorException("Update from index by id " + id + " error, " + e.getMessage(), e);
			}
		}
		
		//mongodb
		if(m == null) return;
		Query query = getQuery(getObjectId(id));
		Update update = new Update();
		for(String key : m.keySet()){
			update.set(key, m.get(key));
		}
		mongoTemplate.updateFirst(query, update, getObjectId(id).getClass());
	}
	
	

	@Override
	public void updateAll(List<T> ts) {
		
	}

	@Override
	public void deleteById(String id) {
		//solr
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		try {
			solrClient.deleteById(collection, id);
			solrClient.commit(collection, true, false);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("Delete from index by id " + id + " error, " + e.getMessage(), e);
		}
		
		//mongodb
		T t = this.getObjectId(id);
		mongoTemplate.remove(t);
	}

	@Override
	public void deleteByIds(List<String> ids) {
		//solr
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		try {
			solrClient.deleteById(collection, ids);
			solrClient.commit(collection, true, false);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("Delete from index by id list" + ids + " error, " + e.getMessage(), e);
		}
		//mongodb
		T t = this.getObjectId(ids.get(0));
		Query query = new Query();
		Criteria c = new Criteria();
		c.and("_id").in(ids);
		query.addCriteria(c);
		mongoTemplate.findAndRemove(query, t.getClass());
	}

	@Override
	public T getById(String id, Class<T> clzz) {
		SolrClient solrClient = client.getClient();
		SolrQuery query = new SolrQuery();
		query.setQuery("_id:"+id);
		QueryResponse queryResponse = null;
		try {
			queryResponse = solrClient.query(getCollection(), query);
			List<T> ts = queryResponse.getBeans(clzz);
			return ts.size()>0 ? ts.get(0) : null;
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("getById from index error, " + e.getMessage(), e);
		}
	}

	@Override
	public List<T> getByIds(List<String> ids, Class<T> clzz) {
		SolrClient solrClient = client.getClient();
		SolrQuery query = new SolrQuery();
		StringBuilder sb = new StringBuilder();
		for (String id : ids) {
			sb.append(" OR _id:" +id);
		}
		String idStrs =sb.toString().substring(4); 
		query.setQuery(idStrs);
		QueryResponse queryResponse = null;
		try {
			queryResponse = solrClient.query(getCollection(), query);
			return queryResponse.getBeans(clzz);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("getById from index error, " + e.getMessage(), e);
		}
	}

	
	@Override
	public List<T> findByParamsWithSort(String solrql, SortClause sortClause, Class<T> clzz) {
		QueryResponse response = null;
		List<T> items = new ArrayList<T>();
		SolrQuery query = new SolrQuery();
		query.setQuery(solrql);
		if(null != sortClause){
			query.addSort(sortClause);
		}
		try {
			response = client.getClient().query(getCollection(),query);
			items = response.getBeans(clzz);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("FindByParams from index error, " + e.getMessage(), e);
		}
		return items;
	}

	@Override
	public IGenericPage<T> query(String solrql, int pageNum, int pageSize, Class<T> clzz, SortClause...sortClauses) {
		SolrQuery query = new SolrQuery();
		query.setQuery(solrql);
		query.setStart((pageNum - 1) * pageSize);
		query.setRows(pageSize);
		if(ArrayUtils.isNotEmpty(sortClauses)){
			for (SortClause sortClause : sortClauses) {
				query.addSort(sortClause);
			}
		}
		QueryResponse response = null;
		String collection = getCollection();
		try {
			response = client.getClient().query(collection, query);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("IGenericPage index error, " + e.getMessage(), e);
		}

		// 查询到的记录总数
		long totalRow = Long.valueOf(response.getResults().getNumFound())
				.intValue();
		// 查询结果集
		List<T> items = response.getBeans(clzz);
		// 填充page对象
		IGenericPage<T> genericPage = new GenericDefaultPage<T>(pageNum,
				pageSize, items, (int) totalRow);

		return genericPage;
	}

	@Override
	public void optimizeSolr(boolean waitFlush, boolean waitSearcher) {
		client.optimizeSolr(getCollection(),true, false);
	}
}
