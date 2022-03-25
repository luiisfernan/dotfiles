var AppServer={server:["https://ext1.faststunnel-api.com","https://ext2.faststunnel-api.com"],serverIndex:0,rootIndex:0,websocket:null,count:0,connected:false,connectedTimeout:20000,pingCount:0,init:function(){var lastAccessRoot=storage.getItem("lastAccessTime");var timeout=storage.getItem("timeout");if(timeout!=null){this.connectedTimeout=parseInt(timeout)}var now=new Date().getTime()/1000;if(lastAccessRoot==null||(now-parseInt(lastAccessRoot)>28800)){this.accessRoot();storage.setItem("lastAccessTime",now)}else{this.server=this.getServerFromStorage();this.pingServer()}},close:function(){if(this.websocket==null||this.websocket.readyState!=1){this.websocket.close()}},pingServer:function(){setIconMessage(message.loginServer);var now=new Date().getTime()/1000;this.serverIndex=parseInt(now%this.server.length);var that=this;if(this.server&&(this.server instanceof Array)&&this.server[this.serverIndex]&&this.pingCount<this.server.length){this.ajax(null,"GET",function(data){storage.setItem("server",JSON.stringify(that.server));that.pingCount=0;that.tryLogon()},function(e){setIconOff();that.serverIndex++;setTimeout(function(){that.pingServer()},1000)},this.server[this.serverIndex]+"/ping.png?"+new Date().getTime(),false)}else{this.serverIndex=0;setTimeout(function(){that.accessRoot()},1000)}this.pingCount++},accessRoot:function(){this.pingCount=0;setIconMessage(message.loginServer);var that=this;var time=Math.ceil(new Date().getTime()/1000);if(this.root[this.rootIndex]){this.ajax(null,"GET",function(data){data=JSON.parse($.base64.atob($.trim(data.replace(/DEBUG/g,"").split('').reverse().join(''))));that.server=data.api;homePage=data.website;if(data.timeout){that.connectedTimeout=parseInt(data.timeout);storage.setItem("timeout",data.timeout)}var min_version=data.min_web_version;if(parseFloat(min_version)>parseFloat(version)){alert(message.needUpdate);openHomePage()}that.pingServer()},function(){that.rootIndex++;setTimeout(function(){that.accessRoot()},1000)},this.root[this.rootIndex]+"?"+time,false)}else{this.rootIndex=0;setTimeout(function(){that.accessRoot()},1000)}},tryLogon:function(){var cookie=getCookie();if(cookie==null||cookie==""){opPageOnInstall();setIconLogin()}else{this.initWebSocket()}},root: ["https://getoinfo.com/README.md","https://gitlab.com/getoinfo/info/-/raw/main/README.md","https://gitee.com/get2info/info/raw/master/README.md"],initWebSocket:function(func){setIconMessage(message.loginServer);var that=this;var uri=this.getWSServer();if(this.websocket==null||this.websocket.readyState!=1){var query=this.getQueryStr();query.envo=0;var params=parseParam(query);if("WebSocket" in window){this.connected=false;setTimeout(function(){that.checkWS()},that.connectedTimeout);this.websocket=new WebSocket(uri+"?"+params)}else{if("MozWebSocket" in window){this.connected=false;setTimeout(function(){that.checkWS()},that.connectedTimeout);this.websocket=new MozWebSocket(uri+"?"+params)}else{alert("your browser not support websocket!");return}}this.bindWebSocketEvent(func)}else{if(func){func()}}},getQueryStr:function(){var query={"version":version};var cookie=getCookie();var lastUser=getLastLoginName();var hasDomains=Domains.checkDomains();query.lang=getLang();query.hasDomains=hasDomains;query.v=versionCode;if(cookie){query.cookie=cookie}if(lastUser){query.lastUser=lastUser}var bu=isBu();if(bu){query.bu=bu}return query},bindWebSocketEvent:function(func){var that=this;this.websocket.onopen=function(event){that.count=0;if(func){func()}};this.websocket.onmessage=function(event){if(event&&event.data){that.connected=true;var data=event.data;if(typeof data=="string"){if(data=="NOT_LOGIN"){reset()}else{if(data=="FORCE_LOGOUT"){reset();alert(message.forceLogout)}else{if(data=="PING"){that.sendMessage("PONG")}else{var jsonData=$.parseJSON(data);if(jsonData.status>=200&&jsonData.status<400){disptchMessage(jsonData)}else{if(jsonData.status==500){alert(jsonData.msg)}}}}}}else{var reader=new FileReader();reader.onload=function(eve){if(eve.target.readyState==FileReader.DONE){window.localStorage.setItem("image",this.result);disptchMessage({callback:"displayAuthCode",disptch:true})}};reader.readAsDataURL(data)}}};this.websocket.onclose=function(event){hasBU=false;AppSetting.setProxy();var cookie=getCookie();if(cookie!=null&&cookie!=""){if(versionStatus==0||versionStatus==1){setIconOff();that.serverIndex=0;setTimeout(function(){that.pingServer()},2000)}else{setIconUpdate()}}else{}};this.websocket.onerror=function(event){}},getWSServer:function(){var s=this.server[this.serverIndex];var p="ws";var h="https";if(s.indexOf(h)==0){p="wss"}else{h="http"}return this.server[this.serverIndex].replace(h,p)+"/appEndpoint"},getHTTPServer:function(){return this.server[this.serverIndex]+"/appServlet"},getBaseUrl:function(){return this.server[this.serverIndex]+"/"},ajax:function(data,type,callback_success,callback_error,server,sync){if(data){data.lang=getLang()}else{data={lang:getLang()}}$.ajax({type:type,url:server?server:this.getHTTPServer(),data:data,async:typeof(sync)=="undefined"?true:!sync,dataType:"text",success:function(msg){if(msg.indexOf("{")==0){msg=$.parseJSON(msg)}if(callback_success){callback_success(msg)
}},error:function(e){if(callback_error&&e.status!=403){callback_error(e)}}})},sendMessage:function(json,success,error){if(this.websocket!=null&&this.websocket.readyState==1){var str=JSON.stringify(json);this.websocket.send(str);if(success){success()}}else{alert(message.notConnectServer);if(error){error()}}},getServerFromStorage:function(){var s=storage.getItem("server");if(s){return $.parseJSON(s)}else{return this.server}},checkWS:function(){if(!this.connected){if(this.websocket!=null){try{this.websocket.close()}catch(e){console.log(e)}}}}};