package com.innovate.spider.properties.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovate.framework.dao.mybatis.BaseDao;
import com.innovate.framework.service.BaseServiceImpl;
import com.innovate.spider.domain.Site;
import com.innovate.spider.properties.dao.SiteDao;
import com.innovate.spider.properties.service.SiteService;
@Service("siteService")
public class SiteServiceImpl extends BaseServiceImpl<Site> implements SiteService{
	@Autowired
	private SiteDao siteDao;
	
	@Override
	protected BaseDao<Site, String> getDao() {
		return siteDao;
	}

	@Override
	protected void wrapParams(Site param) {
	}

}
