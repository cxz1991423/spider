(function ($) {
	var tempVal = {
		$this:null,
		selected:[],
		tbody:undefined,
		select:function(tar,multi){
			if(this.tbody===undefined){
				this.tbody = $(tar).closest("tbody");
			}
			var id = $(tar).attr("data_id");
			var index = jQuery.inArray(id,this.selected);
			if(multi){
					if (index === -1) {
						this.selected.push(id);
						$(tar).addClass('selected');
						$(tar).find("input[name='chk_box']").attr("checked", true);
					} else {
						this.selected.splice(index,1);
						$(tar).removeClass('selected');
						$(tar).find("input[name='chk_box']").attr("checked", false);
						
					}
			}else{
				if(this.selected.length>1){
					this.selected.length=0;
					this.tbody.find('tr.selected').removeClass('selected');
					this.tbody.find("input[name='chk_box']").attr("checked", false);
					this.selected.push(id);
					$(tar).addClass('selected');
					$(tar).find("input[name='chk_box']").attr("checked", true);
				}else{
					if(this.selected.length==0){
						this.selected.push(id);
						$(tar).addClass('selected');
						$(tar).find("input[name='chk_box']").attr("checked", true);
					}else{
						this.selected.length=0;
						this.tbody.find('tr.selected').removeClass('selected');
						this.tbody.find("input[name='chk_box']").attr("checked", false);
						if(index === -1){
							this.selected.push(id);
							$(tar).addClass('selected');
							$(tar).find("input[name='chk_box']").attr("checked", true);
						}
					}
				}
			}
		}
	};
    var _settings = {
        language: {
            'emptyTable': '没有数据',
            'loadingRecords': '加载中...',
            'processing': '查询中...',
            'lengthMenu': '<select class="form-control input-xsmall">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '</select><span id="word">条记录</span>',//左上角的分页大小显示。
            'search': '<span class="label label-success">搜索：</span>',//右上角的搜索文本，可以写html标签
            'zeroRecords': '没有数据',
            'paginate': {
                'first': '首页',
                'last': '末页',
                'next': '下一页',
                'previous': '上一页'
            },
            'info': '第 _PAGE_ 页 / 总 _PAGES_ 页',
            'infoEmpty': '没有数据',
            'infoFiltered': '(过滤总件数 _MAX_ 条)'
        },
        sPaginationType: "full",
        bPaginate: true, //翻页功能
        bDestroy: true,
        bLengthChange: true, //改变每页显示数据数量
        bFilter: false, //过滤功能
        bInfo: true,//页脚信息
        sScrollX: "100%",//底部横向滚动条
        bAutoWidth: true,//自动宽度
        bServerSide: true,//指定从服务器端获取数据
        sServerMethod: "POST",
        "fnServerData": fnServerDataFunction,//获取数据的处理函数
        bProcessing: true,
        sDom: '<"top"i<"clear">>rt<"bottom"lp<"clear">>',
        fnRowCallback: function(nRow,aData,iDisplayIndex){//行加载回调函数
        	callBackFun.fnRowCallback.call(this,nRow,aData,iDisplayIndex);
        },
        drawCallback: function(settings){
        	callBackFun.fnDrawCallback.call(this,settings);
        },
        fnInitComplete: function(settings,aData){
        	callBackFun.fnInitComplete.call(this,settings,aData);
        }
    };
    var callBackFun = {
		fnRowCallback:function(nRow,aData,iDisplayIndex){
			$(nRow).find("span.orderNumber").html(iDisplayIndex+1);//添加序号
			$(nRow).attr("data_id",aData[0]);//为TR添加数据ID
			var index = jQuery.inArray(aData[0],tempVal.selected);
        	if(index>-1){
        		$(nRow).addClass('selected');
        		$(nRow).find("input[name='chk_box']").attr("checked", true);
        	}
			return nRow;
		},
		fnDrawCallback:function(settings){
        	var count = Math.ceil(settings._iRecordsTotal / settings._iDisplayLength);
            var p = settings._iDisplayStart / settings._iDisplayLength + 1;
            var t = $("<input aria-controls='" + settings.sTableId + "' type='text' name='pages' id='pages' value='" + p + "'/>");
            var tp = $("<span>跳到第</span>");
            tp.append(t).append("页");
            var go = $("<a class='paginate_button last' id='goButton' >GO</a>");
            var submitPage = $("<span class='submit-page'></span>");
            submitPage.append(tp).append(go);
            go.click(function () {
                var pn = parseInt(t.val());
                if (isNaN(pn)) {
                    alert("请输入数字！");
                } else {
                    if (pn > count) {
                        alert("页码超出总页码，共有：" + count + "页！");
                        t.val(p);
                    } else if (pn < 1) {
                        alert("页码最小为1！");
                        t.val(p);
                    } else {
                        tempVal.$this.page(pn-1).draw(false);
                    }
                }
            });
            t.keydown(function (event) {
                if (event.keyCode === 13) {
                    var pn = parseInt(t.val());
                    if (isNaN(pn)) {
                        alert("请输入数字！");
                    } else {
                        if (pn > count) {
                            alert("页码超出总页码，共有：" + count + "页！");
                            t.val(p);
                        } else if (pn < 1) {
                            alert("页码最小为1！");
                            t.val(p);
                        } else {
                        	tempVal.$this.page(pn - 1).draw(false);
                        }
                    }
                }
            });
            $("#" + settings.sTableId + "_last").after(submitPage);
		},
		fnInitComplete:function(settings,aData){
			$("#" + settings.sTableId + " tbody tr").live('click', function(){
				if(event.target.nodeName=="TD"){
					if (event.ctrlKey||event.shiftKey) {
//						通过ctrl或者shift键，点击td可以是多选变色多行
						tempVal.select(this,true);
					} else {
//						没有通过ctrl或者shift键，直接点击td是单选变色一行
						tempVal.select(this,false);
					}
				}else if(event.target.nodeName=="INPUT"){
//					点击的是input复选框，是可以多选变色多行
					tempVal.select(this,true);
		    	}
		    });
		}
    };
    $.fn.iDataTable = function (options) {
    	tempVal.$this = $(this).DataTable($.extend(_settings, options));
        return tempVal.$this;
    };
    function fnServerDataFunction(sSource, aoData, fnCallback) {
        var postdata = {};
        $.each(aoData, function (i, v) {
            switch (v.name) {
                case 'iDisplayStart':
                    postdata.start = v.value;
                    break;
                case 'iDisplayLength':
                    postdata.rows = v.value;
                    break;
                case 'sColumns':
                    postdata.columns = v.value.split(",");
                    break;
                default:
                    postdata[v.name] = v.value
            }
            if (v.name.indexOf("iSortCol_") >= 0) {
                postdata.sidx = postdata.columns[v.value];
            }
            if (v.name.indexOf("sSortDir_") >= 0) {
                postdata.sord = v.value;
            }
        });
        postdata.page = (postdata.start % postdata.rows == 0 ? postdata.start / postdata.rows : postdata.start / postdata.rows + 1) + 1;
        //查询条件称加入参数数组
        $.ajax({
            type: "POST",
            url: sSource,
            dataType: "json",
            data: postdata, //以json格式传递(struts2后台还是以string类型接受),year和month直接作为参数传递。
            success: function (data) {
                var columns = postdata.columns;
                var list = data.list;
                var arrdata = [];
                $.each(list, function (i, d) {
                    var a = [];
                    $.each(columns, function (_i, _d) {
                        a[_i] = d[_d];
                    });
                    arrdata[i] = a;
                });
//				$("#url_sortdata").val(data.aaData);
                data.iTotalRecords = data.totalSize;
                data.iTotalDisplayRecords = data.totalSize;
                data.sEcho = postdata.sEcho;
                data.aaData = arrdata;
                fnCallback(data); //服务器端返回的对象的returnObject部分是要求的格式
            }
        });
    }
})($);