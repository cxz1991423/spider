package com.innovate.spider.utils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;


public class ZipUtils {
	static final int BUFFER = 8192;
	private File zipFile;
	private ZipUtils(String pathName) {
		zipFile = new File(pathName);
	}

	private void compress(String...pathName) {
		ZipOutputStream out = null;
		try {
			FileOutputStream fileOutputStream = new FileOutputStream(zipFile);
			CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream, new CRC32());
			out = new ZipOutputStream(cos);
			String basedir = "";
			for (int i = 0; i < pathName.length; i++) {
				compress(new File(pathName[i]), out, basedir);
			}
			out.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void compress(File file, ZipOutputStream out, String basedir) {
		/* 判断是目录还是文件 */
		if (file.isDirectory()) {
			//System.out.println("压缩：" + basedir + file.getName());
			this.compressDirectory(file, out, basedir);
		} else {
			//System.out.println("压缩：" + basedir + file.getName());
			this.compressFile(file, out, basedir);
		}
	}

	/** 压缩一个目录 */
	private void compressDirectory(File dir, ZipOutputStream out, String basedir) {
		if (!dir.exists())return;
		File[] files = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			/* 递归 */
			compress(files[i], out, basedir + dir.getName() + "/");
		}
	}

	/** 压缩一个文件 */
	private void compressFile(File file, ZipOutputStream out, String basedir) {
		if (!file.exists()) {
			return;
		}
		try {
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
			ZipEntry entry = new ZipEntry(basedir + file.getName());
			out.putNextEntry(entry);
			int count;
			byte[] data = new byte[BUFFER];
			while ((count = bis.read(data, 0, BUFFER)) != -1) {
				out.write(data, 0, count);
			}
			bis.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

	private static void checkAndMkdirs(String filePath){
		File path = new File(filePath);
		if(!path.exists()){
			path.mkdirs();
		}
	}
	
	/**
	 * 压缩
	 * @param zipName zip名(不要后缀)
	 * @param zipPath zip文件夹路径(只要文件夹)
	 * @param file 一个或多个文件
	 * @return 压缩文件路径
	 */
	public static String compression(String zipName, String zipPath, String...file) {
		checkAndMkdirs(zipPath);
		ZipUtils zc = new ZipUtils(zipPath + zipName + ".zip");
		zc.compress(file);
		return zipPath + zipName + ".zip";
	}
	/**
	 * 解压缩
	 * @param zipFilePath
	 * @param descDir
	 * @return list 文件路径集合
	 */
	public static List<File> deCompression(String zipFilePath, String descDir){
		try {
			return deCompress(zipFilePath, descDir);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 
	 * @param zipFilePath
	 * @param descDir
	 * @throws IOException
	 */
	private static List<File> deCompress(String zipFilePath, String descDir) throws IOException {
		checkAndMkdirs(descDir);
		ZipFile zip = new ZipFile(zipFilePath);
		InputStream in = null;
		OutputStream out = null;
		List<File> filesList = new ArrayList<File>();
		File file = null;
		byte[] buf1 = null;
		for (Enumeration<?> entries = zip.entries(); entries.hasMoreElements();) {
			ZipEntry entry = (ZipEntry) entries.nextElement();
			String zipEntryName = entry.getName();
			in = zip.getInputStream(entry);
			String outPath = (descDir + zipEntryName).replaceAll("\\*", "/");
			// 判断路径是否存在,不存在则创建文件路径
			checkAndMkdirs(outPath.substring(0, outPath.lastIndexOf('/')));
			// 判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
			file = new File(outPath);
			if (file.isDirectory()) {
				continue;
			}
			// 输出文件路径信息
			// System.out.println(outPath);
			filesList.add(file);
			out = new FileOutputStream(outPath);
			buf1 = new byte[8192];
			int len;
			while ((len = in.read(buf1)) > 0) {
				out.write(buf1, 0, len);
			}
		}
		
		try {
		} finally {
			if (null != zip) zip.close();
			if (null != in)  in.close();
			if (null != out) out.close();
		}
		
		return filesList;
	}

}