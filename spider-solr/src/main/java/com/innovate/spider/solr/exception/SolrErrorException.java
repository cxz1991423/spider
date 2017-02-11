package com.innovate.spider.solr.exception;

@SuppressWarnings("serial")
public class SolrErrorException extends RuntimeException {

	public SolrErrorException() {
	}

	public SolrErrorException(String message) {
		super(message);
	}

	public SolrErrorException(Throwable cause) {
		super(cause);
	}

	public SolrErrorException(String message, Throwable cause) {
		super(message, cause);
	}

	public SolrErrorException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
