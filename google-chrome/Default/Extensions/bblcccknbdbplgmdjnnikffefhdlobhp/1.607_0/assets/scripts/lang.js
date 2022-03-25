var message = {};

$(document).ready(function(){
	
/*	var region = getLocalPage() + "_page"; 
	
	function getLocalPage(){
		var href = location.pathname;
		return href.replace(".html", "").substring(1);
	}
	
	if(getLang() == "zw"){
		message = message_zw.app_message[region];
	}else if(getLang() == "zh"){
		message = message_zh.app_message[region];
	}else{
		message = message_en.app_message[region];
	}*/
	
	message = LANG[getLang()];
//	message = data.app_message[region];
 	document.title = message.title;
	$(".lang").each(function(){
		var obj = $(this);
		obj.html(findReplace(obj.html()));
	});
	
	$(".lang_attr").each(function(){
		var obj = $(this);
		var attrs = obj.attr("class").split(" ");
		for(var i=1; i < attrs.length; i++){
			var attr = $.trim(attrs[i]);
			obj.attr(attr, findReplace(obj.attr(attr)));
		}
		
	});
	
	function findReplace(str){
		var reg = /(\$\{)(\w+)(\})/g;
		str = str.replace(reg, function($1,$2,$3,$4){
			var msg = message[$3];
			return msg;
		});
		return str;
	};
	
/*	$.getJSON(chrome.runtime.getURL("assets/lang/lang_" + getLang() + ".json"),function(data){ 
		message = data.app_message[region];
	 	document.title = message.title;
		$(".lang").each(function(){
			var obj = $(this);
			obj.html(findReplace(obj.html()));
		});
		
		$(".lang_attr").each(function(){
			var obj = $(this);
			var attrs = obj.attr("class").split(" ");
			for(var i=1; i < attrs.length; i++){
				var attr = $.trim(attrs[i]);
				obj.attr(attr, findReplace(obj.attr(attr)));
			}
			
		});
		
		function findReplace(str){
			var reg = /(\$\{)(\w+)(\})/g;
			str = str.replace(reg, function($1,$2,$3,$4){
				var msg = message[$3];
				return msg;
			});
			return str;
		};
	});*/
	
	$(".switchLang").click(function(){
		var id = this.id;
		var lang = getLang();
		if(id && id != ""){
			if(id == lang){
				return;
			}
		}
		
		if(lang == "en"){
			lang = "zw";
		}else{
			lang = "en";
		}
		setLang(lang);
		reloadLang(lang);
	});
});

function getBrowserLang(){
	var languages = navigator.languages;
	var language = "zw";
	if($.isEmptyObject(languages)){
		language = navigator.language;
	}else{
		language = languages[0];
	}
	
	
	if(language){
		var lang = language.substring(0,2);
		if(lang == "en"){
			return "en";
		}
	}
	return "zw";
}

function getLang(){
	var l = window.localStorage.getItem("lang");
	if(l && (l == "en" || l == "zw") ){
		return l;
	}else{
		l = getBrowserLang();
		window.localStorage.setItem("lang", l);
		return l;
	}
}

function setLang(l){
	lang = l;
	window.localStorage.setItem("lang", l);
}

