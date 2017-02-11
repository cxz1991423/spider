package com.innovate.spider.solr.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrClient;
//import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrQuery.SortClause;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.innovate.framework.query.generic.GenericDefaultPage;
import com.innovate.framework.query.generic.IGenericPage;
import com.innovate.spider.solr.dao.BaseDao;
import com.innovate.spider.solr.exception.SolrErrorException;
import com.innovate.spider.solr.util.EntityConvert;
import com.innovate.spider.solr.util.SearchClient;

@Repository
public abstract class BaseDaoImpl<T> implements BaseDao<T> {

//	private static Logger logger = Logger.getLogger(BaseDaoImpl.class);

	@Autowired
	private SearchClient client;
	
	protected abstract String getCollection();
	
	@Override
	public void deleteById(String id) {
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

	}

	@Override
	public void deleteByIds(List<String> ids) {
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		try {
			solrClient.deleteById(collection, ids);
			solrClient.commit(collection, true, false);
//			client.getClient().optimize(collection, true, false);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("Delete from index by id list" + ids + " error, " + e.getMessage(), e);
		}

	}

	@Override
	public void deleteAllIndex() {
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
			try {
				solrClient.deleteByQuery(collection, "*:*");
				solrClient.commit(collection, true, false);
//				client.getClient().optimize(collection, true, false);
			} catch (SolrServerException e) {
				throw new SolrErrorException("Solr服务器异常", e);
			} catch (IOException e) {
				throw new SolrErrorException("Delete all index error, " + e.getMessage(), e);
			}

	}

	@Override
	public void updateBean(T object, String id) {
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
		if (null != object && StringUtils.isNotBlank(id)) {
			try {
				solrClient.deleteById(collection, id);
				solrClient.addBean(collection, object);
				solrClient.commit(collection, true, false);
				solrClient.optimize(collection, true, false);
			} catch (SolrServerException e) {
				throw new SolrErrorException("Solr服务器异常", e);
			} catch (IOException e) {
				throw new SolrErrorException("Update from index by id " + id + " error, " + e.getMessage(), e);
			}
		}
	}

	@Override
	public void addConvertBeans(List<T> lists) {
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
			try {
				solrClient.addBeans(collection, lists);
				solrClient.commit(collection, true, false);
			} catch (SolrServerException e) {
				throw new SolrErrorException("Solr服务器异常", e);
			} catch (IOException e) {
				throw new SolrErrorException("Add from index by object list error, " + e.getMessage(), e);
			}
//			client.getClient().optimize(collection, true, false);

	}

	@Override
	public IGenericPage<T> query(String solrql, int pageNum,
			int pageSize, Class<T> clzz, String field, ORDER order) {
//		System.out.println(solrql);
		SolrQuery query = new SolrQuery();
		query.setQuery(solrql);
		query.setStart((pageNum - 1) * pageSize);
		query.setRows(pageSize);
		if(StringUtils.isNotEmpty(field)){
			query.addSort(field, order);
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
		// Page<T> page = new Page<T>(pageNum, pageSize, totalRow, items);

		IGenericPage<T> genericPage = new GenericDefaultPage<T>(pageNum,
				pageSize, items, (int) totalRow);

		return genericPage;
	}

	@Override
	public List<T> findAll(Class<T> clzz) {
		QueryResponse response = null;
		List<T> items = new ArrayList<T>();
		SolrQuery query = new SolrQuery();
		query.setQuery("*:*");
		try {
			response = client.getClient().query(getCollection(),query);
			items = response.getBeans(clzz);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("FindAll from index error, " + e.getMessage(), e);
		}
		return items;
	}

	@Override
	public List<T> findByParams(String solrql, Class<T> clzz) {
		QueryResponse response = null;
		List<T> items = new ArrayList<T>();
		SolrQuery query = new SolrQuery();
		query.setQuery(solrql);
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
	public List<T> findByParamsWithSort(String solrql,SortClause sortClause, Class<T> clzz) {
		QueryResponse response = null;
		List<T> items = new ArrayList<T>();
		SolrQuery query = new SolrQuery();
		query.setQuery(solrql);
		query.addSort(sortClause);
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
	public void addBean(T t) {
		String collection = getCollection();
		SolrClient solrClient = client.getClient();
			try {
				solrClient.addBean(collection, t);
				solrClient.commit(collection, true, false);
//				client.getClient().optimize(collection, true, false);
			} catch (IOException e) {
				throw new SolrErrorException("Solr服务器异常", e);
			} catch (SolrServerException e) {
				throw new SolrErrorException("AddBean from index error, " + e.getMessage(), e);
			}
	}

	@Override
	public T getById(String id, Class<T> clzz) {
		SolrDocument document = new SolrDocument();
		SolrClient solrClient = client.getClient();
		try {
			document = solrClient.getById(getCollection(), id);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("getById from index error, " + e.getMessage(), e);
		}
		//System.out.println(EntityConvert.solrDocument2Entity(document, clzz));
		return EntityConvert.solrDocument2Entity(document, clzz);
	}

	@Override
	public void optimizeSolr(boolean b1, boolean b2) {
		client.optimizeSolr(getCollection(),true, false);
	}
}
