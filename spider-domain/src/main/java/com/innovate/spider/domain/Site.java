package com.innovate.spider.domain;

import java.io.Serializable;
import java.util.Date;

import com.innovate.framework.dao.mybatis.AbstractEntity;

@SuppressWarnings("serial")
public class Site extends AbstractEntity implements Serializable{

	private String sleepTime = "3000";//		----------------爬虫停顿时间	e.g.:3000
	
	private String siteName;//			----------------网站名 		e.g.:新华网
	
	private String startUrl;//			----------------起始页		e.g.:"http://news.ifeng.com/listpage/11528/20161206/1/rtlist.shtml"
	
	private String mainUrlRegex;//		----------------起始页正则,用于验证是否是符合要求的列表页 e.g.:"http://news.ifeng.com/listpage/\\d{5}/\\d{8}/\\d{1}/rtlist.shtml"
	
	private String mainAreaRegex;//		----------------子页面区域正则	e.g.:
	
	private String mainAreaXpath;//		----------------子页面区域xpath	e.g.:"//div[@class="newsList"]"
	
	private String childUrlRegex;//		----------------子页面正则 		e.g.:"http://news.ifeng.com/a/\\d{8}/\\d{8}_\\d{1}.shtml"
	
	private String childUrlXpath;//		----------------子页面xpath	e.g.:"//div[@class="newsList"]/ul/li/a/@href"
	
	private String moreUrlRegex;//		----------------引申页正则(有则填,没有则忽略)
	
	private String moreUrlXpath;//		----------------引申页xpath(有则填,没有则忽略)
	
	private String fieldsStr;//			----------------收集子页面内容字段和值转json字符串  e.g. [{"comment":"xxx","name":"xxx","value":"xxx"},{"comment":"xxx","name":"xxx","value":"xxx"}]

	private Date createtime;// 			----------------创建时间/修改时间
	
	private Integer startUrlOnly;//只显示【起始页】结果
	
	private Integer mainAreaRegexOnly;//只显示【区域正则】结果
	
	private Integer mainAreaXpathOnly;//只显示【区域Xpath】结果
	
	private Integer childUrlRegexOnly;//只显示【子页正则】结果
	
	private Integer childUrlXpathOnly;//只显示【子页Xpath】结果
	
	private Integer moreUrlRegexOnly;//只显示【下一页正则】结果
	
	private Integer moreUrlXpathOnly;//只显示【下一页Xpath】结果
	
	private Integer fieldsStrOnly;//只显示【子页字段详情】结果

	public String getSleepTime() {
		return sleepTime;
	}

	public void setSleepTime(String sleepTime) {
		this.sleepTime = sleepTime;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getStartUrl() {
		return startUrl;
	}

	public void setStartUrl(String startUrl) {
		this.startUrl = startUrl;
	}

	public String getMainUrlRegex() {
		return mainUrlRegex;
	}

	public void setMainUrlRegex(String mainUrlRegex) {
		this.mainUrlRegex = mainUrlRegex;
	}

	public String getMainAreaRegex() {
		return mainAreaRegex;
	}

	public void setMainAreaRegex(String mainAreaRegex) {
		this.mainAreaRegex = mainAreaRegex;
	}

	public String getMainAreaXpath() {
		return mainAreaXpath;
	}

	public void setMainAreaXpath(String mainAreaXpath) {
		this.mainAreaXpath = mainAreaXpath;
	}

	public String getChildUrlRegex() {
		return childUrlRegex;
	}

	public void setChildUrlRegex(String childUrlRegex) {
		this.childUrlRegex = childUrlRegex;
	}

	public String getChildUrlXpath() {
		return childUrlXpath;
	}

	public void setChildUrlXpath(String childUrlXpath) {
		this.childUrlXpath = childUrlXpath;
	}

	public String getMoreUrlRegex() {
		return moreUrlRegex;
	}

	public void setMoreUrlRegex(String moreUrlRegex) {
		this.moreUrlRegex = moreUrlRegex;
	}

	public String getMoreUrlXpath() {
		return moreUrlXpath;
	}

	public void setMoreUrlXpath(String moreUrlXpath) {
		this.moreUrlXpath = moreUrlXpath;
	}

	public String getFieldsStr() {
		return fieldsStr;
	}

	public void setFieldsStr(String fieldsStr) {
		this.fieldsStr = fieldsStr;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Integer getStartUrlOnly() {
		return startUrlOnly;
	}

	public void setStartUrlOnly(Integer startUrlOnly) {
		this.startUrlOnly = startUrlOnly;
	}

	public Integer getMainAreaRegexOnly() {
		return mainAreaRegexOnly;
	}

	public void setMainAreaRegexOnly(Integer mainAreaRegexOnly) {
		this.mainAreaRegexOnly = mainAreaRegexOnly;
	}

	public Integer getMainAreaXpathOnly() {
		return mainAreaXpathOnly;
	}

	public void setMainAreaXpathOnly(Integer mainAreaXpathOnly) {
		this.mainAreaXpathOnly = mainAreaXpathOnly;
	}

	public Integer getChildUrlRegexOnly() {
		return childUrlRegexOnly;
	}

	public void setChildUrlRegexOnly(Integer childUrlRegexOnly) {
		this.childUrlRegexOnly = childUrlRegexOnly;
	}

	public Integer getChildUrlXpathOnly() {
		return childUrlXpathOnly;
	}

	public void setChildUrlXpathOnly(Integer childUrlXpathOnly) {
		this.childUrlXpathOnly = childUrlXpathOnly;
	}

	public Integer getMoreUrlRegexOnly() {
		return moreUrlRegexOnly;
	}

	public void setMoreUrlRegexOnly(Integer moreUrlRegexOnly) {
		this.moreUrlRegexOnly = moreUrlRegexOnly;
	}

	public Integer getMoreUrlXpathOnly() {
		return moreUrlXpathOnly;
	}

	public void setMoreUrlXpathOnly(Integer moreUrlXpathOnly) {
		this.moreUrlXpathOnly = moreUrlXpathOnly;
	}

	public Integer getFieldsStrOnly() {
		return fieldsStrOnly;
	}

	public void setFieldsStrOnly(Integer fieldsStrOnly) {
		this.fieldsStrOnly = fieldsStrOnly;
	}
	
}
