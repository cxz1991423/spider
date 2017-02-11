package com.innovate.spider.solr.util;

public class GetFileContentType {
	/**
	 * 根据文件名获取文件的ContentType类型
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getFileContentType(String fileName) {
		String contentType = "";
		String prefix = fileName.substring(fileName.lastIndexOf(".") + 1);
		if (prefix.equals("xlsx")) {
			contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		} else if (prefix.equals("pdf")) {
			contentType = "application/pdf";
		} else if (prefix.equals("doc")) {
			contentType = "application/msword";
		} else if (prefix.equals("txt")) {
			contentType = "text/plain";
		} else if (prefix.equals("xls")) {
			contentType = "application/vnd.ms-excel";
		} else if (prefix.equals("docx")) {
			contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		} else if (prefix.equals("ppt")) {
			contentType = "application/vnd.ms-powerpoint";
		} else if (prefix.equals("pptx")) {
			contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		} else {
			contentType = "othertype";
		}

		return contentType;
	}

}
