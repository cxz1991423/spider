(function(a){a.extend(a.fn,{submitForm:function(d){d=a.extend({},d);var e=a(this[0]);if(!e.validForm()){return false}var g="";var b=a(this[0]).find(".attachment").each(function(){var h=a(this).attachments("getIds");g+=(g&&h)?(","+h):h});d.data=d.data||{};a.extend(d.data,{uploadAttachmentIds:g});var f=d.success;delete d.success;var c=d.failure;delete d.failure;e.attr("method","POST");e.ajaxSubmit(a.extend({url:e.attr("action"),dataType:"json",success:function(h){var i=h;if(i.success===true){if(f&&(typeof f)==="function"){f.call(e,i,d)}e.trigger("submitsuccess",[i,d])}else{if(c&&(typeof c)==="function"){c.call(e,i,d)}e.trigger("submitfailure",[i,d])}}},d));return true},validForm:function(){var c=true;var b=a(this[0]).find(".attachment").each(function(){var d=a(this).attachments("ifCompleted");if(!d){hAlert("附件上传未完成，请稍等")}c&=d});return c&&a(this[0]).valid()},loadForm:function(b,c){if(!b){return}var d=a(this[0]);if(typeof b==="string"){a.ajax({url:b,type:"post",dataType:"json",data:c||{},success:function(f){var g=f;if(g.success){d.loadValues(g.data);d.trigger("loadsuccess",[g,b])}else{d.trigger("loadfailure",[g,b])}}})}else{if(typeof b==="object"){var e=b.success;delete b.success;a.ajax(a.extend({type:"post",dataType:"json",success:function(f){var g=f;if(g.success){d.loadValues(g.data);d.trigger("loadsuccess",[g,b]);if(typeof e=="function"){e.call(this,f)}}else{d.trigger("loadfailure",[g,b])}}},b))}}},loadValues:function(f,h){if(!f){return}var g=a(this[0]);var d=g.find("INPUT");if(d.length>0){a.each(d,function(i){if(d[i]){var j=d[i].name;switch(d[i].type){case"radio":if(f[j]==a(d[i]).val()){d[i].checked=true}break;case"checkbox":if(a.isArray(f[j])){a.each(f[j],function(k,l){if(l==a(d[i]).val()){d[i].checked=true}})}else{if(f[j]==1){d[i].checked=true}}break;default:a(d[i]).val(f[j])}}})}var c=g.find("TEXTAREA");if(c.length>0){a.each(c,function(i){if(c[i]){var j=c[i].name;a(c[i]).val(f[j])}})}var b=g.find("SELECT");if(b.length>0){a.each(b,function(i){if(b[i]){var j=b[i].name;a(b[i]).val(f[j]+"")}})}var e=g.find(".attachment");if(e.length>0){a.each(e,function(i){if(e[i]){a(e[i]).attachments("loadlist")}})}},clearForm:function(){a(this).find("input,select,textarea").clearFields();a(this).find(".attachment").each(function(){a(this).attachments("clear")});a(this).find(".texteditor").each(function(){a(this).clear()})},formToObject:function(){var b={};a.each(this.formToArray(),function(d,e){var f=e.name,c=e.value;b[f]=b[f]===undefined?c:a.isArray(b[f])?b[f].concat(c):[b[f],c]});return b},initAjaxForm:function(){var b=a(this[0]);if(!b.is("form")){return false}b.validate({});b.unbind("submit");b.submit(function(d){if(!d.isDefaultPrevented()){d.preventDefault()}var c=a(this);c.submitForm();return false})},clearFields:function(){var b=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week|hidden)$/i;return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();if(b.test(d)||c=="textarea"){this.value=""}else{if(d=="checkbox"||d=="radio"){this.checked=false}else{if(c=="select"){this.selectedIndex=0}}}})}})})(jQuery);