var datatables=null ;
$(function(){
var myUrl = templateRoot + 'casebase/spider/site_pageList.action';
datatables=$('#siteDataTabel').iDataTable({
	aoColumns:[ 	            
      	{ 
      		sTitle:"ID",
      		bVisible: false,
      		sClass: "",
      		name:"id"
      	},
        { 
      		sTitle :"网站名",
      		sClass: "text-center",
      		sWidth: "8em",
      		bSortable: false,
      		name:"siteName",
      		/*mRender: function(data, type, full){
	      	var html = "<a style='text-decoration:none;' href="+templateRoot +"classify/events/events_load.action?id="+full[0]+" title='查看详情' target='_blank'>"+full[1].replace(/(^\s*)|(\s*$)/g, "")+"</a>";
	      	return html; 
	      }*/
      	},
        { 
      		sTitle:"域名",
      		name:"domain",
      		sWidth: "12em",
      		sClass: "text-center",
      		bSortable: false
        },
        { 
      		sTitle:"起始页",
      		name:"startUrl",
      		sWidth: "10em",
      		sClass: "text-left",
      		bSortable: false
        },
        { 
        	sTitle:"创建时间",
        	name:"createtime",
        	sWidth: "6em",
        	sClass: "text-center",
        	bSortable: false,
        },
      	{ 
      		mData : "",
        	sTitle:"操作",
        	//name:"caozuo",
        	sClass: "text-center",
        	sWidth: "2em",
        	bSortable: false,
        	mRender: function(data, type, full){
		      	var html = "<a target=\"_blank\" onclick=\"loadDetail('"+full[0]+"')\" href='javascript:void(0)'>详情</a>";
		      	return html;
        	}
        }
	],
   sAjaxSource: myUrl,// 获取数据的url (一般是action)
	   fnServerParams: function ( aoData ) {
//		  aoData.push({"name": "l", "value": l});
//		  aoData.push({"name": "ct", "value": ct});
//		  aoData.push({"name": "qzt", "value": qzt});
//		  aoData.push({"name": "qzc", "value": qzc});
//		 aoData.push({"name": "t", "value": title});
    }
 });


//testSegInterface();
})

function loadDetail(id){
	console.log("update")
}

//function testSegInterface(){
//	var content = "北京市城管执法局指挥中心持续启动空气重污染橙色预警并启动应急预案";
//	$.post('http://www.nlpcn.org:9999/api/SegApi/nlpSeg',{content: content},function(data){
//		data.obj.forEach(function(term){
//			console.log(term.natureStr +"--"+term.name);
//		});
//	});
//}
