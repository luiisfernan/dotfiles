function parseParam(param){
	if(param == null)
		return null;
	var paramStr = "";
	$.each(param,function(i){
        var k = i + "=" + encodeURIComponent(param[i] == null ? "null" : param[i]);
        paramStr += '&' + k;
    });
	return paramStr.substr(1);
};


function getDomain(host){
	if(host){
		var parts = host.split(".");
		if(parts.length >= 3){
			parts.shift();
			return parts.join(".");
		}
	}
	return host;
};

function getHost(url) {
    var host = "NULL";
    if (typeof url == "undefined" || null == url) {
        return host;
    }
    url = url.toLowerCase();
    var regex = /.*\:\/\/([^\/]*).*/;
    if (url.indexOf("://") == -1) {
        url = "http://" + url;
    }
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match) {
        host = match[1];
    }
    return host;
};

function isInList(str, list){
	for(var i in list){
		if(list[i] == str){
			return true;
		}
	}
	return false;
};

function getLastLoginName(){
	var user = storage.getItem("lastUser");
	return user;
};

function setLastLoginName(lastUser){
	storage.setItem("lastUser", lastUser);
};

function setIconStart(){
	chrome.browserAction.disable();
	chrome.browserAction.setTitle({title : message.startup});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-Black-24x24.png'
	});
}

function setIconOff(){
	chrome.browserAction.disable();
	chrome.browserAction.setTitle({title : message.notConnectServer});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-Red-24x24.png'
	});
}

function setIconUpdate(){
	chrome.browserAction.enable();
	chrome.browserAction.setTitle({title : message.needUpdate});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-Yellow-24x24.png'
	});
}
//not login
function setIconLogin(){
	chrome.browserAction.enable();
	chrome.browserAction.setTitle({title : message.notLogin});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-Black-24x24.png'
	});
	login = false;
}

function setIconNormal(){
	chrome.browserAction.enable();
	chrome.browserAction.setTitle({title : message.appName});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-blue-24x24.png'
	});
}


function setIconMessage(m){
	chrome.browserAction.disable();
	chrome.browserAction.setTitle({title : m});
	chrome.browserAction.setIcon({
		path : '/assets/images/logo-Black-24x24.png'
	});
}

function clearCookie(){
	storage.removeItem("_app");
	storage.removeItem("breakTime");
	storage.removeItem("notice");
	storage.removeItem("time");
};

function writeCookie(cookie){
	storage.setItem("_app",cookie);
};

function getCookie(){
	var cookie = storage.getItem("_app");
	if(cookie == null){
		return "";
	}else{
		return cookie;
	}
};

function covList(arg0, arg1){
	if(arg1.length > 0){
		if(arg0 == 1){
			return 1;
		}
		if(typeof arg0 == 'undefined'){
			arg0 = {};
		}
		var av = arg1.pop();
		arg0[av] = covList(arg0[av], arg1);
		return arg0;
	}else{
		return 1;
	}
}

function initSomeData(rd){
	versionStatus = rd.versionStatus;
	if(typeof(versionStatus) == 'undefined' ){
		versionStatus = -1;
	}
	if(versionStatus != 0 && versionStatus != 1){
		setIconUpdate();
	}
	if(rd.homePage && rd.homePage != ""){
		homePage = rd.homePage;
	}
	if(rd.downloadLink && rd.downloadLink != ""){
		app_download_link = rd.downloadLink;
	}
}

function isInErrors(error){
	for(var i in errors){
		if(errors[i] == error){
			return true;
		}
	}
	return false;
}


/*function showTmpNotice(title, content){
	if(content && content != ""){
		var title = title ? title : message.noticeTitle ;
		var notification = new Notification(title, {
		    body : content,
		    icon : '/assets/images/logo-blue-128x128.png'
		});
	}
}*/

function showTmpNotice(title, message){
	var opt = {
			  type: "basic",
			  title: title,
			  message:  message,
			  iconUrl: '/assets/images/logo-blue-128x128.png'
			}
	chrome.notifications.create(opt);
}
