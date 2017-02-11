package com.innovate.spider.utils;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;

public class JsonUtils {
	/**
	 * json转Map&lt;String, Object&gt;
	 * @param json json字符串
	 * @return Map&lt;String, Object&gt;
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> json2Map(String json) {
		return JSON.parseObject(json, Map.class);
	}
	
	@SuppressWarnings("unchecked")
	public static <T> List<T> json2List(String json) {
		return JSON.parseObject(json, List.class);
	}
	
	/**
	 * obj转json
	 * @param obj 任何数据对象
	 * @return json字符串
	 */
	public static String obj2JsonString(Object obj) {
		return JSON.toJSONString(obj);
	}
	/**
	 * 将object转换为格式化后的json字符串
	 * @param obj 要转换的对象
	 * @return 格式化后的json字符串
	 */
	public static String obj2JsonFormatString(Object obj){
		return formatJson(JSON.toJSONString(obj));
	}
	
	/**
	 * 格式化显示json
	 * @param jsonStr json字符串
	 * @return 格式化后的json字符串
	 */
    public static String formatJson(String jsonStr) {
        if (StringUtils.isBlank(jsonStr)) return "";
        StringBuilder sb = new StringBuilder();
        char last = '\0';
        char current = '\0';
        int indent = 0;
        for (int i = 0; i < jsonStr.length(); i++) {
            last = current;
            current = jsonStr.charAt(i);
            switch (current) {
                case '{':
                case '[':
                    sb.append(current);
                    sb.append('\n');
                    indent++;
                    addIndentBlank(sb, indent);
                    break;
                case '}':
                case ']':
                    sb.append('\n');
                    indent--;
                    addIndentBlank(sb, indent);
                    sb.append(current);
                    break;
                case ',':
                    sb.append(current);
                    if (last != '\\') {
                        sb.append('\n');
                        addIndentBlank(sb, indent);
                    }
                    break;
                default:
                    sb.append(current);
            }
        }

        return sb.toString();
    }

    /**
     * 添加space
     * @param sb
     * @param indent
     * @author   lizhgb
     * @Date   2015-10-14 上午10:38:04
     */
    private static void addIndentBlank(StringBuilder sb, int indent) {
        for (int i = 0; i < indent; i++) {
            sb.append('\t');
        }
    }
}