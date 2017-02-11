package com.innovate.spider.utils;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
public class HttpPostUtil {
	/**
	 * 发送模拟HTTPpost请求返回服务器response信息
	 * @param  requestUrl 发起请求的地址
	 * @param  params post提交的参数 如params.add(new BasicNameValuePair("userName", "admin"));
	 * @param  headers 头部 这里需要指定<b>1.referer</b>:引用页 ,<b>2.origin</b>:带<code>http://</code>的全域名 ,<b>3.host</b>:不带<code>http://</code>的全域名,<b>4.cookie</b> 多个cookie以";"隔开,如:"param1=value1;param2=value2"
	 */
	public static String requestPost(String requestUrl, List<NameValuePair> params,Map<String, String> headers)
			throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = HttpClientBuilder.create()
				.setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36")
				.build();
		
		//设置请求头
		HttpPost httppost = new HttpPost(requestUrl);
		for (Map.Entry<String, String> entry : headers.entrySet()) {
			httppost.setHeader(entry.getKey(), entry.getValue());
        }
		//设置请求体
		httppost.setEntity(new UrlEncodedFormEntity(params));
		CloseableHttpResponse response = httpclient.execute(httppost);
		HttpEntity entity = response.getEntity();
		String responsStr = EntityUtils.toString(entity, "UTF-8");
		httppost.releaseConnection();//等效于reset()
		return responsStr;
	}
}
