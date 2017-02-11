package com.innovate.spider.solr.util;

import java.io.IOException;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.BinaryRequestWriter;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.innovate.spider.solr.exception.SolrErrorException;

@Component("searchClient")
public class SearchClient{

	@Value("${solr.host}")
    private String solrHost;
	
	private HttpSolrClient client;
	private final int DEFAULT_CONN_TIMEOUT = 30000;
	private final int DEFAULT_READ_TIMEOUT = 600000;
	public SolrClient getClient() {
		if(client == null){
			client = new HttpSolrClient(solrHost);
			client.setSoTimeout(DEFAULT_READ_TIMEOUT);
			client.setConnectionTimeout(DEFAULT_CONN_TIMEOUT);
			client.setDefaultMaxConnectionsPerHost(1000);
			client.setMaxTotalConnections(1000);
			client.setAllowCompression(true);
			// 使用二进制 writer提高性能
			client.setRequestWriter(new BinaryRequestWriter());
		}
		return client;
	}
	/**
	 * 优化索引
	 * @param collection core名
	 * @param b1
	 * @param b2
	 */
	public void optimizeSolr(String collection, boolean b1, boolean b2){
		try {
			getClient().optimize(collection, b1, b2);
		} catch (SolrServerException e) {
			throw new SolrErrorException("Solr服务器异常", e);
		} catch (IOException e) {
			throw new SolrErrorException("optimizeSolr error, " + e.getMessage(), e);
		}
	}
}
