var Api=new function(){var e=this;e.RETRIES_MAX=9,e.USER_AGENT=function(){function e(){var e=navigator.userAgent;return start=e.indexOf("Chrome"),stop=e.indexOf(" ",start),start<0||stop<0||start>=stop?"getChromeVersionError":e.substring(start+7,stop)}return"chrome,"+chrome.i18n.getMessage("@@ui_locale").substr(0,2)+","+chrome.app.getDetails().version+","+e()+","+chrome.i18n.getMessage("lang")}(),e.Method={GET:"GET",POST:"POST"},e.Accessibility={PUBLIC:0,PRIVATE:1},e.Errors={WTF:0,OK:200,TOKEN_INVALID:528,PERMANENT_TOKEN_INVALID:543,ACCOUNT_INACTIVE_OR_BANNED:534,METHOD_NOT_FOUND:529,AGENT_INCORRECT:542},e.Commands={REGISTER:{name:"register",method:e.Method.POST,accessibility:e.Accessibility.PUBLIC},TOKEN_RENEW:{name:"token-renew",method:e.Method.POST,accessibility:e.Accessibility.PUBLIC},CONNECTIONS:{name:"connections",method:e.Method.GET,accessibility:e.Accessibility.PRIVATE},IP:{name:"ip",method:e.Method.GET,accessibility:e.Accessibility.PRIVATE}},e.send=function(t,o,n,s){if(t.accessibility===e.Accessibility.PRIVATE&&!o.token)return void Auth.getToken(function(r){o.token=r,e.send(t,o,n,s)});var r=new XMLHttpRequest,i="agent="+encodeURIComponent(e.USER_AGENT);for(var a in o)i+="&"+a+"="+encodeURIComponent(o[a]);Log.api("send "+t.name+" "+i);var c="";t.method===e.Method.GET&&(c="?"+i),r.open(t.method,"https://www.hideman.net/api/v2/"+t.name+c,!0),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),r.setRequestHeader("X-Ignore-Cookie","1"),r.onreadystatechange=function(){return 4==r.readyState&&(Log.api("response "+t.name+" "+r.responseText),!!e.process(r.responseText,n)||(s=1|s,s>=e.RETRIES_MAX?Log.e("can't get answer "+t.name):(s++,Log.i("generate another try"),void setTimeout(function(){e.send(t,o,n,s)},2500))))},t.method===e.Method.GET?r.send():t.method===e.Method.POST&&r.send(i)},e.process=function(t,o){try{var n=JSON.parse(t)}catch(e){return Log.i(e),!1}if(!n.meta||!n.meta.code)return Log.i("json haven't meta section"),!1;switch(n.meta.code){case e.Errors.TOKEN_INVALID:return Auth.resetToken(),!1;case e.Errors.AGENT_INCORRECT:case e.Errors.METHOD_NOT_FOUND:return!1;case e.Errors.ACCOUNT_INACTIVE_OR_BANNED:case e.Errors.PERMANENT_TOKEN_INVALID:return Auth.logout(),!1;default:return o(n.meta.code,n.response),!0}}};