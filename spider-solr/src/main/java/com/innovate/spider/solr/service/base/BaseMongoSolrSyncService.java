package com.innovate.spider.solr.service.base;

import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery.SortClause;

import com.innovate.framework.query.generic.IGenericPage;

public interface BaseMongoSolrSyncService<T> {
	/**solr&mongo
	 * 单条插入
	 * @param t
	 */
	public void insert(T t);
	/**solr&mongo
	 * 批量插入
	 * @param ts
	 */
	public void insertAll(List<T> ts);
	/**
	 * solr没有修改一说，只能把原来的删了，再添加一条新的数据
	 * @param m 对mongo修改的map
	 * @param t 修改好的solr数据
	 * @param id 
	 */
	void update(Map<String, Object> m, T t, String id);
	
	/**solr&mongo
	 * 批量修改
	 * @param t
	 */
	public void updateAll(List<T> ts);
	/**solr&mongo
	 * 通过id删除
	 * @param id
	 */
	public void deleteById(String id);
	/**solr&mongo
	 * 通过id批量删除
	 * @param ids
	 */
	public void deleteByIds(List<String> ids);
	/**solr
	 * @param id
	 * @return 通过id得到对象
	 */
	public T getById(String id, Class<T> clzz);
	/**solr
	 * 排序查找
	 * @param solrql 		key:value 多个查询用and隔开 	e.g.:username:张三 and userpass:123
	 * @param sortClause 	排序 						e.g.:new SortClause("id", ORDER.asc)
	 * @param clzz			接收class
	 * @return list
	 */
	public List<T> findByParamsWithSort(String solrql, SortClause sortClause, Class<T> clzz);
	/**solr
	 * 分页查询
	 * @param solrql sql查询串
	 * @param pageNum 当前页码
	 * @param pageSize 每页显示的大小
	 * @param clzz 对象类型
	 * @param sortClauses 	排序 						e.g.:new SortClause("id", ORDER.asc)
	 * @return IGenericPage
	 */
	IGenericPage<T> query(String solrql, int pageNum, int pageSize, Class<T> clzz, SortClause... sortClauses);
	/**solr
	 * 优化索引
     */
    public void optimizeSolr(boolean waitFlush,boolean waitSearcher);
    
    List<T> getByIds(List<String> ids, Class<T> clzz);
	
}
