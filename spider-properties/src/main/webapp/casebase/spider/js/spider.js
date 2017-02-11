var ready = $(function() {
	NavTab.init();
	Fields.init();
	TestsBtn.init();
	FormBtn.init();
	otherBtn.init();
});


var NavTab = {
	init : function() {
		this.changeTab();
	},
	changeTab : function() {
		var btn_active = "spider-add-active";
		var ul_hide = "hide";
		$("#btn-box .spider-add-btn").on('click', function() {
			$(this).addClass(btn_active).siblings().removeClass(btn_active);
			$('#spider-main ul[ref="'+$(this).attr('id')+'"]').removeClass(ul_hide).siblings().addClass(ul_hide);
		});
	}
};

var Fields = {
		init:function(){
			this.add();
			this.del();
		},
		add:function(){
			var id = "";
			var field = ['<li class="fields"><span>字段名<font class="rednotice">*</font> : </span>',
			             '<input class="config-field-name">',
			             '<span> 备　注<font class="rednotice">*</font> : </span>',
			             '<input class="config-field-comment">',
			             '<span> xpath<font class="rednotice">*</font> : </span>',
			             '<input class="config-field-value">　',
			             '<button class="btn spider-delete-btn">删除字段</button></li><hr/>'].join("");
			$('.field-add').on('click',function(){
				
				$(this).closest('ul').find('li:last-child').before(field);
				
			});
		},
		del:function(){
			$('#configs ul').on('click','.spider-delete-btn',function(){
//				var $this = $(this);
//				"确定删除吗?".showConfirm(function(){
//					$this.closest('li').remove();
//				});
				$(this).closest('li').next('hr').remove().end().remove();
			});
		}
};
/**
 * 测试按钮点击事件
 */
var TestsBtn = {
		init:function(){
			this.startUrl();
			this.mainUrlRegex();
			this.moreUrlRegex();
			this.mainAreaXpath();
			this.childUrlXpath();
			this.childUrlRegex();
			this.fields();
			this.targetUrls();
		},
		startUrl:function(){
			$('.test-startUrl').on('click',function(){
				var ulId = $(this).closest('ul').attr('id');
				var thisVal = $(this).closest('li').find('.config.startUrl').val();
				if(thisVal){
					if(ulId==="targetPages"){//批量页面 只测试第一条URL
						var val = $(this).closest('li').find('textarea').val();
						TestsAjax.constructor(val.split('\n')[0], 1);
						TestsAjax.requestTest(ulId);
						return;
					}
					if(thisVal && (thisVal.match(/^http:\/\/.*/g) || thisVal.match(/^https:\/\/.*/g))){
						TestsAjax.constructor(thisVal, 1);
						TestsAjax.requestTest(ulId)
					}else {
						"请输入正确的url".showMessage();
					}
				}else {
					"起始页或正则不能为空".showMessage();
					
				}
			})
		},
		mainUrlRegex:function(){
			$('.test-mainUrlRegex').on('click',function(){
				var ulId = $(this).closest('ul').attr('id');
				var str = $('.config.startUrl').val();
				if(ulId==="targetPages"){
					str = $('.config.targetUrls').val().split("\n")[0];
				}
				var regex = $(this).next().val();
				if(str && regex){
					$.ajax({
						url:templateRoot + "casebase/spider/site_testRegex.action",
						data:{str:str,regex:regex},
						success:function(data){
							if(data.message === "true"){
								alert("正则匹配");
							}else {
								alert("正则不匹配！")
							}
						}
					});
				}else{
					"起始页或正则不能为空".showMessage();
				}
			});
		},
		moreUrlRegex:function(){
			var ulId = $(this).closest('ul').attr('id');
			$('.test-moreUrlRegex').on('click',function(){
				var thisVal = $(this).next().val();
				if(thisVal){
					TestsAjax.constructor($('.config.startUrl').val(), 0, thisVal, 1);
					TestsAjax.requestTest(ulId);
				}
			})
		},
		mainAreaXpath:function(){
			$('#listPage-mainAreaXpath-test').on('click',function(){
				var thisVal = $(this).next().val();
				if(thisVal){
					TestsAjax.constructor($('.config.startUrl').val(), 0, $('.config.moreUrlRegex').val(), 0, thisVal, 1);
					TestsAjax.requestTest();
				}
			})
		},
		childUrlXpath:function(){
			$('#listPage-childUrlXpath-test').on('click',function(){
				var thisVal = $(this).next().val();
				if(thisVal){
					TestsAjax.constructor($('.config.startUrl').val(), 0, $('.config.moreUrlRegex').val(), 0, 
								$('.config.mainAreaXpath').val(), 0, thisVal, 1);
					TestsAjax.requestTest();
				}
			})
		},
		childUrlRegex:function(){
			$('#listPage-childUrlRegex-test').on('click',function(){
				var thisVal = $(this).next().val();
				if(thisVal){
					TestsAjax.constructor($('.config.startUrl').val(), 0, $('.config.moreUrlRegex').val(), 0, 
							$('.config.mainAreaXpath').val(), 0, $('.config.childUrlXpath').val(), 1, thisVal);
					TestsAjax.requestTest();
				}
			});
		},
		fields:function(){
			$('.config-field-test').on('click',function(){
				var arr = new Array(),name="",comment="",value="",field={},fields="",ul=$(this).closest('ul'),ulId = ul.attr('id');
				ul.find(".fields").each(function(){
					name	 = $(this).find('.config-field-name').val(),
				 	comment	 = $(this).find('.config-field-comment').val(),
				 	value	 = $(this).find('.config-field-value').val(),
				 	field	 = {name:name,comment:comment,value:value};
					if(name && comment && value){
						arr.push(field);
					}
				});
				fields = JSON.stringify(arr);
				switch (ulId) {
				case 'listPage':
					TestsAjax.constructor(ul.find('.config.startUrl').val(), 0, ul.find('.config.moreUrlRegex').val(), 0, 
							ul.find('.config.mainAreaXpath').val(), 0, ul.find('.config.childUrlXpath').val(), 0, 
							ul.find('.config.childUrlRegex').val(), fields, 1);
					break;
				case 'targetPages':
					TestsAjax.constructor($('.config.targetUrls').val().split("\n")[0], 0, null, 0, null, 0, null, 0, null, fields, 1);
					break;
				case 'js-json':
					break;
				case 'simplePage':
					break;
				}
				
				TestsAjax.requestTest(ulId);
			});
		},
		targetUrls: function(){
			$('#targetPages-targetUrls-test').on('click',function(){
				var val = $(this).closest('li').find('textarea').val();
				TestsAjax.constructor(val.split('\n')[0], 1);
				TestsAjax.requestTest();
			});
		}
};
/**
 * 测试spider ajax
 * xxxOnly,只显示此属性
 */
var TestsAjax = {
		data:{},
		constructor:function(startUrl, startUrlOnly,moreUrlRegex, moreUrlRegexOnly, mainAreaXpath, mainAreaXpathOnly, 
				childUrlXpath, childUrlXpathOnly, childUrlRegex, fieldsStr ,fieldsStrOnly){
			this.data = {
				"startUrl":startUrl,
				"startUrlOnly":startUrlOnly,
				"moreUrlRegex":moreUrlRegex,
				"moreUrlRegexOnly":moreUrlRegexOnly,
				"mainAreaXpath":mainAreaXpath,
				"mainAreaXpathOnly":mainAreaXpathOnly,
				"childUrlXpath":childUrlXpath,
				"childUrlXpathOnly":childUrlXpathOnly,
				"childUrlRegex":childUrlRegex,
				"fieldsStr":fieldsStr,
				"fieldsStrOnly":fieldsStrOnly,
			};
		},
		requestTest:function(type){
			var $this = this;
			$('body').loadding();
			$.ajax({
				url: $this.getUrl(type),
				data:this.data,
				success:function(data){
					if(data.success){
						"<textarea id='result-show'></textarea>".showMessage(function(){
							$('#result-show').val(data.message).loadding.close();
						});
					}
				}
			});
			
		},
		/**
		 * 获取ajax请求接口
		 * @param type listPage添加列表页 targetPages批量内容页 js-json:JS-json解析页 simplePage：单页任意爬取
		 * @returns {String}
		 */
		getUrl:function(type){
			var data = "testListPage";
			switch (type) {
			case 'listPage':
				data = "testListPage";
				break;
			case 'targetPages':
				data = "testTargetPages";
				break;
			case 'js-json':
				data = "testJsJson";
				break;
			case 'simplePage':
				data = "testSimplePage";
				break;
			}
			return templateRoot + "casebase/spider/site_"+data+".action";
		}
};

var FormBtn = {
	init:function(){
		this.reset();
		this.save();
	},
	reset:function(){
		$("#listPage-reset").on('click',function(){
			$("#spider-listPage-config").find('input').not(':hidden').val("")/*.attr('placeholder','')*/;
		});
	},
	save:function(){
		$("#listPage-submit").on('click',function(){
			var arr = new Array(),name="",comment="",value="",field={},fields="";
			$(".fields").each(function(){
				name	 = $(this).find('.config-field-name').val(),
			 	comment	 = $(this).find('.config-field-comment').val(),
			 	value	 = $(this).find('.config-field-value').val(),
			 	field	 = {name:name,comment:comment,value:value};
				if(name && comment && value){
					arr.push(field);
				}
			});
			fields = JSON.stringify(arr);
			var data = {
					"siteName":$(".siteName").val(),
					"domain":$(".domain").val(),
					"startUrl":$(".startUrl").val(),
					"mainUrlRegex":$(".mainUrlRegex").val(),
					"moreUrlRegex":$(".moreUrlRegex").val(),
					"mainAreaXpath":$(".mainAreaXpath").val(),
					"childUrlXpath":$(".childUrlXpath").val(),
					"childUrlRegex":$(".childUrlRegex").val(),
					"fieldsStr":fields,
				};
			$.ajax({
				url:templateRoot + "casebase/spider/site_save.action",
				data:data,
				success:function(data){
					if(data.success){
						alert("添加成功");
					}
				}
			});
		});
	}
};

var otherBtn = {
	init: function(){
		this.ifNext();
	},
	ifNext: function(){
		$('#ifnext1,#ifnext2,#ifnext3,#ifnext4').on('change',function(){
			var $li = $(this).closest('li'),
				val = $(this).val();
			$li.find('input[name="ifNextPage"]').val(val);
			if(val==1){
				$li.next().removeClass('hide');
			}else {
				$li.next().addClass('hide');
			}
		});
	}
}