$.ajaxSetup({timeout:3000});$(document).ready(function(){init()});function checkOtherExtensions(doAction,notdoAction){var extIds=storage.getItem("extIds");if(extIds){extIds=$.parseJSON(extIds)}else{extIds=[]}var extensionIds=[];chrome.management.getAll(function(extensionInfos){if(extensionInfos){for(var i in extensionInfos){if(chrome.runtime.id!=extensionInfos[i].id&&extensionInfos[i].permissions&&extensionInfos[i].permissions.indexOf("proxy")>-1&&extensionInfos[i].enabled&&extIds.indexOf(extensionInfos[i].id)==-1){extensionIds.push(extensionInfos[i].id)}}}if(extensionIds.length>0){doAction()}else{notdoAction()}})}function getOtherExtensions(callback){var exts=[];chrome.management.getAll(function(extensionInfos){if(extensionInfos){for(var i in extensionInfos){if(chrome.runtime.id!=extensionInfos[i].id&&extensionInfos[i].permissions&&extensionInfos[i].permissions.indexOf("proxy")>-1){exts.push(extensionInfos[i])}}}callback(exts)})}function init(){setIconStart();initWebRequest();AppSetting.init();AppServer.init();opPageOnInstall();try{chrome.privacy.network.webRTCMultipleRoutesEnabled&&chrome.privacy.network.webRTCMultipleRoutesEnabled.set({"value":false});chrome.privacy.network.webRTCNonProxiedUdpEnabled&&chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({"value":false});chrome.privacy.network.webRTCIPHandlingPolicy&&chrome.privacy.network.webRTCIPHandlingPolicy.set({value:"disable_non_proxied_udp"})}catch(e){}}function initData(rd){versionStatus=rd.versionStatus;if(typeof(versionStatus)=="undefined"){versionStatus=-1}if(versionStatus!=0&&versionStatus!=1){setIconUpdate()}if(rd.homePage&&rd.homePage!=""){homePage=rd.homePage}if(rd.downloadLink&&rd.downloadLink!=""){app_download_link=rd.downloadLink}openPageStatus=rd.openPageStatus;openPageId=rd.openPageId;openPageUrl=rd.opnePageUrl;praise_link=rd.praiceLink;invat_link=rd.invationLink;appName=rd.appName;appOpen=rd.appOpen;links=rd.parms;vip=rd.vip;if(rd.userEmail&&rd.userEmail!=""){uuu=rd.userEmail;ccc=rd.control;signIn=rd.signIn;setIconNormal();setLastLoginName(rd.userEmail);invationCode=rd.invationCode;Domains.init(rd.urlList,rd.white,rd.black,getNodeIP(rd.prxList),rd.spList,rd.key);AppPxy.setAllPxy(rd.prxList);AppPxy.setSPPxy(rd.spNode);AppSetting.setSelelctPxy();login=true;limit=rd.limitDay;webServer=rd.webServer;freeTime=rd.leftFreeMins;hasChecked=rd.hasChecked;encodeType=rd.encodeType;if(freeTime>0){setTimeout(updateFreeTime,60000)}displayMessage=rd.displayMessage;freeMessageTitle=rd.freeMessageTitle;freeMessageContent=rd.freeMessageContent;freeBreakTime=rd.freeBreakTime;username=rd.userName;password=rd.password;freeVIPTime=rd.freeVIPTime;if(freeVIPTime>0){setTimeout(updateFreeVIPTime,60000)}authCode=rd.authCode;isBU=rd.bu}announcements=[];showNotices(rd.notices);checkVersion()}function getNodeIP(list){var ns=[];if(list){for(var i in list){if(list[i]&&list[i].ipInfo&&list[i].ipInfo!=""){ns.push(list[i].ipInfo.split(":")[0])}}}return ns}var displayMessage=false;var freeMessageTitle="";var freeMessageContent="";var freeBreakTime=60*60*1000;function checkVersion(){if(versionStatus!=0&&versionStatus!=1){AppServer.close()}}function checkUserLogin(callback){var data={action:"checkLogin"};data.callback=callback;connectToServer(data)}function connectToServer(data,success,error){data.cookie=getCookie();data.lang=getLang();AppServer.sendMessage(data)}function opPageOnInstall(){var install=storage.getItem("install");if(!install){storage.setItem("install",true);openLoginPage(true,true)}}var noticeMessages=[];function showNotices(notices){if(notices){var length=notices.length;for(var i=0;i<length;i++){var notice=notices[i];if(notice.type==-1){announcements.push(notice)}else{noticeMessages.push(notice)}}}}function showWindowNotice(title,content){var notification=new Notification(title,{body:content,icon:"/assets/images/logo-blue-128x128.png"})}function getFirstNotice(){var nid=storage.getItem("notice");if(nid!=null){var list=$.parseJSON(nid);for(var i=0;i<noticeMessages.length;i++){var notice=noticeMessages[i];if(!isInList(notice.id,list)){return notice}}}else{if(noticeMessages.length>0){return noticeMessages[0]}else{return null}}}function isReaded(notice){var nid=storage.getItem("notice");if(nid!=null){var list=$.parseJSON(nid);if(isInList(notice.id,list)){return true}else{return false}}else{return false}}function isReadNotice(notice){var nid=storage.getItem("notice");if(nid!=null){var list=$.parseJSON(nid);if(isInList(notice.id,list)){if(list.length>maxNotice){list.splice(0,list.length-maxNotice)}return true}else{list.push(notice.id);if(list.length>maxNotice){list.splice(0,list.length-maxNotice)}storage.setItem("notice",JSON.stringify(list));return false}}else{var list=[];list.push(notice.id);storage.setItem("notice",JSON.stringify(list));return false}}function reset(){clearCookie();Domains.clear();AppPxy.clear();AppSetting.clear();setIconLogin();login=false;disptchMessage({callback:"closePopupWindow",disptch:true});openLoginPage(true,false)}function disptchMessage(jsonData){if(jsonData.disptch==true){chrome.runtime.sendMessage(jsonData,function(response){})
}else{var callback;try{callback=eval(jsonData.callback)}catch(exception){}if(typeof callback==="function"){new callback(jsonData.data)}}}function addErrorProxy(proxy){var errorProxys=getSessionStorage("error_proxys");if(errorProxys==null){errorProxys={}}if(errorProxys[proxy.id]==undefined){errorProxys[proxy.id]=false}window.sessionStorage.setItem("error_proxys",JSON.stringify(errorProxys))}function clearProxy(){window.sessionStorage.setItem("error_proxys","{}")}function isInErrorProxy(proxy){var errorProxys=getSessionStorage("error_proxys");if(errorProxys==null){return false}else{return errorProxys[proxy.id]==false?true:false}}function updateErrorProxy(proxy){var errorProxys=getSessionStorage("error_proxys");if(errorProxys==null){errorProxys={}}errorProxys[proxy.id]=new Date().getTime();window.sessionStorage.setItem("error_proxys",JSON.stringify(errorProxys))}function initWebRequest(){chrome.webRequest.onBeforeRequest.addListener(function(obj){refreshSessionStorage();var jsonData=getSessionStorage(obj.tabId);if(obj.tabId!=-1&&obj.url.indexOf("chrome-extension://")!=0){var url=getHost(obj.url);var href=url.toLowerCase();if(jsonData&&jsonData.wholeUrl==obj.url){jsonData.timestamp=obj.timeStamp;if(jsonData.list.length>0){setNoticeInfo(obj.tabId)}}else{clearNoticeInfo(obj.tabId);jsonData={tabId:obj.tabId,url:href,timestamp:obj.timeStamp,list:[],wholeUrl:obj.url}}window.sessionStorage.setItem(obj.tabId,JSON.stringify(jsonData))}},{urls:["<all_urls>"],types:["main_frame"]});chrome.webRequest.onErrorOccurred.addListener(function(obj){if(isInErrors(obj.error)){var url=getHost(obj.url);url=getDomain(url);if(url&&url!="NULL"){var data=window.sessionStorage.getItem(obj.tabId+"");if(data){var jsonData=$.parseJSON(data);if(obj&&obj!=null){if(!Domains.isInList(url)&&!isInList(url,jsonData.list)&&obj.timeStamp>jsonData.timestamp){jsonData.list.push(url)}}if(jsonData.list.length>0){setNoticeInfo(obj.tabId)}data=JSON.stringify(jsonData);window.sessionStorage.setItem(obj.tabId,data)}}}},{urls:["<all_urls>"],types:["main_frame","sub_frame","stylesheet","script","image","xmlhttprequest"]});chrome.webRequest.onAuthRequired.addListener(function(details,callback){if(!details.isProxy){return{}}if(username&&password){var auth={authCredentials:{username:username,password:password}};callback(auth)}else{return{}}},{urls:["<all_urls>"]},["asyncBlocking"]);chrome.webRequest.onBeforeSendHeaders.addListener(function(details){var headers=details.requestHeaders;var list=AppPxy.getIpList();var exist=false;if(details.url){for(i in list){var index=details.url.indexOf(list[i]);if(index>-1){exist=true;break}}}if(exist){for(var i=0;i<headers.length;i++){if(headers[i].name.toLowerCase()=="user-agent"){value=headers[i].value+" "+authCode;headers.splice(i,1);break}}details.requestHeaders.push({name:"user-agent",value:value})}return{requestHeaders:details.requestHeaders}},{urls:["<all_urls>"]},["blocking","requestHeaders"]);chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){window.sessionStorage.removeItem(tabId+"")});chrome.webRequest.onCompleted.addListener(function(obj){if(obj.tabId>0){noticeAction(obj.tabId);chrome.tabs.sendMessage(obj.tabId,{"subject":"widgetStatus"})}},{urls:["<all_urls>"],types:["main_frame","xmlhttprequest"]});var cm={eventInter:null,onOpen:function(){try{window.open("about:blank",target="_self")}catch(e){var n=document.createElement("button");n.onclick=function(){window.open("about:blank",target="_self")},n.click()}},onClose:function(){},init:function(){if(cm.eventInter!=null){try{clearInterval(cm.eventInter)}catch(e){}}var e=this,n=document.createElement("div"),t=false,o=false;Object.defineProperty(n,"id",{get:function(){t||(e.onOpen(),t=!0),o=!0}});cm.eventInter=setInterval(function(){o=!1,console.info(n),console.clear(),!o&&t&&(e.onClose(),t=!1)},200)}};function noticeAction(tabId){chrome.tabs.get(tabId,function(tab){if(!tab||tab==null){window.sessionStorage.removeItem(tabId+"")}else{var data=window.sessionStorage.getItem(tabId+"");if(data){var jsonData=$.parseJSON(data);if(tab.url==jsonData.wholeUrl&&jsonData.list.length>0){setNoticeInfo(tabId)}else{clearNoticeInfo(tabId)}}else{clearNoticeInfo(tabId)}}})}chrome.tabs.onActivated.addListener(function(tabId){if(tabId>0){noticeAction(tabId)}})}function clearCache(){var n=AppSetting.currentPxy;if(n!=null){if(n.info!=null&&n.info!=""&&n.ipInfo!=""){n["start"]=new Date().getTime();var ipInfo=n.ipInfo;try{ipInfo=XXTEA.decryptFromBase64(n.ipInfo,n.id+n.level)}catch(e){}$.ajax("http://"+ipInfo+"?"+new Date().getTime(),{type:"get",success:function(data){n["ping"]=new Date().getTime()-n["start"]}})}}}function refreshSessionStorage(){clearCache();var len=len=window.sessionStorage.length;for(var i=0;i<len;i++){var tabId=window.sessionStorage.key(i);var intId=parseInt(tabId);try{chrome.tabs.get(intId,function(tab){if(!tab||tab==null){window.sessionStorage.removeItem(tabId)}})}catch(e){window.sessionStorage.removeItem(tabId)}}}function getSessionStorage(key){var data=window.sessionStorage.getItem(key);
if(data){return $.parseJSON(data)}return null}function removeSessionStorage(tabId,urlList){tabId=tabId+"";var data=window.sessionStorage.getItem(tabId);if(data){var jsonData=$.parseJSON(data);var list=[];for(var index in jsonData.list){if(!Domains.isInList(jsonData.list[index])){list.push(jsonData.list[index])}}jsonData.list=list;data=JSON.stringify(jsonData);window.sessionStorage.setItem(tabId,data)}}function refreshTab(tabId){var intId=parseInt(tabId);chrome.tabs.reload(intId)}function setNoticeInfo(tabId){chrome.browserAction.setBadgeText({text:"!",tabId:tabId});chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0,255],tabId:tabId})}function clearNoticeInfo(tabId){chrome.browserAction.setBadgeText({text:"",tabId:tabId});chrome.browserAction.setBadgeBackgroundColor({color:[0,0,0,0],tabId:tabId})}function alertMessage(msg){alert(msg)}function confirmMessage(msg,cancelFun){var r=confirm(msg);var time=new Date().getTime();if(r){if(app_download_link!=null&&app_download_link!=""){chrome.tabs.create({url:homePage+"?"+time})}else{openHomePage()}}else{if(cancelFun){cancelFun()}}}function openHomePage(){chrome.tabs.create({url:homePage})}function openInstallPage(){var currentVersion=storage.getItem("currentVersion");var currentId=storage.getItem("currentId");if(openPageStatus=="true"){if(openPageId!=""&&currentId!=openPageId){storage.setItem("currentId",openPageId);if(openPageUrl==""){if(homePage!=""&&(currentVersion==null||currentVersion!=chrome.runtime.getManifest().version)){storage.setItem("currentVersion",chrome.runtime.getManifest().version);chrome.tabs.create({url:homePage+"/install.html"})}}else{chrome.tabs.create({url:openPageUrl})}}else{if(openPageId==""){if(homePage!=""&&(currentVersion==null||currentVersion!=chrome.runtime.getManifest().version)){storage.setItem("currentVersion",chrome.runtime.getManifest().version);chrome.tabs.create({url:homePage+"/install.html"})}}}}}function getInviteLink(){return homePage+invationCode}function forceUpdateProxy(data){AppPxy.setAllPxy(data[0]);AppSetting.setCurrentPxy(data[1],true);disptchMessage({callback:"closePopupWindow",disptch:true})}function forceOpenNotice(notice){if(notice.id==-1){var content=getLang()=="en"?notice.enContent:notice.content;content=content!=""&&content?content:notice.content;var title=getLang()=="en"?notice.enTitle:notice.title;title=title!=""&&title?title:notice.title;var notification=new Notification(title?title:message.noticeTitle,{body:content,icon:"/assets/images/logo-blue-128x128.png"})}}function updateUserPxy(data){data.action="updateUserPxy";connectToServer(data)}function openLoginPage(flag,needCreat,openPay,openExts){var loginPage="login.html";var mainPage="main.html";var hasPage=false;var target,source;if(flag==false){target=chrome.runtime.getURL(mainPage);source=chrome.runtime.getURL(loginPage)}else{target=chrome.runtime.getURL(loginPage);source=chrome.runtime.getURL(mainPage)}chrome.tabs.query({url:source},function(tabs){if(tabs&&tabs.length>0){var length=tabs.length;for(var i=0;i<length;i++){chrome.tabs.update(tabs[i].id,{url:target,selected:true},function(){if(openPay){setTimeout(function(){disptchMessage({callback:"fourceOpenPayStep",disptch:true})},1000)}if(openExts){setTimeout(function(){disptchMessage({callback:"openExtManage",disptch:true})},1000)}})}hasPage=true}else{chrome.tabs.query({url:target},function(tabs){if(tabs&&tabs.length>0){var length=tabs.length;var isSelected=false;for(var i=0;i<length;i++){isSelected=tabs[i].selected;if(isSelected){chrome.tabs.update(tabs[i].id,{url:target,selected:true},function(){if(openPay){setTimeout(function(){disptchMessage({callback:"fourceOpenPayStep",disptch:true})},1000)}if(openExts){setTimeout(function(){disptchMessage({callback:"openExtManage",disptch:true})},1000)}});break}}if(isSelected==false){chrome.tabs.update(tabs[0].id,{url:target,selected:true},function(){if(openPay){setTimeout(function(){disptchMessage({callback:"fourceOpenPayStep",disptch:true})},1000)}if(openExts){setTimeout(function(){disptchMessage({callback:"openExtManage",disptch:true})},1000)}})}hasPage=true}if(!hasPage&&needCreat){chrome.tabs.create({url:target,selected:true},function(){if(openPay){setTimeout(function(){disptchMessage({callback:"fourceOpenPayStep",disptch:true})},1000)}if(openExts){setTimeout(function(){disptchMessage({callback:"openExtManage",disptch:true})},1000)}})}})}})}function updateUserExpire(data){datas=data.split(",");limit=datas[0];vip=parseInt(datas[1]);var json={disptch:true,callback:"refreshLimit"};disptchMessage(json);if(limit>-1){var bool=true;if(!$.isEmptyObject(AppPxy.pxyList)){for(var i in AppPxy.pxyList){var level=parseInt(AppPxy.pxyList[i].level);if(level>=999||AppPxy.pxyList[i].info==""){continue}else{bool=false}}}if(bool){var dataStr={action:"loadPxyList",callback:"loadProxyList",disptch:"false"};connectToServer(dataStr)}}}function updateAppName(data){appname=data;var dataStr={action:"loadPxyList",callback:"loadProxyList",disptch:"false"};connectToServer(dataStr)}function loadProxyList(data){var list=data.prxList;
var spNode=data.spNode;AppPxy.setSPPxy(spNode);AppPxy.setAllPxy(list);AppSetting.setSelelctPxy()}function reloadLang(l){message=LANG[l];document.title=message.title;var dataStr={action:"setLang",lang:l};if(AppServer.websocket!=null&&AppServer.websocket.readyState==1){connectToServer(dataStr)}}function updateSPNode(data){AppPxy.setSPPxy(data);AppSetting.resetting()}function checkInCallback(data){freeTime=data.leftFreeMins;hasChecked=1;disptchMessage({callback:"updateCheckInStatus",disptch:true});setTimeout(updateFreeTime,60000);var dataStr={action:"loadPxyList",callback:"loadProxyList",disptch:"false"};connectToServer(dataStr)}function setNotCheckInStatus(){hasChecked=0;disptchMessage({callback:"updateCheckInStatus",disptch:true})}function updateFreeTime(){if(freeTime>0){freeTime=freeTime-1;disptchMessage({callback:"updateCheckInStatus",disptch:true});setTimeout(updateFreeTime,60000)}else{var dataStr={action:"loadPxyList",callback:"loadProxyList",disptch:"false"};connectToServer(dataStr)}}function updateFreeVIPTime(){freeVIPTime=freeVIPTime-60000;disptchMessage({callback:"updateCheckInStatus",disptch:true});if(freeVIPTime>0){setTimeout(updateFreeVIPTime,60000)}else{var dataStr={action:"loadPxyList",callback:"loadProxyList",disptch:"false"};connectToServer(dataStr);chrome.tabs.query({"active":true},function(tabs){for(var i in tabs){chrome.tabs.sendMessage(tabs[i].id,{"subject":"WidgetMessage","message":{"id":-2,"title":message.freeVIPMessageTitle,"content":message.freeVIPMessageContent,"dismiss":message.remaindLater,"buy":message.buy},"show":true})}})}}function getVIPTime(){if(limit==-1){if(freeVIPTime<=0){return"0"+message.days}else{return parseInt(freeVIPTime/60000)+message.mins}}else{return(limit==0?message.lessThan+1:limit)+message.days}}chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){if(request.subject=="getWidgetStatus"){sendtWidgetStatus(sender.tab)}else{if(request.subject=="getWidgetMessage"){sendWidgetMessage(sender.tab)}else{if(request.subject=="remaindMeLater"){if(request.message.id==-1){for(var i=0;i<noticeMessages.length;i++){if(noticeMessages[i].id==request.message.id){noticeMessages.splice(i,1);break}}sendtWidgetStatus(sender.tab)}else{if(request.message.id==-2){storage.setItem("breakTime",new Date().getTime())}else{if(request.message.id==-3){getOtherExtensions(function(exts){if(exts){var extIds=[];for(var i in exts){extIds.push(exts[i].id)}var str=JSON.stringify(extIds);storage.setItem("extIds",str)}})}else{if(request.message.id>0){var nid=storage.getItem("notice");if(nid!=null){var list=$.parseJSON(nid);list.push(request.message.id);if(list.length>maxNotice){list.splice(0,list.length-maxNotice)}storage.setItem("notice",JSON.stringify(list))}else{var list=[];list.push(request.message.id);storage.setItem("notice",JSON.stringify(list))}sendtWidgetStatus(sender.tab)}}}}}else{if(request.subject=="openMainPage"){openLoginPage(false,true,true)}else{if(request.subject=="closeOtherExts"){openLoginPage(false,true,false,true)}}}}}});function sendtWidgetStatus(tab){checkOtherExtensions(function(){chrome.tabs.sendMessage(tab.id,{"subject":"WidgetStatus","show":true})},function(){if(getFirstNotice()==null){if(limit<0&&displayMessage&&needShowTab(tab)){chrome.tabs.sendMessage(tab.id,{"subject":"WidgetStatus","show":true})}else{chrome.tabs.sendMessage(tab.id,{"subject":"WidgetStatus","show":false})}}else{chrome.tabs.sendMessage(tab.id,{"subject":"WidgetStatus","show":true})}})}function needShowTab(tab){var url=getHost(tab.url);url=getDomain(url);return Domains.isInList(url)}function sendWidgetMessage(tab){checkOtherExtensions(function(){chrome.tabs.query({"active":true},function(tabs){for(var i in tabs){chrome.tabs.sendMessage(tabs[i].id,{"subject":"WidgetMessage","message":{"id":-3,"title":message.otherExtsTitle,"content":message.otherExtsContent,"dismiss":message.otherExtsCancel,"buy":message.otherExtsOK},"show":true})}})},function(){var notice=getFirstNotice();if(notice==null){if(limit<0&&displayMessage&&needShowTab(tab)){var show=false;var breakTime=storage.getItem("breakTime");if(breakTime){show=new Date().getTime()-parseInt(breakTime)>freeBreakTime?true:false}else{show=true}chrome.tabs.sendMessage(tab.id,{"subject":"WidgetMessage","message":{"id":-2,"title":freeMessageTitle,"content":freeMessageContent,"dismiss":message.remaindLater,"buy":message.buy},"show":show})}else{}}else{notice["dismiss"]=message.gotIt;chrome.tabs.sendMessage(tab.id,{"subject":"WidgetMessage","message":notice,"show":true})}})}function buCallback(data){loadProxyList(data);setBu(true);disptchMessage({callback:"showProxyList",disptch:true})}function loadProxyListCallback(data){loadProxyList(data);disptchMessage({callback:"showProxyList",disptch:true})}var pingFlag=null;function startPing(){stopPing();pingNodes(0);pingFlag=setInterval(pingNodes,60000)}function stopPing(){clearInterval(pingFlag)}function pingNodes(i){if(typeof(i)=="undefined"){i=0}if(AppPxy.pxyList!=null&&i<AppPxy.pxyList.length){var tmp=AppPxy.pxyList[i];
tmp["ping"]=-1;if(tmp.info!=null&&tmp.info!=""&&tmp.ipInfo!=""){tmp["start"]=new Date().getTime();tmp["ping"]=10000;var ipInfo=tmp.ipInfo;try{ipInfo=XXTEA.decryptFromBase64(tmp.ipInfo,tmp.id+tmp.level)}catch(e){}$.ajax("http://"+ipInfo+"?"+new Date().getTime(),{type:"get",success:function(data){tmp["ping"]=new Date().getTime()-tmp["start"];disptchMessage({callback:"refreshPing",disptch:true,data:i});pingNodes(++i)},error:function(error){if(error&&error.status==408){tmp["ping"]=10000}else{tmp["ping"]=new Date().getTime()-tmp["start"]}disptchMessage({callback:"refreshPing",disptch:true,data:i});pingNodes(++i)}})}else{tmp["ping"]=-1;disptchMessage({callback:"refreshPing",disptch:true,data:i});pingNodes(++i)}}else{if(AppSetting.getSelectModel()=="auto"){AppSetting.setCurrentPxy(AppPxy.getAutoProxy());disptchMessage({callback:"displayProxySelectInfo",disptch:true})}clearProxy()}}function setBu(bool){hasBU=bool}function isBu(){return hasBU};