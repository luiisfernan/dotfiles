var OptionsPage=new function(){function e(e){for(var t=e.split("."),o=!1,n=0,a=t.length;!o&&n<a;n++)o=o||0===t[n].indexOf("xn--");if(o)try{e=punycode.ToUnicode(e)}catch(e){}return e}function t(){i18n.localizeHtml(),o.bindElements(),chrome.extension.onMessage.addListener(function(e,t,n){switch(e.command){case"usernameChanged":o.updateUsername(e);break;case"listsWasUpdateFromPopup":o.needUpdateAfterFocus=!0}}),chrome.extension.sendMessage({command:"username"},o.updateUsername),o.renderLists(),document.getElementById("loginButton").onclick=function(){chrome.tabs.create({url:"https://www.hideman.net/panel/chromeAuth?extId="+chrome.i18n.getMessage("@@extension_id")})},document.getElementById("logoutButton").onclick=function(){chrome.extension.sendMessage({command:"logout"},o.updateUsername)},window.onfocus=function(){o.needUpdateAfterFocus&&(o.emptyLists(),o.renderLists(),o.needUpdateAfterFocus=!1)}}var o=this;o.bindElements=function(){o.autoGeneratedView=document.getElementById("autoGeneratedView"),o.accountInfoView=document.getElementById("accountInfoView"),o.usernameText=document.getElementById("usernameText"),o.listItemTpl=document.getElementById("options-list-item-tpl").innerHTML,[ListStorage.Types.white,ListStorage.Types.black].forEach(function(e){var t=document.getElementById("add-to-list-"+e),n=document.getElementById("add-to-list-"+e+"-value");n.onkeyup=function(e){"true"==t.parentNode.dataset.error&&o.getHostName(n.value)&&(t.parentNode.dataset.error=null)},t.onsubmit=function(){var a=n.value;if(Log.i("adding new element to "+e+" list, element: "+a),""===a)return!1;var i=o.getHostName(a);return i?(ListStorage.addElementToList(e,a,function(t){t&&o.appendListItem(e,t,0),n.value=""},o.removeListItem),!1):"true"!=t.parentNode.dataset.error&&(t.parentNode.dataset.error=!0,n.focus(),Log.i("attempt to add incorrect hostname"),!1)}})},o.updateUsername=function(e){e.username?(o.accountInfoView.style.display="block",o.autoGeneratedView.style.display="none",o.usernameText.innerText=e.username):(o.accountInfoView.style.display="none",o.autoGeneratedView.style.display="block")},o.renderLists=function(){[ListStorage.Types.white,ListStorage.Types.black].forEach(function(e){ListStorage.getElements(e,function(t,n){for(var a=0;a<n.length;a++)o.appendListItem(e,n[a])})})},o.emptyLists=function(){[ListStorage.Types.white,ListStorage.Types.black].forEach(function(e){for(var t=document.getElementById("list-"+e);t.firstChild;)t.removeChild(t.firstChild);var o=document.getElementById("add-to-list-"+e+"-value");o.value=""})},o.ItemMode={show:"show",edit:"edit"},o.appendListItem=function(t,n,a){function i(){Log.i("switch to edit mode"),c.dataset.mode=OptionsPage.ItemMode.edit,g.focus(),g.selectionStart=g.selectionEnd=g.value.length}function s(){if(Log.i("save changes"),setTimeout(function(){clearTimeout(l)},0),""===g.value)return g.onblur=null,void r();var e=o.getHostName(g.value);return e?n.value===e?void c.setAttribute("data-mode",OptionsPage.ItemMode.show):(g.onblur=null,n.value=e,void o.updateItem(t,n,c)):"true"==c.dataset.error?void d():(c.dataset.error=!0,g.focus(),void Log.i("attempt to save incorrect hostname"))}function d(){Log.i("cancel changes"),g.value=n.value,c.dataset.mode=OptionsPage.ItemMode.show,c.dataset.error=null,setTimeout(function(){clearTimeout(l)},0)}function r(){Log.i("remove element"),o.removeItem(t,n.id)}var u=o.listItemTpl.replace(/%domain%/g,e(n.value)),c=document.createElement("div");c.classList.add("site-list__item"),c.setAttribute("data-id",n.id),c.setAttribute("data-mode",OptionsPage.ItemMode.show),c.innerHTML=u;var m=document.getElementById("list-"+t);void 0===a&&(a=-1),a==-1?m.appendChild(c):m.insertBefore(c,m.children[a]),c=document.querySelector('DIV[data-id="'+n.id+'"]');var l,g=document.querySelector('DIV[data-id="'+n.id+'"] INPUT'),f=document.querySelector('DIV[data-id="'+n.id+'"] .button-first'),p=document.querySelector('DIV[data-id="'+n.id+'"] .button-second');c.onmouseover=function(e){e.target.dataset.mode&&(f.style.opacity=.8,f.style.color="#007aff")},c.onmouseout=function(e){e.target.dataset.mode&&(f.style.opacity=null,f.style.color=null)},c.onclick=function(e){e.target.dataset.mode&&c.dataset.mode==OptionsPage.ItemMode.show&&(i(),f.style.opacity=null,f.style.color=null)},g.onkeyup=function(e){switch(e.keyCode){case 13:return void s();case 27:return void d()}"true"==c.dataset.error&&o.getHostName(g.value)&&(c.dataset.error=null)},g.onblur=function(e){Log.i("blur"),l=setTimeout(s,100)},f.onclick=function(e){switch(c.dataset.mode){case OptionsPage.ItemMode.show:i();break;case OptionsPage.ItemMode.edit:s()}return!1},p.onclick=function(e){switch(c.dataset.mode){case OptionsPage.ItemMode.show:r();break;case OptionsPage.ItemMode.edit:d()}}},o.updateItem=function(t,n,a){Log.i("update element "+JSON.stringify(n)),ListStorage.addOrUpdateElement(t,n,function(t){a.dataset.mode=OptionsPage.ItemMode.show;var o=e(t.value);document.querySelector('DIV[data-id="'+t.id+'"] input').value=o;var n=document.querySelector('DIV[data-id="'+t.id+'"] a');n.href="http://"+o,n.innerText=o},o.removeListItem)},o.removeItem=function(e,t){return Log.i("removing element "+e+", id: "+t),ListStorage.removeElementById(e,t,function(e){o.removeListItem(e)}),!1},o.removeListItem=function(e){if(Log.i("removing visual element id: "+e),null!=e){var t=document.querySelector('DIV[data-id="'+e+'"]');t.style.height=0,t.style.opacity=0,setTimeout(function(){t.remove()},200)}},o.getHostName=function(e){/^https?:\/\//.test(e)||(e="http://"+e);var t;try{t=new URL(e)}catch(e){return!1}return!(t.hostname.indexOf("%")>0)&&t.hostname},t()};