package com.innovate.spider.solr.dao;

import java.util.List;

import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrQuery.SortClause;

import com.innovate.framework.query.generic.IGenericPage;

/**
 * @author GuoWuyou
 * 
 */
public interface BaseDao<T> {
	/**
	 * 根据id从索引中删除记录
	 * @param id 主键
	 */
	public void deleteById(String id);

	/**
	 * 根据id集合从索引中删除记录
	 * @param ids
	 */
	public void deleteByIds(List<String> ids);

	/**
	 * 删除所有索引
	 */
	public void deleteAllIndex();

	/**
	 * 更新单个记录
	 * @param object 要更新成的对象
	 * @param id  主键id名
	 * 
	 */
	public void updateBean(T object, String id);

	/**
	 * 将对象集合添加至索引
	 * @param lists 要索引的对象集合
	 */
	public void addConvertBeans(List<T> lists);

	/**
	 * @param t 要索引的对象
	 */
	public void addBean(T t);

	/**
	 * @param id
	 * @return 通过id得到对象
	 */
	public T getById(String id, Class<T> clzz);

	/**
	 * @param clzz 对象类型
	 * @return
	 */
	public List<T> findAll(Class<T> clzz);

	/**
	 * @param solrql sql查询串
	 * @param clzz 对象类型
	 * @return
	 */
	public List<T> findByParams(String solrql, Class<T> clzz);
	/**
	 * 排序查找
	 * @param solrql 		key:value 多个查询用and隔开 	e.g.:username:张三 and userpass:123
	 * @param sortClause 	排序 						e.g.:new SortClause("id", ORDER.asc)
	 * @param clzz			接收class
	 * @return list
	 */
	public List<T> findByParamsWithSort(String solrql, SortClause sortClause, Class<T> clzz);
	/**
	 * 根据关键字查询
	 * @param solrql sql查询串
	 * @param pageNum 当前页码
	 * @param pageSize 每页显示的大小
	 * @param clzz 对象类型
	 * @return
	 */
	/**
	 * 
	 * @param solrql sql查询串
	 * @param pageNum 当前页码
	 * @param pageSize 每页显示的大小
	 * @param clzz 对象类型
	 * @param field 排序字段
	 * @param order ORDER.asc/ORDER.desc
	 * @return
	 */
	public IGenericPage<T> query(String solrql, int pageNum,
			int pageSize, Class<T> clzz, String field, ORDER order);
    /**
     * @param b1
     * @param b2 优化索引
     */
    public void optimizeSolr(boolean b1, boolean b2);

}
