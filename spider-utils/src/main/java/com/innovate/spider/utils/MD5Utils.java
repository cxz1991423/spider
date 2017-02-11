package com.innovate.spider.utils;

import java.security.MessageDigest;

public class MD5Utils {

	public static String toMD5(String plainText) {
		try {
			// 生成实现指定摘要算法的 MessageDigest 对象。
			MessageDigest md = MessageDigest.getInstance("MD5");
			// 使用指定的字节数组更新摘要。
			md.update(plainText.getBytes());
			// 通过执行诸如填充之类的最终操作完成哈希计算。
			byte b[] = md.digest();
			// 生成具体的md5密码到buf数组
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String agrs[]) {
//		String md5 = MD5Utils.toMD5("302c0214056148cc83146b6288bde0350601f790c8cc1d6202141082b3c426836373e4fdb2f356e0a7a32b88f42b");// 加密LXD
//		System.out.println(md5);
		
		String a = "30 82 01 0a 02 82 01 01 00 c8 99 0f 0b 42 de bf a2 f4 b2 13 58 dc e4 ce e4 9c 0e f2 0c 73 9b 65 40 3c 3a 01 bc 72 29 a5 dd a3 ca 0d bb 95 43 42 4b 72 e1 64 44 16 fb e2 75 71 7b d1 00 c2 03 7b 34 ca d2 2f 47 52 4e 5d a9 62 89 cc 7e 49 63 ef 29 9f af e2 ca 52 28 28 3b c4 a8 d5 72 94 b2 7b 6a e8 a5 3b fe a5 d1 23 84 e9 77 dc e8 5a 84 d7 51 23 20 33 70 6f 8c df 6d ca 8c 2c f4 64 a6 bf 67 e8 31 44 6c 9c ed 34 6b 3e 18 21 39 cc d9 b5 6e 92 5b a2 ea 3e 13 7e 44 6e 03 fb b2 a5 c2 cf 46 b6 4c e9 79 f1 46 f1 eb ce 7b 0c 09 9e 4d c2 aa 4e 41 e0 d0 b9 00 86 68 5a a4 28 f1 65 6e 2f 11 6f e2 cf 14 02 02 52 69 aa 16 99 62 b7 a6 9c ee 0b d0 78 b0 4d dc 17 89 c7 53 ee e0 99 a0 a1 24 cf 29 4d 0e b5 1b 50 b6 e5 da 63 af a8 aa 91 86 3f d8 2a bc 4e 5e 59 8c b6 60 f0 36 01 ea 23 9a 23 6c 48 fa f3 7f c6 c3 02 03 01 00 01";
		System.out.println(MD5Utils.toMD5(a.replaceAll(" ", "")));
		
	}
}
