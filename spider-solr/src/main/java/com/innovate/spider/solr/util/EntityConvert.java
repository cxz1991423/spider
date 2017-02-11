package com.innovate.spider.solr.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

public class EntityConvert {
	
//	protected   static  Log logger = LogFactory.getLog(EntityConvert.class);
	/**
     * 
     * SolrDocument与实体类转换 
     * 
     * @author pudongping
     * 
     * @param document
     *                     SolrDocument对象
     * @param clzz    
     *                     泛型类
     * @return <T>
     */
    public static <T> T solrDocument2Entity(SolrDocument document, Class<T> clzz) {
        if (null != document) {
            try {
                Object obj = clzz.newInstance();
                Method m = null;
                
                Class<?> fieldType = null;
                
                for (String fieldName : document.getFieldNames()) {                        
                    
                    //需要说明的是返回的结果集中的FieldNames()比类属性多
                    Field[] filedArrays = clzz.getDeclaredFields();                        //获取类中所有属性
                    for (Field f : filedArrays) {    
                        //如果实体属性名和查询返回集中的字段名一致,填充对应的set方法
                    	if(fieldName.equals("_id")){
                    		fieldName="id";
                    	}
                        if(f.getName().equals(fieldName)){
                            
                            //获取到的属性名
                            //private java.lang.String com.test.model.Article.id
                            f = clzz.getDeclaredField(fieldName);    
                            
                            //属性类型
                            //private java.lang.String com.test.model.Article.id
                            fieldType = f.getType();    
                            
                            //构造set方法名  setId
                            String dynamicSetMethod = dynamicMethodName(f.getName(), "set");
                            
                            //获取方法
                            //public void com.test.model.Article.setId(java.lang.String)
                            m = clzz.getMethod(dynamicSetMethod, fieldType);
                            
                            //获取到的值
//                            logger.info(f.getName() + "-->" + dynamicSetMethod+ "=" + fieldType.cast(document.getFieldValue(fieldName)));
                            
                            // 如果是 int, float等基本类型，则需要转型
                            if (fieldType.equals(Integer.TYPE)) {
                                fieldType = Integer.class;
                            } else if (fieldType.equals(Float.TYPE)) {
                                fieldType = Float.class;
                            } else if (fieldType.equals(Double.TYPE)) {
                                fieldType = Double.class;
                            } else if (fieldType.equals(Boolean.TYPE)) {
                                fieldType = Boolean.class;
                            } else if (fieldType.equals(Short.TYPE)) {
                                fieldType = Short.class;
                            } else if (fieldType.equals(Long.TYPE)) {
                                fieldType = Long.class;
                            } else if(fieldType.equals(String.class)){
                                fieldType = String.class;
                            }else if(fieldType.equals(Collection.class)){
                                fieldType = Collection.class;
                            }
                            m.invoke(obj, fieldType.cast(document.getFieldValue(fieldName)));
                        }
                    }
                    
                }
                return clzz.cast(obj);
            } catch (ClassCastException e) {
//            	logger.error("请检查schema.xml中的各个field的数据类型与PO类的是否一致.",e);
                e.printStackTrace();
            } catch (SecurityException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
//                logger.error("请检查PO类中的field对应的各个setter和getter是否存在.",e);
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (NoSuchFieldException e) {
//                logger.error("请检查schema中的field是否不存在于PO类中.", e);
                e.printStackTrace();
            }
        }
//        logger.warn("solrDocument is null.");
        return null;
    }
    
    
    /**
     * 批量转换, 将solrDocumentList转换为实体类 List 
     * 
     * @author pudongping
     * 
     * @param documents    
     *                         solrDocumentList对象
     * @param clzz            
     *                         泛型类
     * 
     * @return List<T>
     *
     */
    public static <T>List<T> solrDocument2Entity(SolrDocumentList documents, Class<T> clzz) {
        if (null != documents && documents.size() > 0) {
            List<T> lists = new ArrayList<T>();
            for (SolrDocument sd : documents) {
                Object obj = solrDocument2Entity(sd, clzz);
                if (null!=obj) {
                    lists.add(clzz.cast(obj));
                }
            }
            return lists;
        }
//        logger.warn("即将要转换的solrDocumentList为null或者size为0.");
        return null;
    }
    
    
    /**
     * 
     * 实体类与SolrInputDocument转换 [测试通过]
     * 
     * @param obj
     *                         实体对象
     * @return SolrInputDocument
     *                         SolrInputDocument对象
     */
    public static SolrInputDocument entity2SolrInputDocument(Object obj) {
        if (obj != null) {
            Class<?> cls = obj.getClass();
            Field[] filedArrays = cls.getDeclaredFields();                        //获取类中所有属性
            Method m = null;
            SolrInputDocument sid = new SolrInputDocument();
            for (Field f : filedArrays) {
                //因为如果对象序列化之后,会增加该属性,不用对该属性进行反射
                if(!f.getName().equals("serialVersionUID")){                        
                    try {
                        //跟进属性xx构造对应的getXx()方法
                        String dynamicGetMethod = dynamicMethodName(f.getName(), "get");
                        //调用构造的getXx()方法
                        m = cls.getMethod(dynamicGetMethod);    
                        //属性名,与对应的属性值 get方法获取到的值
//                        LOG.info(f.getName() + ":" + m.invoke(obj));
                        sid.addField(""+ f.getName(), m.invoke(obj));
                    } catch (IllegalArgumentException e) {
                        e.printStackTrace();
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    } catch (SecurityException e) {
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        e.printStackTrace();
                    } catch (NoSuchMethodException e) {
                        e.printStackTrace(); 
                    }
                }
                
            }
            return sid;
        }
//        LOG.warn("Object to convert is null.");
        return null;
    }
    
    public static String dynamicMethodName(String name, String setOrGet){
         String setMethodName = setOrGet  
                 + name.substring(0, 1).toUpperCase()   
                 + name.substring(1);   
		return setMethodName;
    	
    }
    
}
