package com.innovate.spider.discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Eureka 服务注册与发现
 *
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude=DataSourceAutoConfiguration.class)
@EnableEurekaServer
public class DiscoveryApp {

	  public static void main(String[] args) {
	        SpringApplication.run(DiscoveryApp.class, args);
	    }

}
