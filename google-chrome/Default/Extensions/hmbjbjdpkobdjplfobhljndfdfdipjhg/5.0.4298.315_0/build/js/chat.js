"use strict";var chat=function(){var l,o={CHAT_PRIVILEDGE_ALL:"CHAT_PRIVILEDGE_ALL",CHAT_PRIVILEDGE_ALL_PANELIST:"CHAT_PRIVILEDGE_ALL_PANELIST",CHAT_PRIVILEDGE_HOST:"CHAT_PRIVILEDGE_HOST",CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT:"CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT",CHAT_PRIVILEDGE_HOST_PUBLIC:"CHAT_PRIVILEDGE_HOST_PUBLIC"};function a(e){var t=$(".dl-chatPanel").find('dd[data-msg-id="'+e+'"]');if(t.length){if(t.siblings("dd").length)t.remove();else{var a=t.parent("dl");a.is(":last-child")&&(a.siblings("dl").length?mainAppHtmlWindow.chatObject.lastDtId=a.siblings("dl:last-child").data("lastdtid"):mainAppHtmlWindow.chatObject.lastDtId=""),a.remove()}mainAppHtmlWindow.chatObject.chatMsg=$(".dl-chatPanel").html()}}function n(e){var t,a,n=e.sender,i=e.receiver,s="Me",d="Me",l=mainAppHtmlWindow.getAttendeeObject(i),o=util.getViewerObject(i),r=mainAppHtmlWindow.getAttendeeObject(n),c=util.getViewerObject(n),m=e.receiverIsMySelf&&mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&o.viewerName;e.senderIsMySelf||(d=r.name?mainAppHtmlWindow.common.formatNameByLength(r.name,15):c.viewerName?mainAppHtmlWindow.common.formatNameByLength(c.viewerName,15):mainAppHtmlWindow.common.formatNameByLength(e.senderDisplayName,15),m&&(d=mainAppHtmlWindow.common.formatNameByLength(d,8)),s=mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly?mainAppHtmlWindow.util.htmlEncode(d):'<a class="chatusername" data-name="'+n+'"  data-toallpanelist=0>'+mainAppHtmlWindow.util.htmlEncode(d)+"</a>"),0==i?a=mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar?(t='<a class="chatusername" data-name="0"  data-toallpanelist=0>All panelists and attendees</a>',"All panelists and attendees"):(t='<a class="chatusername" data-name="0"  data-toallpanelist=0>Everyone</a>',"Everyone"):1==i?(t='<a class="chatusername" data-name="0"  data-toallpanelist=1>All Panelists</a>',a="All Panelists"):e.receiverIsMySelf?a=t="Me":(a=l.name?mainAppHtmlWindow.common.formatNameByLength(l.name,15):o.viewerName?mainAppHtmlWindow.common.formatNameByLength(o.viewerName,15):mainAppHtmlWindow.common.formatNameByLength(e.receiverDisplayName,15),m&&"Me"!=s&&(a=mainAppHtmlWindow.common.formatNameByLength(a,8)),t='<a class="chatusername" data-name="'+i+'"  data-toallpanelist=0>'+mainAppHtmlWindow.util.htmlEncode(a)+"</a>");var p="",h="";(e.receiverIsMySelf||e.senderIsMySelf&&1<i)&&(p='<span class="text-privately"> (Direct Message)</span>'),m&&(p="",h=',<a class="chatusername" data-name="0"  data-toallpanelist=1> All Panelists</a>'),!e.receiverIsMySelf||mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||E(n,e.senderDisplayName,0);var u,g,w="From "+s+" to "+t+h+":"+p,A="From "+n+" to "+i,H="From "+mainAppHtmlWindow.util.htmlEncode(d)+" to "+mainAppHtmlWindow.util.htmlEncode(a)+h+":"+p,W=mainAppHtmlWindow.common.getCurrentTime(),v=mainAppHtmlWindow.chatObject.lastDtId,b=""!==v?$("[data-lastDtId='"+v+"']"):"",f=mainAppHtmlWindow.util.htmlEncode(e.content);if(v!==A){$(".dl-chatPanel span.time").removeClass("lasttime"),$(".dl-chatPanel dl").removeAttr("data-lastDtId tabIndex"),b=$("<dl></dl>").attr("data-lastDtId",A).attr("tabindex",1),mainAppHtmlWindow.g.getMeetingStatusObj().isPrivateChatOff?b.append("<dt>"+H+'<span class="time lasttime">'+W+"</span></dt>"):b.append("<dt>"+w+'<span class="time lasttime">'+W+"</span></dt>");var C=$("<dd></dd>");C.attr("data-msg-id",e.msgID),C.append(anchorme({input:f,options:{attributes:{target:"_blank"},exclude:function(e){return!e.startsWith("http:/")&&!e.startsWith("https:/")}}})),b.append(C),$(".dl-chatPanel").append(b)}else{var I=$("<dd></dd>");I.attr("data-msg-id",e.msgID),I.append(anchorme({input:f,options:{attributes:{target:"_blank"},exclude:function(e){return!e.startsWith("http:/")&&!e.startsWith("https:/")}}})),b.append(I),$(".dl-chatPanel span.lasttime").text(W)}if(w,mainAppHtmlWindow.chatObject.chatMsg=$(".dl-chatPanel").html(),0!=mainAppHtmlWindow.chatObject.chatNum){mainAppHtmlWindow.chat.refreshChatRemind("showRemind",t,H,e.content);var O=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");null!==O&&(O.contentWindow.chat.refreshChatRemind("showRemind",t,H,e.content),O.drawAttention())}return y(),mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly&&0==e.senderIsMySelf&&(u=e.sender,(g=util.getViewerObject(u)).viewerName&&!g.hasChatted2Panelists&&(g.hasChatted2Panelists=1,P(mainAppHtmlWindow.attendeeList))),A}function i(){$(".dl-chatPanel").undelegate("dl:not([data-lastDtId])","keydown").delegate("dl:not([data-lastDtId])","keydown",function(e){"ArrowDown"===e.key?(e.stopPropagation(),$(this).next().focus(),$(this).next().attr("data-lastDtId")&&$(".dl-chatPanel dl:not([data-lastDtId])").removeAttr("tabIndex")):"ArrowUp"===e.key?(e.stopPropagation(),$(this).prev().focus()):"Tab"===e.key&&(e.stopPropagation(),e.preventDefault(),$("[data-lastDtId]").focus())}),$(".dl-chatPanel dl").unbind("keydown"),$("[data-lastDtId]").unbind("keydown").keydown(function(e){"ArrowUp"===e.key?(e.stopPropagation(),$(".dl-chatPanel dl:not([data-lastDtId])").attr("tabIndex",2),$(this).prev().focus()):"Tab"===e.key&&(e.stopPropagation(),$(".dl-chatPanel dl:not([data-lastDtId])").removeAttr("tabIndex"))})}function y(){$(".dl-chatPanel dt a").off("click").click(function(){var e=$(this).text();E($(this).attr("data-name"),e,$(this).attr("data-toallpanelist"))})}function t(){var e=parseInt($(".dl-chatPanel").css("maxHeight"))-50;$(".chat-console .userlist").css("maxHeight",e)}function d(e,t){if(""==e||t==[])return!1;for(var a=0;a<t.length;a++)if(t[a].id==e)return!0;return!1}function E(e,t,a){e=Number(e),a=Number(a),mainAppHtmlWindow.chatObject.curReceiverID=e,mainAppHtmlWindow.chatObject.curReceiverName=t;var n=util.getViewerObject(e),i=mainAppHtmlWindow.getAttendeeObject(e);if(0==e||void 0!==n.viewerName||void 0!==i.name)if(mainAppHtmlWindow.chatObject.attendeeChatPriviledge!=o.CHAT_PRIVILEDGE_HOST||mainAppHtmlWindow.chatObject.isHost){if(!(mainAppHtmlWindow.chatObject.attendeeChatPriviledge!=o.CHAT_PRIVILEDGE_ALL_PANELIST||0!=e||0!=a||mainAppHtmlWindow.chatObject.isHost||mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly))return;mainAppHtmlWindow.chatObject.curToAllPanelist=a,s(e,t)}else{if(mainAppHtmlWindow.chatObject.curToAllPanelist=a,!d(e,mainAppHtmlWindow.g.getMeetingStatusObj().coHost)&&e!=mainAppHtmlWindow.g.getMeetingStatusObj().hostId)return;0==mainAppHtmlWindow.g.getMeetingStatusObj().coHost.length&&function(e){if($(".chat-console .userlist").addClass("hideMe"),$(".chat-console .user").addClass("forceHide"),$(".chat-console .only-one").removeClass("forceHide"),null!=e)$(".chat-console .only-one").html("<span class='host-name'>"+mainAppHtmlWindow.util.htmlEncode(e)+"</span>");else{var t=mainAppHtmlWindow.findHostAttendeeObject();void 0===t.name||""===t.name?(console.error("can not find host"),L()):$(".chat-console .only-one").html("<span class='host-name'>"+mainAppHtmlWindow.util.htmlEncode(t.name)+"</span>")}}(),s(e,t)}}function s(e,t){var a=util.getViewerObject(e),n=mainAppHtmlWindow.getAttendeeObject(e);0!=e&&void 0===a.viewerName&&void 0===n.name||($(".chat-console .user-text").text(t),$(".chat-console .userlist dd i.selected").removeClass("selected"),a.viewerName?($(".chat-console .privately").addClass("forceHide"),$(".chat-console .andallplist").removeClass("forceHide"),$(".chat-console .user").css("width","100px"),$("dd[data-userid='"+e+"']").find("i").addClass("selected")):($(".chat-console .andallplist").addClass("forceHide"),$(".chat-console .user").css("width","115px"),"Everyone"==$.trim(t)||"All Panelists"==$.trim(t)||"All panelists and attendees"==$.trim(t)?($(".chat-console .privately").addClass("forceHide"),"Everyone"==$.trim(t)||"All panelists and attendees"==$.trim(t)?($("dd[data-userid='"+e+"'][data-toallpanelist=0]").find("i").addClass("selected"),$("dd[data-userid='"+e+"'][data-toallpanelist=1]").find("i").removeClass("selected")):"All Panelists"==$.trim(t)&&($("dd[data-userid='"+e+"'][data-toallpanelist=1]").find("i").addClass("selected"),$("dd[data-userid='"+e+"'][data-toallpanelist=0]").find("i").removeClass("selected"))):($(".chat-console .privately").removeClass("forceHide"),$("dd[data-userid='"+e+"']").find("i").addClass("selected"))),$(".chat-input textarea").focus())}function r(e){return!e||!(!e.isTelephoneUser&&!e.isH323User)}function P(e){mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar?($(".userlist dl").empty().append('<dd tabindex="1" data-username="All Panelists" data-userid="0"  data-toallpanelist=1><i class="selected img-sprite"></i><span>All Panelists</span><dd data-username="All panelists and attendees"  data-userid="0" data-toallpanelist=0><i class="img-sprite">  </i><span>All panelists and attendees</span></dd></dd>'),mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||(""==$(".user .user-text").text()&&$(".user").empty().append("<span class='user-text'>All panelists and attendees</span><i class='arrow-down'></i>"),function(e){e=e||[];for(var t=0;t<e.length;t++)if(e[t].hasChatted2Panelists){var a=e[t].viewerName,n=mainAppHtmlWindow.common.formatNameByLength(a,20),i=e[t].viewerNodeID;$(".userlist dl").append('<dd tabindex="1" data-username="'+mainAppHtmlWindow.util.htmlEncode(n)+'"  data-userid="'+i+'" data-toallpanelist=0><i class="img-sprite">  </i><span>'+mainAppHtmlWindow.util.htmlEncode(n)+"</span></dd>")}}(mainAppHtmlWindow.viewerList),mainAppHtmlWindow.g.getMeetingStatusObj().isPrivateChatOff||A(e))):(mainAppHtmlWindow.chatObject.attendeeChatPriviledge==o.CHAT_PRIVILEDGE_ALL||mainAppHtmlWindow.chatObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost?($(".user").empty().append("<span class='user-text'>Everyone</span><i class='arrow-down'></i>"),$(".userlist dl").empty().append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>'),A(e),E(0,"Everyone",0)):mainAppHtmlWindow.chatObject.attendeeChatPriviledge==o.CHAT_PRIVILEDGE_HOST_PUBLIC&&($(".user").empty().append("<span class='user-text'>Everyone</span><i class='arrow-down'></i>"),$(".userlist dl").empty(),$(".userlist dl").append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>'),H(mainAppHtmlWindow.attendeeList)),E(mainAppHtmlWindow.chatObject.curReceiverID,mainAppHtmlWindow.chatObject.curReceiverName,0));var t=$('.userlist dd[data-userid="'+mainAppHtmlWindow.chatObject.curReceiverID+'"][data-toallpanelist="'+mainAppHtmlWindow.chatObject.curToAllPanelist+'"]');0<t.length&&($(".userlist i").removeClass("selected"),t.find("i").addClass("selected"))}function c(e){mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar?($(".userlist dl").is(":empty")&&$(".userlist dl").append('<dd tabindex="1" data-username="All Panelists" data-userid="0"  data-toallpanelist=1><i class="selected img-sprite"></i><span>All Panelists</span><dd data-username="All panelists and attendees"  data-userid="0" data-toallpanelist=0><i class="img-sprite">  </i><span>All panelists and attendees</span></dd></dd>'),mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||(""==$(".user .user-text").text()&&$(".user").empty().append("<span class='user-text'>All panelists and attendees</span><i class='arrow-down'></i>"),mainAppHtmlWindow.g.getMeetingStatusObj().isPrivateChatOff||A([e]))):(mainAppHtmlWindow.chatObject.attendeeChatPriviledge==o.CHAT_PRIVILEDGE_ALL||mainAppHtmlWindow.chatObject.isHost?($(".user").empty().append("<span class='user-text'>Everyone</span><i class='arrow-down'></i>"),$(".userlist dl").is(":empty")&&$(".userlist dl").append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>'),A([e])):mainAppHtmlWindow.chatObject.attendeeChatPriviledge==o.CHAT_PRIVILEDGE_HOST_PUBLIC&&($(".user").empty().append("<span class='user-text'>Everyone</span><i class='arrow-down'></i>"),$(".userlist dl").is(":empty")&&$(".userlist dl").append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>'),e.isCoHost&&($(".userlist dl").empty(),$(".userlist dl").append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>'),H(mainAppHtmlWindow.attendeeList))),E(mainAppHtmlWindow.chatObject.curReceiverID,mainAppHtmlWindow.chatObject.curReceiverName,0))}function m(e){var t=e.id||e.viewerNodeID;t&&$('.userlist dl [data-userid="'+t+'"]').remove()}function p(e){var t=mainAppHtmlWindow.common.formatNameByLength(e.name,20),a="";mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&(a=e.isHost?" (Host)":" (Panelist)"),e.isHost?a=" (Host)":e.isCoHost&&(a=" (Co-host)"),$('.userlist dl [data-userid="'+e.id+'"]').attr("data-username",t),$('.userlist dl [data-userid="'+e.id+'"]').find(".name").text(t),$('.userlist dl [data-userid="'+e.id+'"]').find(".identity").text(a),mainAppHtmlWindow.chatObject.curReceiverID==e.id&&($(".chat-console .user-text").text(t),mainAppHtmlWindow.chatObject.curReceiverName=t)}function h(){$(".userlist dl").append('<dd data-username="All Panelists"  data-userid="0" data-toallpanelist=1><i class="img-sprite">  </i><span>All Panelists</span></dd>')}function u(){$(".userlist dl").append('<dd data-username="All panelists and attendees"  data-userid="0" data-toallpanelist=0><i class="img-sprite">  </i><span>All panelists and attendees</span></dd>')}function w(){$(".userlist dl").append('<dd tabindex="1" data-username="Everyone" data-userid="0"  data-toallpanelist=0><i class="selected img-sprite"></i><span>Everyone</span></dd>')}function A(e){for(var t=0;t<e.length;t++)if(!e[t].isMyself&&!r(e[t])){var a=e[t].name,n=mainAppHtmlWindow.common.formatNameByLength(a,20),i=e[t].id;if(i!=mainAppHtmlWindow.myStatusObject.id){var s="";mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&(s=e[t].isHost?'<span class="identity"> (Host)</span>':'<span class="identity"> (Panelist)</span>'),e[t].isHost?s='<span class="identity"> (Host)</span>':e[t].isCoHost&&(s='<span class="identity"> (Co-host)</span>'),$(".userlist dl").append('<dd tabindex="1" data-username="'+mainAppHtmlWindow.util.htmlEncode(n)+'"  data-userid="'+i+'" data-toallpanelist=0><i class="img-sprite">  </i><span class="name">'+mainAppHtmlWindow.util.htmlEncode(n)+"</span>"+s+"</dd>")}}}function H(e){for(var t=0;t<e.length;t++)if(!e[t].isMyself&&!r(e[t])&&(e[t].isHost||e[t].isCoHost)){var a=e[t].name,n=mainAppHtmlWindow.common.formatNameByLength(a,20),i=e[t].id;if(i!=mainAppHtmlWindow.myStatusObject.id){var s="";e[t].isHost?s='<span class="identity"> (Host)</span>':e[t].isCoHost&&(s='<span class="identity"> (Co-host)</span>'),$(".userlist dl").append('<dd tabindex="1" data-username="'+mainAppHtmlWindow.util.htmlEncode(n)+'"  data-userid="'+i+'" data-toallpanelist=0><i class="img-sprite">  </i><span class="name">'+mainAppHtmlWindow.util.htmlEncode(n)+"</span>"+s+"</dd>")}}}function W(e,t,a,n){var i,s,d;"showRemind"==e?(i=t,s=a,d=n,v(mainAppHtmlWindow.chatObject.chatNum),mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||(function(e){var t=0;t="Me"==e?9:3;var a=0;l=setInterval(function(){t<=++a?clearInterval(l):(a%2==1&&$(".chat-common").removeClass("chat-msgRemind"),a%2==0&&$(".chat-common").addClass("chat-msgRemind"))},500),common.registTimer(l)}(i),b(s,d))):"hideRemind"==e&&function(){v(mainAppHtmlWindow.chatObject.chatNum=0);var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");null!==e&&e.contentWindow.chat.refreshChatRemindNumber(0);clearInterval(l)}()}function v(e){mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly?0!=e?($(".chat-number-viewer").text(e),$(".chat-number-viewer").removeClass("forceHide"),$(".img-viewerchat").removeClass("forceHide"),$(".webinar-viewer-bar li.chat").addClass("remind")):($(".chat-number-viewer").addClass("forceHide"),$(".img-viewerchat").addClass("forceHide"),$(".webinar-viewer-bar li.chat").removeClass("remind"),$(".chat-number-viewer").text(0)):0!=e?($(".chat-number").text(e),$(".chat-number").removeClass("forceHide"),$(".chat-common").addClass("chat-msgRemind"),mainAppHtmlWindow.client.autoShow(1,1),mainAppHtmlWindow.toolbar.mouseMoveBind(!1,!1),mainAppHtmlWindow.toolbar.mouseEnterLeaveBind(!1)):($(".chat-number").addClass("forceHide"),$(".chat-common").removeClass("chat-msgRemind"),$(".chat-number").text(0),$(".chatNotice").hide(),mainAppHtmlWindow.toolbar.mouseMoveBind(),mainAppHtmlWindow.toolbar.mouseEnterLeaveBind())}function b(e,t){var a;$(".chatNotice .title").html(e),$(".chatNotice .content").text(t),$(".chatNotice").css("z-index",20).show(),clearTimeout(a),a=setTimeout(function(){$(".chatNotice").hide()},1e4)}function f(){isInsideMainAppWindow()&&mainAppChromeWindow.isFullscreen()?$(".dl-chatPanel").scrollTop($(".dl-chatPanel")[1].scrollHeight):$(".dl-chatPanel").scrollTop($(".dl-chatPanel")[0].scrollHeight)}function C(){g.getMeetingStatusObj().canCopyChatContent?$(".dl-chatPanel").css("user-select","text"):$(".dl-chatPanel").css("user-select","none");var e=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");mainAppChromeWindow.isFullscreen()||backgroundWindow.isKioskApp()||mainAppChromeWindow.contentWindow.isInTabletMode()?(client.toggleDivWindow("window-chat"),null!==e&&e.close()):null!==e?e.show():g.getMeetingStatusObj().lastChatWinInPopup?client.createChatWindow(!1):client.toggleSidePanel("chat-panel"),f(),W("hideRemind"),a11y([".chat-console .userlist",".chat-console .morelist"])}function I(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin"),t=!D()&&$("#window-chat").hasClass("hideMe")&&null===e,a=null!==e&&e.isMinimized();return!t&&!a}function O(){var e=!1;void 0!==mainAppHtmlWindow&&(e=mainAppHtmlWindow.chatObject.isAllowAttendeeChat,(mainAppHtmlWindow.chatObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost)&&(e=1),mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly&&(e=1),0==e?($(".chat-common .dl-chatPanel").css("height","calc( 100% - 30px )"),$(".chat-common .chat-console").addClass("hideMe"),$(".chat-common .chat-input").addClass("hideMe"),$(".noone-info").hasClass("forceHide")&&$(".noone-info").removeClass("forceHide")):($(".chat-common .dl-chatPanel").css("height","calc(100% - 90px)"),$(".chat-common .chat-console").removeClass("hideMe"),$(".chat-common .chat-input").removeClass("hideMe"),$(".noone-info").hasClass("forceHide")||$(".noone-info").addClass("forceHide")))}function j(e){if(void 0!==mainAppHtmlWindow)if(mainAppHtmlWindow.chatObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost)M(o.CHAT_PRIVILEDGE_ALL),null!=$(".morelist dd")&&$(".morelist dd").each(function(){$(this).data("attendeechatpriviledge")==e&&($(this).parents(".morelist").find(".img-sprite").remove(),$(this).prepend("<i class='img-sprite selected'></i>"))});else{if(mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly)return;var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");M(e),null!==t&&t.contentWindow.chat.changeChatPriviledgeUI(e)}}function M(e){if(null!=e)switch(e){case o.CHAT_PRIVILEDGE_ALL:mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly?($(".chat-console .user").hasClass("forceHide")&&($(".chat-console .user").removeClass("forceHide"),$(".chat-console .only-one").addClass("forceHide")),$(".userlist dd").remove(),h(),u(),$(".userlist dd[data-username='All panelists and attendees'] .img-sprite").addClass("selected"),$(".chat-input textarea").attr("placeholder","Your text can be seen by panelists and other attendees"),E(0,"All panelists and attendees",0)):mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar?mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar&&($(".userlist dd").remove(),h(),u(),$(".userlist dd[data-username='All panelists and attendees'] .img-sprite").addClass("selected"),E(0,"All panelists and attendees",0)):(P(mainAppHtmlWindow.attendeeList),E(mainAppHtmlWindow.chatObject.curReceiverID,mainAppHtmlWindow.chatObject.curReceiverName,0),$(".chat-console .user").hasClass("forceHide")&&($(".chat-console .user").removeClass("forceHide"),$(".chat-console .only-one").addClass("forceHide")));break;case o.CHAT_PRIVILEDGE_HOST:var t=mainAppHtmlWindow.chatObject.curReceiverID,a=mainAppHtmlWindow.chatObject.curReceiverName,n=mainAppHtmlWindow.g.getMeetingStatusObj().hostId,i=mainAppHtmlWindow.findHostAttendeeObject();if(void 0===i.name||""===i.name){console.error("can not find host"),L();break}var s=i.name,d=mainAppHtmlWindow.g.getMeetingStatusObj().coHost;if($(".userlist dd").remove(),H(mainAppHtmlWindow.attendeeList),t!=n&&0!=t||0!=d.length||E(n,s,0),-1!=t&&t!=n){E(n,s,0);break}-1!=t&&0!=d.length&&($(".chat-console .user").hasClass("forceHide")&&($(".chat-console .user").removeClass("forceHide"),$(".chat-console .only-one").addClass("forceHide")),$(".userlist dd").remove(),H(mainAppHtmlWindow.attendeeList),E(t,a,0)),-1==t&&""!=n&&0==d.length?E(n,s,0):-1==t&&""!=n&&0!=d.length&&($(".userlist dd").remove(),H(mainAppHtmlWindow.attendeeList),E(n,s,0));break;case o.CHAT_PRIVILEDGE_ALL_PANELIST:if(!mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar||!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly)return;$(".userlist dd").remove(),h(),$(".userlist dd[data-username='All Panelists'] .img-sprite").addClass("selected"),$(".chat-console .userlist").addClass("hideMe"),$(".chat-console .user").addClass("forceHide"),$(".chat-console .only-one").removeClass("forceHide"),$(".chat-console .only-one").html("<span class='host-name'>All Panelists</span>"),$(".chat-input textarea").attr("placeholder","Your text can only be seen by panelists"),E(0,"All Panelists",1);break;case o.CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT:break;case o.CHAT_PRIVILEDGE_HOST_PUBLIC:$(".chat-console .user").hasClass("forceHide")&&($(".chat-console .user").removeClass("forceHide"),$(".chat-console .only-one").addClass("forceHide")),$(".userlist dd").remove(),w(),H(mainAppHtmlWindow.attendeeList),-1==mainAppHtmlWindow.chatObject.curReceiverID?E(0,"Everyone",0):E(mainAppHtmlWindow.chatObject.curReceiverID,mainAppHtmlWindow.chatObject.curReceiverName,0)}}function L(){mainAppHtmlWindow.chatObject.curReceiverID=0,mainAppHtmlWindow.chatObject.curReceiverName="Everyone",$(".chat-console .user").hasClass("forceHide")&&($(".chat-console .user").removeClass("forceHide"),$(".chat-console .only-one").addClass("forceHide")),$(".userlist dd").remove(),w(),s(0,"Everyone")}function S(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");O(),null!==e&&e.contentWindow.chat.allowAttendeeChat()}function T(){if(!mainAppHtmlWindow.g.getMeetingStatusObj().inBO){var e=mainAppHtmlWindow.myStatusObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost,t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");e?chat.showMoreBtn():chat.hideMoreBtn(),isInsideMainAppWindow()&&null!=t&&t.contentWindow.chat.refreshChatConsole(e)}}function e(){$("#chat-panel").removeClass("hideMe"),setTimeout(function(){$("#chat-panel .chat-input textarea").focus()},2e3)}function _(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];$("#chat-panel").css("height",e?"100%":"50%")}function D(){return client.isSidePanelVisible()&&!$("#chat-panel").hasClass("hideMe")}return{bindEvent:function(){var e;!function(){if(mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar){var e="<dd tabindex='1' data-allowChatTo = 4 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT+"'>No one</dd><dd tabindex='1' data-allowChatTo = 2 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_ALL_PANELIST+"'> All panelists </dd><dd tabindex='1' data-allowChatTo = 1 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_ALL+"'> All panelists and attendees</dd>";$(".chat-console .morelist dl dd").remove(),$(".chat-console .morelist dl").append(e)}else{var t="<dd tabindex='1' data-allowChatTo = 4 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT+"'>No one</dd><dd tabindex='1' data-allowChatTo = 3 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_HOST+"'>Host only</dd><dd tabindex='1' data-allowChatTo = 5 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_HOST_PUBLIC+"'>Everyone publicly</dd>";mainAppHtmlWindow.g.getMeetingStatusObj().isPrivateChatOff||(t+="<dd tabindex='1' data-allowChatTo = 1 data-attendeeChatPriviledge='"+o.CHAT_PRIVILEDGE_ALL+"'>Everyone publicly and privately</dd>"),$(".chat-console .morelist dl dd").remove(),$(".chat-console .morelist dl").append(t)}j(mainAppHtmlWindow.chatObject.attendeeChatPriviledge),T()}(),S(),hideMerge(mainAppChromeWindow.isMinimized()||mainAppChromeWindow.isFullscreen()),$("span.window-merge").off("click").click(function(e){mainAppHtmlWindow.client.mergeToWindow("chatWin","chat-panel")}),P(mainAppHtmlWindow.attendeeList),-1!=mainAppHtmlWindow.chatObject.curReceiverID||mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar||mainAppHtmlWindow.chatObject.attendeeChatPriviledge==o.CHAT_PRIVILEDGE_HOST?-1==mainAppHtmlWindow.chatObject.curReceiverID&&mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar?E(0,"All Panelists",1):s(mainAppHtmlWindow.chatObject.curReceiverID,mainAppHtmlWindow.chatObject.curReceiverName):E(0,"Everyone",0),$(".chat-console").delegate("span.user","click",function(e){$(".morelist").hasClass("hideMe")||$(".morelist").addClass("hideMe"),$(".chat-console .userlist").removeClass("hideMe"),$("body,#listener").one("click",function(){$(".chat-console .userlist").addClass("hideMe")}),e.stopPropagation()}),$(".chat-console").delegate("span.chat-more","click",function(e){$(".userlist").hasClass("hideMe")||$(".userlist").addClass("hideMe"),$(".chat-console .morelist").removeClass("hideMe"),$("body,#listener").one("click",function(){$(".chat-console .morelist").addClass("hideMe")}),e.stopPropagation()}),$(".chat-console .userlist").delegate("dd","click",function(e){var t=$(this).attr("data-username");E($(this).attr("data-userid"),t,$(this).attr("data-toallpanelist"))}),$(".chat-console .morelist").delegate("dd","click",function(e){var t=$(this).data("allowchatto");mainAppHtmlWindow.inmeeting.changeAttendeeChatPriviledge(t)}),$(".chatNotice").off("click").click(function(e){C()}),$(".chat-input textarea").keyup(function(e){if("13"==e.keyCode){var t=$(this).val();t=t.replace(/[\r\n]/g,""),e.preventDefault();var a=mainAppHtmlWindow.chatObject.curReceiverID,n=mainAppHtmlWindow.chatObject.curReceiverName,i=mainAppHtmlWindow.chatObject.attendeeChatPriviledge,s=mainAppHtmlWindow.getAttendeeObject(a,!0);mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar||0===a||null!==s?function(e,t){if(mainAppHtmlWindow.chatObject.isHost||mainAppHtmlWindow.myStatusObject.isCoHost)return!0;switch(e){case o.CHAT_PRIVILEDGE_HOST:if(mainAppHtmlWindow.g.getMeetingStatusObj().hostId==t||d(t,mainAppHtmlWindow.g.getMeetingStatusObj().coHost))return!0;break;case o.CHAT_PRIVILEDGE_HOST_PUBLIC:if(0===parseInt(t))return!0;if(mainAppHtmlWindow.g.getMeetingStatusObj().hostId==t||d(t,mainAppHtmlWindow.g.getMeetingStatusObj().coHost))return!0;break;case o.CHAT_PRIVILEDGE_ALL:return!0;case o.CHAT_PRIVILEDGE_DISABLE_ATTENDEE_CHAT:return!(!mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar||mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly);case o.CHAT_PRIVILEDGE_ALL_PANELIST:return!mainAppHtmlWindow.g.getMeetingStatusObj().isWebinar||!mainAppHtmlWindow.g.getMeetingStatusObj().meetingIsViewOnly||0==mainAppHtmlWindow.chatObject.curReceiverID&&1==mainAppHtmlWindow.chatObject.curToAllPanelist;default:return!1}}(i,a)?($(this).val(""),mainAppHtmlWindow.common.postMessageToNaCl({type:"chat",command:"chat.sendChatTo",receiver:Number(mainAppHtmlWindow.chatObject.curReceiverID),toAllPanelists:Number(mainAppHtmlWindow.chatObject.curToAllPanelist),content:t,attendeeChatPriviledge:i})):($(".chat-console .warning-msg").text("You cannot chat with "+n+" during this meeting"),$(".chat-console .warning-msg").removeClass("forceHide"),setTimeout(function(){$(".chat-console .warning-msg").addClass("forceHide")},3e3)):($(".chat-console .warning-msg").text(n+" is not in this meeting"),$(".chat-console .warning-msg").removeClass("forceHide"),setTimeout(function(){$(".chat-console .warning-msg").addClass("forceHide")},3e3))}}),y(),showChatOption(),a11y(),!isInsideMainAppWindow()&&((e=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin")).onBoundsChanged.removeListener(t),e.onBoundsChanged.addListener(t))},showChat:C,chatScroll:f,showChatNotice:b,refreshChatRemind:W,switchChatUser:E,handleMessageChat:n,refreshChatUserList:P,refreshMessageChat:function(e){if(!backgroundWindow.isKioskApp()&&!g.getMeetingStatusObj().isChatOff){var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");I()||(mainAppHtmlWindow.chatObject.chatNum=mainAppHtmlWindow.chatObject.chatNum+1);var a=n(e);f(),i(),null!==t&&(t.contentWindow.chat.handleMessageChat(e),t.contentWindow.chat.chatScroll()),mainAppHtmlWindow.chatObject.lastDtId=a}},restoreChatMsg:function(){$(".dl-chatPanel").html(mainAppHtmlWindow.chatObject.chatMsg),f(),i()},refreshChatRemindNumber:v,refreshChatToUser:s,refreshAttendeeChatUI:S,allowAttendeeChat:O,chatWinExist:I,showMoreBtn:function(){$(".chat-console .chat-more").removeClass("forceHide")},hideMoreBtn:function(){$(".chat-console .chat-more").addClass("forceHide")},refreshChatConsole:T,refreshChatPriviledgeUI:function(e){var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");j(e),null!==t&&t.contentWindow.chat.changeChatPriviledge(e)},changeChatPriviledge:j,changeChatPriviledgeUI:M,refreshChatUserListIncludeWindow:function(e){P(e);var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");null!==t&&t.contentWindow.chat.refreshChatUserList(e)},showFullPanel:function(){e(),_()},showPanel:e,hidePanel:function(){$("#chat-panel").addClass("hideMe")},isSidePanelShow:D,fullPanel:_,addChatUserToUserList:c,removeChatUserFromUserList:m,refreshChatUser:p,addChatUserToUserListIncludeWindow:function(e){c(e);var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");null!==t&&t.contentWindow.chat.addChatUserToUserList(e)},removeChatUserFromUserListIncludeWindow:function(e){m(e);var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");null!==t&&t.contentWindow.chat.removeChatUserFromUserList(e)},refreshChatUserIncludeWindow:function(e){p(e);var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");null!==t&&t.contentWindow.chat.refreshChatUser(e)},chatPriviledges:o,handleMessageChatDelete:function(e){a(e.msgID);var t=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");null!==t&&(t.contentWindow.chat.deleteMessageChat(e.msgID),t.contentWindow.chat.chatScroll())},deleteMessageChat:a}}();function showChatOption(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMoreWindow");mainAppHtmlWindow.g.getMeetingStatusObj().isChatOff?(mainAppHtmlWindow.toolbar.showToolbarIcon("chat",!1),$(".webinar-viewer-bar li.chat").addClass("forceHide"),e&&$(".share-more dd.chat").addClass("forceHide")):(mainAppHtmlWindow.toolbar.showToolbarIcon("chat",!0),$(".webinar-viewer-bar li.chat").removeClass("forceHide"),e&&$(".share-more dd.chat").removeClass("forceHide"))}