var extension = null;
chrome.runtime.getBackgroundPage(function(win){
	extension = win;
	docReady();
});

function docReady(){
	$(document).ready(function() {
		
		/*func_callback["loadProxyList"] = loadProxyList;
		func_callback["showNodesCallback"] = showNodesCallback;
		func_callback["addCurrentURLCallback"] = addCurrentURLCallback;
		func_callback["deleteUrlCallback"] = deleteUrlCallback;
		func_callback["loadProxyListCallback"] = loadProxyListCallback;*/
		extension.openInstallPage();
		displayPopup();
		bindEvent();
	});
}




function bindEvent() {
	switchRunModel();
	defaultModel();
	addCurrentURL();
	openPersonal();
	
	if(extension.appOpen == "true" || extension.appOpen == true){
		$(".app_pay").show();
	}
	if(extension.signIn == "true" || extension.signIn == true){
		$(".signIn").show();
	}
	
	
	$("#row-select").click(function(){
		showProxyList();
	});
	$("#refresh").click(loadProxyList);
	$("#return").click(function(){
		showPxyInfo();
		$("#option-body").css("display","block");
		$("#row-body").css("display","none");
	});
	document.getElementById("auto-checkbox").onclick = changeSelectModel;
	
	$("#note").click(function(){
		var dataStr = {action:"checkIn",callback:"checkInCallback", disptch : "false"};
		extension.connectToServer(dataStr);
	});
	updateCheckInStatus();
	
	var ids = ["add-url","needed","always","closed","row-select","personal","return","refresh","auto-checkbox","proxyList"];
	$.each(ids, function(i,n){
		document.getElementById(n).addEventListener('click', trackButtonClick);
	});
	
};

function displayPopup(){
	if(extension.versionStatus != 0 &&  extension.versionStatus != 1){
		extension.confirmMessage(message.mustUpdate);
		return;
	}else if(extension.versionStatus == 1){
		extension.confirmMessage(message.needUpdate);
	}
	if(extension.login == false || extension.AppServer.websocket == null || extension.AppServer.websocket.readyState != 1){
		extension.openLoginPage(true, true);
		closePopupWindow();
	}else{
		popupDisplay();
//		var dataStr = {action:"loadPxyList",callback:"loadProxyList",disptch:"false"};
//		extension.connectToServer(dataStr);
	}
	
};

function displayAuthCode(){
	if(window.localStorage.getItem("image") != null){
		var imageCode  = window.localStorage.getItem("image");
		$("#authImg").attr("src",imageCode);
	}
}


function popupDisplay(data){
	$(".popup-container").css("display", "block");
	//是否获得了backup节点
	if(extension.isBu()){
		$(".auth-enabled").removeClass("hide");
		$(".auth-enable").addClass("hide");
	}else{
		$(".auth-enable").removeClass("hide");
		$(".auth-enabled").addClass("hide");
	}
	//是否开放了backup功能
	if(extension.isBU){
		$("#bu-div").removeClass("hide");
		displayAuthCode();
		$("#authImg").click(function(){
			var data = {action:"refreshCode"};
			extension.connectToServer(data);
		})
		
		$("#bu-div span.btn").click(function(){
			if(!extension.isBu()){
				//TODO  send data to host
				var data = {action:"callBU",callback:"buCallback",disptch:"false",code :$("#authCode").val()};
				extension.connectToServer(data);
			}
		});
	}else{
		$("#bu-div").addClass("hide");
	}
	
	dispalyDomains();
	showPxyInfo();
	showUserInfo();
	
};

function showNodesCallback(data){
	extension.AppPxy.setAllPxy(data.prxList);
	extension.AppSetting.setSelelctPxy();
};

function showUserInfo(){
	if(extension.vip == 1){
		$("#user_type").text("VIP");
	}else if(extension.vip == 0){
		$("#user_type").text(message.free);
	}else{
		$("#user_type").text(message.tryUser);
	}
	updateCheckInStatus();
	/*if(extension.limit == 0 || extension.limit == "0"){
		$("#user_days").text("0.5");
	}else if(extension.limit == -1 || extension.limit == "-1"){
		$("#user_days").text(0);
	}else{
		$("#user_days").text(extension.limit);
	}*/
}

function dispalyDomains(){
	chrome.tabs.getSelected(function(tab) {
		var jsonData = extension.getSessionStorage(tab.id + "");
		if(jsonData != null && jsonData){
			if(jsonData.list && jsonData.list.length > 0){
				setOtherDomain(tab.id,jsonData.list);
				$("#add-url").show();
				return;
			}
		}
		setCurrentDomain(tab.id, tab.url);
	});
};

function setOtherDomain(tabId, list){
	$("#domainText").text(message.notAccessDomain);
	$("#domainText").attr("name", tabId);
	var domainUrl = $("#domainUrl");
	domainUrl.html("");
	for(var index in list){
		if(!extension.Domains.isInList(list[index])){
			$("<input type='checkbox'  checked='checked'/>" + "<label>" + list[index] + "</label><br/>").appendTo(domainUrl);
		}
	}
};

function setCurrentDomain(tabId, url){
	if(url.indexOf("chrome-extension://") == 0 || url.indexOf("chrome://") == 0 || url == "newtab"){
		tabId = "-1";
	}
	url = extension.getHost(url);
	url = extension.getDomain(url);
	if(url && url != "NULL"){
		$("#domainText").text(message.currentDomain);
		$("#domainText").attr("name", tabId);
		$("#domainUrl").html("<label name='selected'>" + url + "</label>");
		if(extension.Domains.isInWhiteBlack(url)){
			$("#whiteText").text(message.hasDomain);
			$("#add-url").hide();
			$("#currentURL").hide();
			$("#whiteURL").show();
		}else if(extension.Domains.hasURL(url)){
			$("#add-url").hide();
			$("#whiteURL").hide();
			$("#currentURL").show();
		}else{
			$("#whiteURL").hide();
			$("#currentURL").hide();
			$("#add-url").show();
		}
	}
};



function openPersonal(){
	$(".personal").click(function() {
		extension.openLoginPage(false, true);
		window.close();
	});
};

function defaultModel(){
	var model = extension.AppSetting.getConnectModel();
	clearClass();
	$("#"+model).addClass("selected");
};

function addCurrentURL(){
	$("#add-url").click(function(){
		var tabId = $("#domainText").attr("name");
		if(tabId && tabId != "-1"){
			var domains = [];
			var checkbox = $("#domainUrl input");
			if(checkbox.length == 0){
				$("#domainUrl label").each(function(){
					if(!extension.Domains.isInList($(this).text())){
						domains.push($(this).text());
					}
				});
			} else {
				checkbox.each(function(){
					if(this.checked == true){
						var t = $(this).next().text();
						if(!extension.Domains.isInList(t)){
							domains.push(t);
						}
					}
				});
			}
			if(domains.length > 0){
				var urls = domains.join(",");
				var data = {action:"addURLs",callback:"addCurrentURLCallback",tabId:tabId,urls:urls};
				extension.connectToServer(data);
				return;
			}else{
				extension.alertMessage(message.notSelectDomain);
			}
		}
		window.close();
	});
	
	$("#cur-del-img").mouseover(function(){
		$(this).attr("src","assets/images/del2.png");
	});
	$("#cur-del-img").mouseout(function(){
		$(this).attr("src","assets/images/del1.png");
	});
	$("#cur-del-img").click(function(){
		var url = $("#domainUrl label").text();
		var serialId = extension.Domains.getSerialId(url);
		if(serialId !=null){
			var data = {action:"deleteURL",serialId:serialId,callback:"deleteUrlCallback"};
			extension.connectToServer(data);
		}else{
			extension.alertMessage(message.notFindDomain);
			closePopupWindow();
		}
	});
};

function addCurrentURLCallback(data){
	var tabId = data.tabId;
	var urlList = data.urlList;
	if(tabId && urlList){
		extension.Domains.addDomains(urlList);
		extension.AppSetting.resetting();
		extension.removeSessionStorage(tabId, urlList);
	}
	extension.refreshTab(tabId);
	window.close();
};

function switchRunModel() {
	$(".run-model div").click(function(){
		extension.AppSetting.changeConnectModel($(this).attr("id"));
		clearClass();
		$(this).addClass("selected");
	});
};


function clearClass() {
	$(".run-model div").each(function() {
		$(this).removeClass("selected");
	});
}

function deleteUrlCallback(data){
	//extension.setProxy(pac);
	extension.Domains.del(data.serialId);
	extension.AppSetting.resetting();
	closePopupWindow();
}

function loadProxyList(){
	var dataStr = {action:"loadPxyList",callback:"loadProxyListCallback",disptch:"false"};
	extension.connectToServer(dataStr);
}



function showProxyList(){
	var list = extension.AppPxy.pxyList;
	if(extension.isBu()){
		$(".auth-enabled").removeClass("hide");
		$(".auth-enable").addClass("hide");
	}else{
		$(".auth-enable").removeClass("hide");
		$(".auth-enabled").addClass("hide");
	}
	fillProxyList(list);
	displayProxySelectInfo();
}

function changeSelectModel(){
	var checked = this.checked;
	var model = checked == "checked" || checked == true ? "auto" : "select";
	extension.AppSetting.changeSelectModel(model);
	displayProxySelectInfo();
}

function selectPxyNode(){
	if($(this).attr("class") == "normal" && !$('#auto-checkbox').is(':checked')){
		var input = $(this).find("input[name='row-radio']");
		input.prop("checked", true);
		var id = input.val();
		var pxy = extension.AppPxy.getPxyById(id);
		extension.AppSetting.setCurrentPxy(pxy);
	}
	else if($(this).attr("class") == "free" && !$('#auto-checkbox').is(':checked')){
		extension.openLoginPage(false, true, true);
	}
	
}

function displayProxySelectInfo(){
	var current = extension.AppSetting.currentPxy;
	if(current!=null){
		var ul = $("#row-body ul");
		ul.find("input:radio").attr("checked",false);
		var li = ul.find("input[value='" + current.id + "']");
		if(li.length>0){
			li[0].checked = true;
		}
		var model = extension.AppSetting.getSelectModel();
		if(model == "auto"){
			document.getElementById("auto-checkbox").checked = true;
			ul.addClass("disable");
			ul.find(".normal input:radio").attr("disabled",true);
		}else{
			document.getElementById("auto-checkbox").checked = false;
			ul.removeClass("disable");
			ul.find(".normal input:radio").attr("disabled",false);
		}
	}
}

function fillProxyList(list){
	document.getElementById("auto-checkbox").checked = false;
	var ul = $("#row-body ul");
	ul.html("");
	var li = '<li align="center" id="node-li-@" &><img width="20px" style="vertical-align:middle;margin-right:3px;" src="assets/images/flag/%" /><label>!</label><input name="row-radio" value="@" class="row-radio" ? type="radio"><span class="row-status #">$</span><embed class="signal-svg" src="assets/images/signal?.svg" type="image/svg+xml"  /></li>';
	var length = list.length;
	for(var i=0; i<length; i++){
		var tmp = list[i];
		var row = getRowStatus(tmp.status);
		var liNode = null;
		var nodeName = getNodeName(tmp);
		var flag = tmp.flag && tmp.flag != "" ? tmp.flag : "world.png";
		if(tmp.info==""){
			liNode = li.replace("!", nodeName).replace(/@/g,tmp.id).replace("#",row[0]).replace("$",row[1]).replace("&","class='free'").replace("?","disabled='disabled'").replace("%", flag).replace("signal?", "signal" + getPing(tmp));
		}else{
			liNode = li.replace("!", nodeName).replace(/@/g,tmp.id).replace("#",row[0]).replace("$",row[1]).replace("&","class='normal'").replace("?","").replace("%", flag).replace("signal?", "signal" + getPing(tmp));
		}
		$(liNode).appendTo(ul);
	}
	ul.find("li").bind("click",selectPxyNode);
	$("#option-body").css("display","none");
	$("#row-body").css("display","block");
}

function getPing(node){
	if(typeof(node.ping) == "undefined" || node.ping == -1){
		return 0;
	}else if(node.ping == 10000){
		return -1;
	}else {
		var ping = node.ping - 400;
		if(ping < 300){
			return 4;
		}else if(ping < 400){
			return 3;
		}else if(ping < 500){
			return 2;
		}else {
			return 1;
		}
	}
	return 0;
}

/*function refreshPing(){
	var list =extension.AppPxy.getPxyList();
	for(var i=0;i<list.length;i++){
		var svg = $("#node-li-" + list[i].id).find(".signal-svg");
		var svgName = "signal"+getPing(list[i])+".svg";
		svg.attr("src","assets/images/" + svgName);
	}
}*/

function refreshPing(i){
	var list =extension.AppPxy.getPxyList();
	var node = list[i];
	if(node){
		var svg = $("#node-li-" + node.id).find(".signal-svg");
		var svgName = "signal"+getPing(node)+".svg";
		svg.attr("src","assets/images/" + svgName);
	}
		
}

function getRowStatus(status){
	switch (status) {
		case 0: return ["little",message.little];
		case 1: return ["much",message.much];
		case 2: return ["more",message.more];
		case 3: return ["busy",message.busy];
		default: return ["unknown",message.unknown];
	}
}

function showPxyInfo(){
	var current = extension.AppSetting.currentPxy;
	if(current!=null){
		var nodeName = getNodeName(current);
		var model = extension.AppSetting.getSelectModel();
		nodeName = model == "auto" ? message.autoSelect + "("  +  nodeName + ")" : nodeName;
		$("#row-select label").text(nodeName);
	}else{
		$("#row-select label").text(message.noNodeDay);
	}
}

function getNodeName(node){
	var lang = getLang();
	if(lang == 'en'){
		return node.enName && node.enName != "" ? node.enName : node.address;
	}else{
		return node.address;
	}
}

function updateCheckInStatus(){
	$("#free_time").text(extension.freeTime + message.mins);
	$("#user_email").text(extension.uuu);
//	console.log(extension.getVIPTime());
	$("#vip_time").text(extension.getVIPTime());
	var text = extension.hasChecked == 0 ? message.checkIn:message.checkedIn;
	$("#note").text(text);
	
}



function closePopupWindow(){
	window.close();
}

