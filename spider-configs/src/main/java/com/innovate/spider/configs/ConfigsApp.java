package com.innovate.spider.configs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * 配置中心
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude=DataSourceAutoConfiguration.class)
@EnableConfigServer
@EnableEurekaClient
public class ConfigsApp {
	
	 public static void main(String[] args) {
	        SpringApplication.run(ConfigsApp.class, args);
	    }

}
