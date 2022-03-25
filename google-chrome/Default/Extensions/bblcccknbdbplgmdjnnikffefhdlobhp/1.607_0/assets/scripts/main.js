var isQuery = false;
var time = new Date().getTime() + "";
var html = "";
var wbhtml = '<div id="###" class="url-item"><div class="url-container"><div class="read-mode">'
	+ '<div class="url-str">@@@</div></div></div></div>';

var lastTimeComment = 0;

var extension = null;
chrome.runtime.getBackgroundPage(function(win){
	extension = win;
	docReady();
});

function docReady(){
	$(document).ready(function() {
		
		/*func_callback["addUrlCallback"] = addUrlCallback;
		func_callback["updateUrlCallback"] = updateUrlCallback;
		func_callback["deleteUrlCallback"] = deleteUrlCallback;
		func_callback["receiveRewordCallback"] = receiveRewordCallback;
		func_callback["loadRewordCallback"] = loadRewordCallback;
		func_callback["loadCommentsCallback"] = loadCommentsCallback;
		func_callback["addCommentCallback"] = addCommentCallback;
		func_callback["showPayStepCallback"] = showPayStepCallback;
		func_callback["loadPayLogCallback"] = loadPayLogCallback;
		func_callback["refreashDomainsCallback"] = refreashDomainsCallback;
		func_callback["modifyPwdCallback"] = modifyPwdCallback;
		func_callback["loadPageData"] = loadPageData;
		func_callback["fourceOpenPayStep"] = fourceOpenPayStep;*/
		
		bindEvent();
		extension.checkUserLogin("loadPageData");
		html = '<div id="###" class="url-item"><div class="url-container"><div class="read-mode"><img class="url-del" src="assets/images/del1.png" alt="' + message.deleteDomain +'" title="' + message.deleteDomain +'"></img>'
		 + '<div class="url-str">@@@<span><img src="assets/images/edit.png" alt="' + message.deleteDomain +'" title="' + message.edit +'"></img></span></div></div>'
		 + '<div class="edit-mode"><div class="cancel"><img src="assets/images/block.png"/></div>'
		 + '<div class="modify"><img src="assets/images/check.png"/></div><input class="url-text" type="text" value="@@@"></div></div></div>';
	});
}




function countPersonalURL(){
	
	var len = 0;
	if( extension.Domains.getList() ){
		for(var i in  extension.Domains.getList()){
			len ++;
		}
	}
	$("#domainList span").text("(" + len + ")");
}


function bindEvent(){
	if(extension.appOpen == "true" || extension.appOpen == true){
		$(".app_pay").show();
	}
	
	$("#addURL-btn").click(function(){
		var inputURL = $.trim($("#addURL-text").val());
		inputURL = extension.getHost(inputURL);
		if(inputURL == ""){
			alert(message.inputRightDomain);
			return;
		}
		if(extension.Domains.hasURL(inputURL)){
			alert(message.hasDomain);
			return;
		}
		var dataStr = {action:"addURL", url:inputURL,callback:"addUrlCallback"};
		extension.connectToServer(dataStr);
	});
	
	$("#refreshDays").click(function(){
		var dataStr = {action:"refreshDays"};
		extension.connectToServer(dataStr);
	})
	
	$("#persion-setting").click(function(){
		$("#setting-menu").show();
	});
	
	$("#setting-menu").mouseleave(function(){
		$(this).hide();
	})
	
	$("#setting-menu li").mouseover(function(){
		$(this).css("background-color","#FFFFE0");
	}).mouseout(function(){
		$(this).css("background-color","#fff");
	});
	
	$("#queryURL-btn").click(function(){
		var inputURL = $.trim($("#addURL-text").val());
		inputURL = extension.getHost(inputURL);
		if(inputURL == "" || inputURL == "."){
			alert(message.inputRightDomain);
			return;
		}
		queryDomains(inputURL);
		isQuery = true;
	});
	
	$("#addURL-text").bind('input propertychange',function(){
		if(isQuery){
			var inputURL = $.trim($(this).val());
			if(inputURL == ""){
				showAllDomains();
				isQuery = false;
			}
		}
	});
	
	var urlList = $("#domain-list .url-list");
	
	urlList.delegate(".url-str","click",function(){
		var next = $(this).parent().next();
		next.css("display","block");
		next.find("input").focus();
		$(this).parent().css("display","none");
	});
	urlList.delegate(".cancel","click",function(){
		var parent = $(this).parent();
		var read = parent.prev();
		parent.find("input").val(read.find(".url-str").text());
		parent.css("display","none");
		read.css("display","block");
	});
	urlList.delegate(".modify","click",function(){
		//submit to server
		var parent = $(this).parent();
		var serialId = $(this).parents(".url-item").attr("id");
		var newVal = $.trim(parent.find("input").val());
		newVal = extension.getHost(newVal);
		if(newVal == ""){
			alert(message.inputRightDomain);
			return;
		}
		var oldVal = parent.prev().find(".url-str").text();
		if(oldVal == newVal){
			parent.css("display","none");
			parent.prev().css("display","block");
		}else{
			if(extension.Domains.hasURL(newVal)){
				alert(message.hasDomain);
				return;
			}
			var dataStr = {action:"updateURL",serialId:serialId,url:newVal,callback:"updateUrlCallback"};
			extension.connectToServer(dataStr); 
		}
	});
	urlList.delegate(".url-del","click",function(){
		//submit to server
		var serialId = $(this).parents(".url-item").attr("id");
		var dataStr = {action:"deleteURL",serialId:serialId,callback:"deleteUrlCallback"};
		extension.connectToServer(dataStr); 
	});
	
	urlList.delegate(".url-str","mouseover",function(){
		$(this).find("span img").css("display" , "block");
	});
	urlList.delegate(".url-str","mouseout",function(){
		$(this).find("span img").css("display" , "none");
	});
	urlList.delegate(".url-del","mouseover",function(){
		$(this).attr("src","assets/images/del2.png");
	});
	urlList.delegate(".url-del","mouseout",function(){
		$(this).attr("src","assets/images/del1.png");
	});
	
	$(".reword-table").delegate(".receive-bnt", "click", function(){
		var email = $(this).attr("email");
		if(email){
			var data = {action:"receiveReword", userEmail : email, callback : "receiveRewordCallback"};
			extension.connectToServer(data);
		}
		var extId =  $(this).attr("extId");
		var that = $(this);
		if(extId){
			chrome.management.setEnabled(extId, false,function(){
				that.removeClass("receive-bnt").text(message.closed);
			});
		}
		
	});
	
	$("#editPwdLink").fancybox({
		'hideOnContentClick': true
	});
	$("#editPwd-btn").click(resetPwd);
	$("#logout").click(function(){
		var dataStr = {action:"logout"};
		extension.reset();
		extension.connectToServer(dataStr);
	});
	$(".nav-head .version").text(message.appName + extension.version);
	
	$("#invationLink").click(function(){
		switchContainer("invation-link");
	});
	$("#extLink").click(function(){
		
		extension.getOtherExtensions(function(exts){
			if(exts.length > 0){
				var tr = "<tr class='reword-row'><td><img src='#1#'/>#2#</td><td><button extId='#5#' class='#3#'>#4#</button></td></tr>";
				var tbody = $("#ext-list").find("tbody");
				tbody.html("");
				for(var i in exts){
					var extensionInfo = exts[i];
					var name = extensionInfo.shortName ? extensionInfo.shortName :  extensionInfo.name;
					var image = extensionInfo.icons[0].url;
					var enabled = extensionInfo.enabled;
					var clazz = enabled ? "receive-bnt" : "";
					var text = enabled ? message.close : message.closed;
					var ttr = tr.replace("#1#",image).replace("#2#",name).replace("#3#",clazz)
						.replace("#4#",text).replace("#5#",extensionInfo.id);
					$(ttr).appendTo(tbody);
				}
			}
			
			switchContainer("ext-link");
		});
		
		
	});
	$("#rewordLink").click(function(){
		var data = {action:"loadReword",callback:"loadRewordCallback"};
		extension.connectToServer(data); 
	});
	$("#whiteblack").click(function(){
		switchContainer("whiteblack-list");
	});
	$("#domainList").click(function(){
		switchContainer("domain-list");
	});
	$("#commentLink").click(function(){
		var dataStr = {action:"loadComments",callback:"loadCommentsCallback"};
		extension.connectToServer(dataStr); 
	});
	
	$("#home_page").text(extension.homePage);
	$("#home_page").attr("href",extension.homePage);
	
	$("#webstore").text(extension.praise_link);
	$("#webstore").attr("href",extension.praise_link);
	
	if(!$.isEmptyObject(extension.links)){
		for(var i in extension.links){
			var tmp = extension.links[i];
			var name = getLang() == 'en' ? tmp.enName : tmp.cnName;
			var link = tmp.fieldValue1;
			var str = '<dl><dt>' + name + ': </dt><dd><a target="_blank" href="' + link + '">' + link + '</a></dd></dl>';
			$(str).appendTo($("#invatlinks"));
		}
	}
	
	$("#invat_code").text(extension.invationCode);
	
	$(".invat_link").text(extension.getInviteLink());
	$(".invat_link").attr("href",extension.getInviteLink());
	
	$("#praiseBtn").click(function(){
		chrome.tabs.create({
			url : extension.praise_link
		});
	});
	
	$("#comment-btn").click(function(){
		var now = new Date().getTime();
		if(now - lastTimeComment < 10000){
			lastTimeComment = now;
			alert(message.limitMessage);
		}else{
			lastTimeComment = now;
			var text = $.trim($("#comment-text").val());
			if(text == ""){
				alert(message.inputComment);
				return;
			}
			if(text.length > 255){
				alert(message.longComment);
				return;
			}
			var dataStr = {action:"addComment",askComment:text, setting : extension.AppSetting.getSetting(),callback:"addCommentCallback"};
			extension.connectToServer(dataStr);
		}
		 
		 
	});
	
	$("#payStepLink").click(function(){
		time = new Date().getTime() + "";
		var dataStr = {action:"loadPayStep", time : time, callback:"showPayStepCallback"};
		extension.connectToServer(dataStr); 
		$("#payStepLink").fancybox({
			'hideOnContentClick': true
		});
	});
	
	$("#buyNum").bind('input propertychange', listenByNumInput);
	$("#payLogLink").click(function(){
		var dataStr = {action:"loadPayLog",callback:"loadPayLogCallback"};
		extension.connectToServer(dataStr); 
	});
	
	$("#enableSys").click(function(){
		if(this.checked == true){
			extension.Domains.changeEnable("true");
		}else{
			extension.Domains.changeEnable("false");
		}
		extension.AppSetting.resetting();
	});
	
	$("#refreshDomains").click(function(){
		var dataStr = {action:"fetchDomains",callback:"refreashDomainsCallback"};
		extension.connectToServer(dataStr); 
	});
	
	$("#importFile").change(function(){
		var val = $(this).val();
		if(val == ""){
		}else{
			//...
			var file = this.files[0];  
		    var reader = new FileReader();  
		    reader.readAsText(file);  
		    reader.onload=function(f){  
		        var txt = this.result;
		        if(txt){
		        	var dataStr = {action:"importDomains", urls:txt, callback:"refreashDomainsCallback"};
		    		extension.connectToServer(dataStr); 
		        }
		    }  
			$(this).val("");
		}
	});
	
	$("#exportDomains").click(function(){
		var list = extension.Domains.getList();
		if(list){
			var tmp = [];
			$.each(list,function(k,v){
				tmp.push(v);
			});
			saveFileAs("exportDomains.txt", tmp.join(","));
		}else{
			alert(message.exportNoDomains);
		}
	});
	
	$("#importDomains").click(function(){
		if(typeof FileReader == 'undefined'){  
			alert(message.importNotSupport);
		}else{
			$("#importFile").click();
		}  
	});
	
	$(".nav-menu").find("a").each(function(){
		this.addEventListener('click', trackButtonClick);
	});
	
	$("#invatlinks").find("a").each(function(){
		this.addEventListener('click', trackButtonClick);
	});
	var ids = ["persion-setting","editPwdLink","logout","queryURL-btn","addURL-btn","enableSys","invat_link","comment-btn","praiseBtn","zw","en"];
	$.each(ids, function(i,n){
		document.getElementById(n).addEventListener('click', trackButtonClick);
	});
	
};

function loadRewordCallback(rd){
	var list = rd.inviteList;
	$("#reword-link .help").text(message.rewordInfo + rd.msg);
	if(!$.isEmptyObject(list)){
		var tbody = $(".reword-table tbody");
		tbody.html("");
		for(var i in list){
			var tmp = list[i];
			var tr = '<tr class="reword-row"><td>' + tmp.userEmail + '</td><td>' + getUserStatus(tmp) + '</td><td>' + tmp.reword 
					+ message.day + '</td><td>' + getRewordStatus(tmp) +  '</td></tr>';
			$(tr).appendTo(tbody);
		}
	}
	switchContainer("reword-link");
	function getUserStatus(user){
		if(user.actively){
			if(user.vip == 1){
				return message.vip;
			}else if(user.vip == -1){
				return message.tryvip;
			}else{
				return message.nonvip;
			}
		}else{
			return message.inactive;
		}
	}
	
	function getRewordStatus(user){
		if(user.reword == 0){
			return  '<button >' + message.noreword + '</button>';
		}else{
			if(user.receive == 1){
				return  '<button >' + message.received + '</button>';
			}else{
				return  '<button email="' + tmp.userEmail + '" class="receive-bnt">' + message.notreceive + '</button>';
			}
		}
	}
}

function receiveRewordCallback(rd){
	var email = rd.userEmail;
	if(email){
		$(".receive-bnt").each(function(){
			if($(this).attr("email") == email){
				$(this).removeClass("receive-bnt");
				$(this).text(message.received);
			}
		});
	}
}

function loadPayLogCallback(rd){
	if(!$.isEmptyObject(rd.payLogList)){
		$("#payLog-list").html("");
		var t = '<table class="payLog-table" >';
		for (var i = 0; i < rd.payLogList.length; i++) {
			var tmp = rd.payLogList[i];
			t += '<tr class="payLog-tr-head"><td colspan="2">' + message.orderNO + ':<span>' + tmp.orderId
				+ '</span></td><td colspan="2" class="payLog-date">' + tmp.payDate
				+ '</td></tr ><tr class="payLog-tr-body"><td>' + tmp.buyPrice + message.yuan + "/" +  getBuyName(tmp)
				+ '</td><td>x' + tmp.num + '</td><td>' + message.totalCharge + ':<span>' + tmp.charge
				+ '</span>' + message.yuan + '</td><td>' + getPayName(tmp) + '</td></tr>';
		}
		t += '</table>';
		
		$("#payLog-list").html(t);
		
		function getBuyName(order){
			if(getLang() == "zw"){
				return tmp.buyCnName;
			}else{
				return tmp.buyEnName;
			}
		}
		
		function getPayName(order){
			if(getLang() == "zw"){
				return tmp.payCnName;
			}else{
				return tmp.payEnName;
			}
		}
	}
	switchContainer("payLog-link");
}


function listenByNumInput(){
	if(this.value.length==1){
		this.value=this.value.replace(/[^1-9]/g,'');
	}else{
		this.value=this.value.replace(/\D/g,'');
	}
	var opt = $("#payWay").find("option:selected");
	if(opt){
		var charge = opt.attr("charge") * this.value;
		$("#payCharge").text(charge);
	}
}

function showPayStepCallback(rd){
	if(rd.msg == ""){
		$("#payStep").css({width:"380px"});
		$("#paymentwall").hide();
		$("#payWay").empty();
		$("#payMethod").empty();
		var parms = rd.parms;
		if(!$.isEmptyObject(parms)){
			var opts = "";
			for(var p in parms){
				var checked = "";
				if(p == 0){
					checked = 'checked="checked"';
				}
				opts += '<li><input value="' + parms[p].fieldName + '" ' + checked + ' name="payway" type="radio"/>' 
					+ parms[p].fieldValue1 + message.yuan + parms[p].cnName + '</li>';
			}
			$("#payWay").html(opts);
		}
		var payWay = rd.payWay;
		if(!$.isEmptyObject(payWay)){
			var baseURL = extension.AppServer.getBaseUrl() + "images/";
			var payWays = "";
			for (var i = 0; i < payWay.length; i++) {
				payWays += '<input value="' + payWay[i].payName + '" '+ (i == 0 ? ' checked="checked" ' : '')
						+ ' name="payMethod"  type="radio"/> '
						+ '<img height="40px" src="' + baseURL + payWay[i].image +'"/>';
				if((i+1)%2 == 0 ){
					payWays += '<br/>';
				}
			}
			$("#payMethod").html(payWays);
		}
		$("#pay-key").val(rd.key);
		$("#hash").val($.md5(time));
		$("#pay-form").attr("action", extension.AppServer.getBaseUrl() + "payServlet");
		$("#pay-form").show(); 
	}else{
		$("#paymentwall").addClass("paymentwall");
		$("#payStep").css({width:"770px"});
		$("#pay-form").hide();
		$("#paymentwall").html(rd.msg);
		$("#paymentwall").find("iframe").load(function(){
			$("#paymentwall").removeClass("paymentwall");
		});
		$("#paymentwall").show();
		
	}
	
}



function resetPwd(){
	var msg = message.pwdLength;
	var oldP = $("#oldPwd");
	var newP1 = $("#newPwd1");
	var newP2 = $("#newPwd2");
	if(checkPassword($("#oldPwd"), $("#password_e_o"), msg)
			&& checkPassword($("#newPwd1"), $("#password_e_n1"), msg)
			&& checkPassword($("#newPwd2"), $("#password_e_n2"), msg)){
		if($("#newPwd1").val() != $("#newPwd2").val()){
			removeMessage( $("#password_e_n2"));
			addMessage(message.mismatch, $("#password_e_n2"), "error");
			return;
		}else{
			var data = {
				action : "resetPassword" ,
				oldPwd : $.md5($("#oldPwd").val()),
				newPwd1 : $.md5($("#newPwd1").val()),
				newPwd2 : $.md5($("#newPwd2").val()),
				callback : "modifyPwdCallback"
			};
			extension.connectToServer(data);
		}
	}
};

function modifyPwdCallback(rd){
	if(rd.cookie && rd.cookie != ""){
		extension.writeCookie(rd.cookie);
		addMessage(message.modifySuccess, $("#password_e_o"), "info");
	}else{
		addMessage(message.modifyFaild, $("#password_e_o"), "error");
	}
}


function checkPassword(pwd, p, msg){
	removeMessage(p);
	var pswd = pwd.val();
	if(pswd == "" || pswd.length < 6 || pswd.length > 15){
		addMessage(msg, p, "error");
		return false;
	} else {
		return true;
	}
};

function loadPageData(){
	//loadData
	var list = extension.Domains.getList();
	$("#userId").text(extension.getLastLoginName());
	if(!$.isEmptyObject(list)){
		$("#domain-list .url-list").html("");
		for(var index in list){  
			addUrlItem(index, list[index]);
		} 
	}
	var w = extension.Domains.getWhite();
	if(w != null && !$.isEmptyObject(w)){
		addWhiteBlack(w, $(".url-list.white"));
	}
	
	for(var n in extension.announcements){
		var content = getLang() == "en" ?  extension.announcements[n].enContent :  extension.announcements[n].content;
		content = content != "" && content ? content :  extension.announcements[n].content;
		var temp = '<div class="notice">' + content + '</div>';
		$(temp).prependTo($(".main-div"));
	}
	
	refreshLimit();
	$("#qrcode-url").qrcode({width: 128,height: 128,text: extension.homePage});
	
	if(extension.Domains.getEnable() == "true"){
		$("#enableSys").attr("checked","checked");
	}else{
		$("#enableSys").removeAttr("checked");
	}
	
	countPersonalURL();
};

function addWhiteBlack(l, t){
	t.html("");
	for(var i in l){  
		var urlItem = wbhtml.replace("###",i);
		urlItem = urlItem.replace(new RegExp("@@@","gm"), l[i]);
		$(urlItem).appendTo(t);
	} 
}

function addUrlItem(index, url){
	var urlItem = html.replace("###",index);
	urlItem = urlItem.replace(new RegExp("@@@","gm"), url);
	$(urlItem).appendTo($("#domain-list .url-list"));
};



function addUrlCallback(data){
	if(isQuery == true){
		showAllDomains();
		isQuery = false;
	}
	var items  = $("#domain-list .url-list .url-item");
	if(items.length == 0){
		$("#domain-list .url-list").html("");
	}
	addUrlItem(data.serialId, data.url);
	extension.Domains.add(data.serialId, data.url);
	extension.AppSetting.resetting();
	
	countPersonalURL();
};


function updateUrlCallback(data){
	var item = $("#"+data.serialId);
	var edit = item.find(".edit-mode");
	var read = item.find(".read-mode");
	read.find(".url-str").text(data.url);
	edit.find("input").val(data.url);
	edit.css("display","none");
	read.css("display","block");
	extension.Domains.update(data.serialId, data.url);
	extension.AppSetting.resetting();
};

function deleteUrlCallback(data){
	var item = $("#"+data.serialId);
	item.remove();
	extension.Domains.del(data.serialId);
	extension.AppSetting.resetting();
	
	countPersonalURL();
};

function addCurrentURLCallback(data){
	var list = data.urlList;
	for(var index in list){  
		addUrlItem(index, list[index]);
	}  
	
	countPersonalURL();
};

function queryDomains(val){
	var list = extension.Domains.getList();
	if(list != null){
		$("#domain-list .url-list").html("");
		for(var index in list){  
			if(list[index].indexOf(val) != -1){
				addUrlItem(index, list[index]);
			}
		}
	}
}

function showAllDomains(){
	var list = extension.Domains.getList();
	if(list != null){
		$("#domain-list .url-list").html("");
		for(var index in list){  
			addUrlItem(index, list[index]);
		}
	}
}

function refreashDomainsCallback(data){
	if(data){
		extension.Domains.saveList(data.urlList);
		extension.AppSetting.resetting();
		showAllDomains();
	}
}



function switchContainer(cid){
	$(".main-container").hide();
	$("#"+cid).show();
};

function loadCommentsCallback(data){
	if(data.comments && data.comments.length > 0){
		$(".comment-list").empty();
		for(var index in data.comments){
			addComment(data.comments[index]);
		}
	}
	switchContainer("comment-link");
}

function addComment(comment, isInsert){
	if(comment){
		var html = '<div><dl class="ask"><dt>' + message.commentContent + ':</dt><dd>@@</dd><span>##</span></dl>'
			     + '<dl class="answer"><dt>' + message.replyContent + ':</dt><dd>$$</dd><span>&&</span></dl><hr/><div>';
		html = html.replace("@@",comment.askComment).replace("##",comment.askDate);		
		if(comment.answerComment && comment.answerDate){
			html = html.replace("$$",comment.answerComment).replace("&&",comment.answerDate);
		}else{
			html = html.replace("$$", message.noReply).replace("&&","");
		}
		if(isInsert){
			$(html).prependTo($(".comment-list"));
		}else{
			$(html).appendTo($(".comment-list"));
		}
	}
}

function addCommentCallback(data){
	addComment(data.comment,true);
}

function refreshLimit(){
	if(extension.limit == 0){
		$("#limitDayLable").text(message.lessThan);
		$("#use_day").text(1);
	}else if(extension.limit == -1){
		$("#limitDayLable").text(message.limitDays);
		$("#use_day").text(0);
	}else {
		$("#limitDayLable").text(message.limitDays);
		$("#use_day").text(extension.limit);
	}
}

function fourceOpenPayStep(){
	$("#payStepLink").click();
}

function openExtManage(){
	$("#extLink").click();
}