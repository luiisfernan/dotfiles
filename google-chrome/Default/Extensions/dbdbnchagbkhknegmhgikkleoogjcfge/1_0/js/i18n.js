var i18n=new function(){var n=this;n.localizeHtml=function(){var n=document.getElementsByTagName("html")[0],e=n.innerHTML.toString(),t=e.replace(/__MSG_(\w+)__/g,function(n,e){if(e){var t=chrome.i18n.getMessage(e);return""===t?e:t}return""});e!=t&&(n.innerHTML=t)}};