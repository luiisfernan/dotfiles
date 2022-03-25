"use strict";function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var isTest=!1,isRelease=!0,common=function(){function o(e,n,t){var o=document.createElement("embed");o.setAttribute("name","nacl_module"),o.setAttribute("id","nacl_module"),o.setAttribute("width",n),o.setAttribute("height",t),o.setAttribute("src",e+".nmf"),o.setAttribute("type","application/x-nacl"),document.getElementById("listener").appendChild(o),o.offsetTop}function i(){var e=document.getElementById("listener");e.removeEventListener("load",a,!0),e.removeEventListener("message",s,!0),e.removeEventListener("error",n,!0),e.removeEventListener("crash",t,!0),e.addEventListener("load",a,{capture:!0,once:!0}),e.addEventListener("message",s,!0),e.addEventListener("error",n,!0),e.addEventListener("crash",t,!0)}function n(e){l("ERROR ["+document.getElementById("nacl_module").lastError+"]")}function t(e){-1==common.naclModule.exitStatus?(l("CRASHED"),handlePossibleSilentCrash()):l("EXITED ["+common.naclModule.exitStatus+"]"),void 0!==window.handleCrash&&window.handleCrash(common.naclModule.lastError)}function a(){common.naclModule=document.getElementById("nacl_module"),l("RUNNING"),void 0!==window.moduleDidLoad&&window.moduleDidLoad()}function e(e){}var r={alert:alert,log:e};function s(e){if("string"==typeof e.data)for(var n in r){if(r.hasOwnProperty(n))if(t=e.data,o=n+":",0===t.lastIndexOf(o,0))return void(0,r[n])(e.data.slice(n.length+1))}var t,o;if(void 0!==window.handleMessage){var i=e.data;if(i.constructor===Array)for(var a=0;a<i.length;a++)window.handleMessage(i[a]);else"VIDEO_FRAME"==i.EVENT?(i.is_direct_share&&kiosk.Share.drawDirectShare(i),commonModule.rendererMgr.instance.dispatchVideoData(i)):window.handleMessage(i);handleNaClHeartBeatSignal()}}var c="NO-STATUSES";function l(e){e&&(c=e);var n=document.getElementById("statusField");n&&(n.innerHTML=c)}function d(e){var n=e,t=n.getHours(),o=n.getMinutes(),i=n.getSeconds(),a="AM";return 12<t&&(a="PM",t-=12),0==t&&(t=12),o<=9&&(o="0"+o),i<=9&&(i="0"+i),t+":"+o+" "+a}var u=[];var E=!1;var h=!1;return{naclModule:null,nativeReady:!1,injectScript:function(e,n,t){var o=document.createElement("script");o.type="text/javascript",o.src=e,o.onload=n,t&&o.addEventListener("error",t,!1),document.head.appendChild(o)},attachDefaultListeners:i,getTimeInMilliseconds:function(){return performance.now()},domContentLoaded:function(e,n,t){l("Page loaded."),null===common.naclModule&&(l("Creating embed"),n=void 0!==n?n:200,t=void 0!==t?t:0,i(),o(e,n,t))},createNaClModule:o,hideModule:function(){common.naclModule.style.height="0"},showModule:function(){common.naclModule.style.height="800"},removeModule:function(){common.naclModule.parentNode.removeChild(common.naclModule),common.naclModule=null},logMessage:e,updateStatus:l,getQueryString:function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(n);return null!==t?unescape(t[2]):null},addSpace:function(e){var n=[];return e.length<10?e.replace(/...(?!$)/g,"$& "):(10==e.length?(n[0]=e.slice(0,3),n[1]=e.slice(3,6),n[2]=e.slice(6)):(n[0]=e.slice(0,3),n[1]=e.slice(3,7),n[2]=e.slice(7)),n.join(" "))},addShortLine:function(e){var n=[];return e.length<=10?(n[0]=e.slice(0,3),n[1]=e.slice(3,6),n[2]=e.slice(6)):(n[0]=e.slice(0,3),n[1]=e.slice(3,7),n[2]=e.slice(7)),n.join("-")},getCurrentTime:function(){return d(new Date)},formatSeconds:function(e){var n=e,t=0,o=0;60<=n&&(t=parseInt(n/60),n=parseInt(n%60),60<t&&(o=parseInt(t/60),t=parseInt(t%60))),n<10&&(n="0"+n);var i=""+n;return 0<=t&&(t<10&&(t="0"+t),i=t+":"+i),0<o&&(o<10&&(o="0"+o),i=o+":"+i),i},formatTime:d,formatNameByLength:function(e,n){return e.length<n?e:e.substr(0,n)+"..."},registTimer:function(e){u.push(e)},stopAllTimer:function(){var e;for(e in u)clearInterval(u[e]),u[e]=null;u=[]},i18n:function(){$("[data-locale]").each(function(){var e=this.nodeName,n=$(this).attr("data-locale");n=chrome.i18n.getMessage(n),"INPUT"==e||"TEXTAREA"==e?$(this).attr("placeholder",n):$(this).text(n)})},postMessageToNaCl:function(e){common.naclModule&&common.naclModule.postMessage(e)},apiPermissionCheck:function(){chrome.power&&(E=!0),chrome.permissions.contains({permissions:["alwaysOnTopWindows"]},function(e){h=e})},hasApi_Power:function(){return E},hasApi_AlwaysOnTopWindow:function(){return h}}}();function showMainWindow(e){e?mainWindow.show():mainWindow.hide()}function closeShareWindow(){$.each(["shareMainWindow","shareMoreWindow","ccAssignToWin","ccAssignTypeWin","ccChoiceWin","ccMsgWin","ccTooltipWin"],function(e,n){closeWindow(n)}),g.getMeetingStatusObj().lastPlistInPopup||closeWindow("plistWin"),g.getMeetingStatusObj().lastChatWinInPopup||closeWindow("chatWin")}function showShareMoreWindow(e){e?createShareWindow("shareMoreWindow"):winMgr.getWinByWinId("shareMoreWindow").close()}function createShareWindow(n){var e=407,t=79,o=Math.round((screen.availWidth-e)/2),i=0,a="build/window/shareMainWindow.html";if("shareMoreWindow"==n){var r=winMgr.getWinByWinId("shareMainWindow");if(!r)return;e=200,t=130,r.contentWindow.showOnTop||(i=r.outerBounds.top-(myStatusObject.isHost||myStatusObject.isCoHost?130:60)),o=r.outerBounds.left+r.outerBounds.width+5,a="build/window/shareMoreWindow.html"}winMgr.createWindow(n,a,{width:e,height:t,left:o,top:i},function(e){"shareMoreWindow"===n?(e.contentWindow.initShareMoreWindow(),e.contentWindow.refreshShareMoreStatus(),e.outerBounds.height=e.contentWindow.document.getElementById("share-more").offsetHeight):"shareMainWindow"===n&&(e.contentWindow.moveTop(1),e.contentWindow.initShareMainWindow(),e.contentWindow.refreshShareMainStatus(),e.outerBounds.width=e.contentWindow.document.getElementById("main-bar").offsetWidth)})}function closeWindow(e){winMgr.closeWindowByWindowId(e)}function closeAllWindow(){winMgr.closeAllWindows()}function closeAllWindowExceptWinByID(e){winMgr.closeAllWindowExceptWinByID(e)}function closeAllWindowExceptEndedWin(){closeAllWindowExceptWinByID("endedWin")}function reloadAbleJSFn(e,n){var t=document.getElementById(e);t&&t.parentNode.removeChild(t);var o=document.createElement("script");o.src=n,o.type="text/javascript",o.id=e,document.getElementsByTagName("head")[0].appendChild(o)}function setCursorPosition(n,t){var o=n.value.length;o<t||setTimeout(function(){if(n.focus(),n.setSelectionRange)n.setSelectionRange(t,t);else{var e=n.createTextRange();e.moveStart("character",-o),e.moveEnd("character",-o),e.moveStart("character",t),e.moveEnd("character",0),e.select()}},10)}function saveToLocal(e,n,t){e&&void 0!==n&&"string"==typeof e&&(localStorage[e]=n,chrome.storage.local.set(_defineProperty({},e,n),function(){"function"==typeof t&&t.apply(null)}))}function removeFromLocal(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];n.length&&chrome.storage.local.remove(n,function(){n.forEach(function(e){return delete localStorage[e]})})}function getFromLocal(n,t){t=t||console.log,Array.isArray(n)?chrome.storage.local.get(n,function(e){t(e)}):"string"==typeof n&&chrome.storage.local.get(n,function(e){t(e[n])})}function saveToLocalWithGroup(e,n,t,o){if(o&&o instanceof Function){var i=localStorage[e]||{};i[n]=t,saveToLocal(e,i,o)}else console.error("saveToLocalEx -- need 4 args, and cb must be function")}function getFromLocalByGroup(e,n,t){return(localStorage[e]||{})[n]}function registerTimer(e,n){if("number"==typeof e&&"function"==typeof n)return setTimeout(function(){n.apply(null)},e);console.error("timer register error, check arguments")}function addStorageChangeListener(){chrome.storage.onChanged.addListener(onStorageChange)}function onStorageChange(e,n){for(var t in e)if("lastActiveTime"!==t){var o=e[t];"string"==typeof o.oldValue&&(o.oldValue=o.oldValue.substring(0,128)),"string"==typeof o.newValue&&(o.newValue=o.newValue.substring(0,128))}"managed"===n&&onManagedStorageChange(e)}function onManagedStorageChange(e){for(var n in e)if(e.hasOwnProperty(n)){var t=e[n];managedStorage[n]=t.newValue}}Date.prototype.format=function(e){var n={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours()%12||12,"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds(),tt:this.getHours()<12?"am":"pm",TT:this.getHours()<12?"AM":"PM"};for(var t in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),/(w+)/.test(e)&&(e=e.replace(RegExp.$1,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()])),n)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[t]:("00"+n[t]).substr((""+n[t]).length)));return e},function(e){var n,t={getMeetingStatusObj:function(){return i},getConstants:function(){return o},resetMeetingStatusObj:function(){i={meetingIsViewOnly:!1,isMuteOnEntryOn:!1,isPlayChimeOn:!1,isMeetingLocked:!1,isScreenShareDisabled:!1,isShareSettingTypeLocked:!1,isShareLocked:!1,isHostMuteAll:!1,allowUnmute:!1,activeShareUserId:0,lastPlistInPopup:!1,lastChatWinInPopup:!1,inviteURL:"",meetingTopic:"",hostName:"",hostId:"",coHost:[],isRecording:!1,canStartCMR:!1,canStartShare:0,meetingNo:0,isChatOff:!1,isPrivateChatOff:!1,currentActiveSpekerUserId:0,inGalleryView:1,isPutOnHoldOnEntryLocked:0,isSupportWaitingRoom:0,isPutOnHoldOnEntryOn:0,isInWaitingRoom:void 0,isInSharing:!1,isMeetingSupportSilentMode:!1,inBO:!1,waitingCount:0,waitingUserList:[],BID:"",BOName:"",boUserCount:0,waitSeconds:60,isClosedBroadcast:!0,resultStr:"",isHostInBo:!1,isClosedCaptionOn:0,canShowCCButton:0,isSupportZoomIM:1,isAllowPanelistsVote:!1,encryptionAlg:0,isShareDesktopDisabled:!1,isAllowParticipantRenameEnabled:!1,isAllowParticipantRename:!1,meetingShareType:1,isRemovingParticipantsFromSecurity:!1,DCRegion:""}},getLoginState:function(){return a},setLoginState:function(e){a=e}},o=(_defineProperty(n={VIDEO_MODE_SPEAKER:1,VIDEO_MODE_GALLERY:2,VIDEO_MODE_THUMBNAIL:3,VIDEO_STATE_CLOSE:0,VIDEO_STATE_STARTING:1,VIDEO_STATE_START:2,SINGLE_VIDEO_VIEW:1,SHARE_VIEW:2,GALLERY_VIEW:3,BG_VIEW:4,FLOAT_VIDEO_MIN_WIDTH:214,FLOAT_VIDEO_MID_WIDTH:480,FLOAT_VIDEO_MAX_WIDTH:640,NO_CONCERN:0,SELF_START:1,JOIN_REQUEST_FROM_WEB:2,DC_INFO_HYBRID:"You are connected to the Zoom global network via an on-premise data center.",DC_INFO_ONPREM:"You are connected to an on-premise data center.",DC_INFO_REGION:"You are connected to the Zoom global network via a data center in %s.",CONF_FAIL_NETWORK_ERR:"Can't connect to our service, please check your network connection and try again. Error code %s",CONF_FAIL_MEETING_NOT_EXIST:"This meeting ID is not valid. Please check and try again.",CONF_FAIL_CONF_USER_FULL:"This meeting has reached a maximum of %s participants. Please try again later.",CONF_FAIL_CLIENT_INCOMPATIBLE:"Zoom client must be upgraded to join this meeting.",CONF_FAIL_CONFLOCKED:"This meeting has been locked by host.",CONF_FAIL_REGISTERWEBINAR_ENFORCE_LOGIN:'<b>This meeting is for authorized attendees only.</b></br> Click "<span></span>" to sign into Zoom with an email address authorized for joining this meeting',CONF_FAIL_VANITY_NOT_EXIST:"This personal link name is not valid. Please check and try again.",CONF_FAIL_REGISTERWEBINAR_DENIED_EMAIL:"Host has declined your webinar registration.",CONF_FAIL_MEETING_RESTRICTED:"You have a meeting that is currently in-progress. Please end it to start a new meeting.",CONF_FAIL_MEETING_OVER:"This meeting has been ended by host.",CONF_FAIL_REGISTERWEBINAR_HOSTREGISTER:"If you are the host, please sign in to start the webinar.",CONF_FAIL_REGISTERWEBINAR_FULL:"We're sorry, the registration for this webinar has reached its maximum capacity.",CONF_FAIL_REGISTERWEBINAR_PANELISTREGISTER:"If you were invited as a panelist, please join the webinar from the link in your email invitation.",CONF_FAIL_MEETING_RESTRICTED_JBH:"The host has a meeting that is currently in-progress. Once that meeting ends, you can join this meeting.",KICK_BY_HOST:"You are removed from this meeting by the host.",END_BY_HOST:"This meeting has been ended by host.",END_FOR_JBHTIMEOUT:"This meeting has ended because the host didn't show up.",END_FOR_FREEMEET_TIMEOUT:"This free meeting has ended. Thank you for choosing Zoom!",END_BY_HOST_START_ANOTHERMEETING:"This meeting has ended as someone has started a new meeting with this account.",START_MEETING_TIME_OUT:"Start or join meeting failed, please try again later.",103039:"You are unable to rejoin this meeting because you were previously removed by the host.",10006e4:"Network error, please try again.",CALLOUT_STATUS_NOT_AVAILABLE:"The phone number is invalid or restricted.",CALLOUT_STATUS_NO_ANSWER:"The number you dialed is busy.",CALLOUT_STATUS_BLOCK_NO_HOST:"The number you dialed is not available until the host joins.",CALLOUT_STATUS_BLOCK_HIGH_RATE:"The number you dialed is not supported.",CALLOUT_STATUS_BLOCK_TOO_FREQUENT:"The number you dialed has not been responding to join the meeting.",CALLOUT_STATUS_TIMEOUT:"Time out to call.",OTHER_CALLER_EXITED:"The other caller has exited.",PROBLEM_REPORT_SUBJECT:"Problem Report for Zoom Rooms - ",PROBLEM_REPORT_ZR_VERSION:"Zoom Rooms Version: %s",PROBLEM_REPORT_ZRC_VERSION:"Zoom Rooms Controller Version: %s",PROBLEM_REPORT_SYSTEM_VERSION:"System Version: %s",PROBLEM_REPORT_ROOM_EMAIL:"Room Main Email: %s",PROBLEM_REPORT_ROOM_NAME:"Room Name: %s",PROBLEM_REPORT_GUIDE:"Here's more detail of the problem I encountered:",PROBLEM_REPORT_SENDING:"Sending problem report...",PROBLEM_REPORT_SENT:"Problem report has been sent",PROBLEM_REPORT_SEND:"Send Problem Report",PROBLEM_REPORT_FAILED:"Failed to send problem report",TELEPHONE_CALL_OUT_NOT_ENABLED:"Telephone call-out is not enabled. Please contact your account admin.",CONF_STR:{CONF_LEAVE_COMPLETE:"conf-leave-complete",CONF_RECONNECT:"conf-reconnect",CONF_READY:"conf-ready",CONF_UPGRADE:"conf-upgrade",SHARING_KEY:"sharing-key",SHARE_STATUS:"conf-share-status",SHARE_MEETING_UPGRADE:"share-meeting-upgrade",SPOTLIGHT_UNMUTE_CONFIRM:"conf-spotlight-unmute-confirm"},APP_LIFE_CYCLE:{APP_INIT:"app-init"},VIDEO_PREVIEW:"video-preview",ALLOW_HOST_UNMUTE_CONFIRM:"allow-host-unmute-confirm",MATCH_MANAGED_DOMIAN_CONFIRM:"match-managed-domain-confirem",SWITCH_TO_OUTSIDE_MEETING_REMOVE_TOOOLBAR_EVENT:"switch-to-outside-meeting-remove-toolbar-event",RELOAD_JOINMEETING_PAGE_AND_NACL_MODULE:"reload-joinmeeting-page-and-nacl-page",SSL_CERTIFICATE_WARNING:"ssl-certificate-warning",NACL_LOADED:"nacl-loaded",MAIN_WINDOW_FULLSCREEN:"main-window-fullscreen",MAIN_WINDOW_RESTORE:"main-window-restore",INMEETING_INFO_WINDOW:{SHOW:"show",CHANGE:"change"},RECORDING_REMINDER:"recording-reminder",RECORDING_FAIL:"recording-fail",WAITING_ROOM:"waiting-room"},"NACL_LOADED","nacl-loaded"),_defineProperty(n,"MAIN_WINDOW_FULLSCREEN","main-window-fullscreen"),_defineProperty(n,"MAIN_WINDOW_RESTORE","main-window-restore"),_defineProperty(n,"MAIN_WINDOW_MINIMIZE","main-window-minimize"),_defineProperty(n,"INMEETING_INFO_WINDOW",{SHOW:"show",CHANGE:"change"}),_defineProperty(n,"PARTICIAPNTS",{SHOW:"participants-show",RESIZE:"participants-resize"}),_defineProperty(n,"VIEWERS",{VIEWER_LIST_INIT:"viewer-list-init",RAISE_HAND:"viewer-raise-hand",LOWER_HAND:"viewer-lower-hand",LOWER_ALL_HANDS:"viewer-lower-all-hands"}),_defineProperty(n,"FEEDBACK",{CLEAR_ALL:"feedback-clear-all",FEEDBACK_NUMBER:"feedback-number",HAND:"feedback-hand"}),_defineProperty(n,"CONTACTS",{SHOW:"contacts-show",BASE_INFO:"contacts-base-info",BUDDY_UPDATE:"contacts-buddy-update",BUDDY_SEARCH:"contacts-buddy-search",BUDDY_WITH_GROUPID:"contact-buddy-with-groupid"}),_defineProperty(n,"USER",{LOGOUT:"user-logout"}),_defineProperty(n,"INVITE_OTHERS","invite-others"),_defineProperty(n,"INVITE_WHEN_MEETING_LOCKED","invite-when-meeting-locked"),_defineProperty(n,"SHOW_SECURITY_WINDOW","show-security-window"),_defineProperty(n,"HOST_ASK_ALL_TO_UNMUTE","host-ask-all-to-unmute"),_defineProperty(n,"MEETING_UNCRYPED_STATUS_CHANGE","meeting-uncryped-status-change"),_defineProperty(n,"SHOW_BANDWIDTH_LIMIT","show-bandwidth-limit"),n),i={isStartByMySelf:!1,meetingIsViewOnly:!1,isMuteOnEntryOn:!1,isPlayChimeOn:!1,isMeetingLocked:!1,isShareLocked:!1,isScreenShareDisabled:!1,isShareSettingTypeLocked:!1,isHostMuteAll:!1,allowUnmute:!1,activeShareUserId:0,lastPlistInPopup:!1,lastChatWinInPopup:!1,inviteURL:"",meetingTopic:"",hostName:"",hostId:"",coHost:[],isRecording:!1,canStartShare:0,canStartCMR:!1,meetingNo:0,isChatOff:!1,isPrivateChatOff:!1,currentActiveSpekerUserId:0,inGalleryView:1,isPutOnHoldOnEntryLocked:0,isSupportWaitingRoom:0,isPutOnHoldOnEntryOn:0,isInWaitingRoom:void 0,isInSharing:!1,isMeetingSupportSilentMode:!1,inBO:!1,waitingCount:0,waitingUserList:[],BID:"",BOName:"",boUserCount:0,waitSeconds:60,isClosedBroadcast:!0,resultStr:"",isHostInBo:!1,isClosedCaptionOn:0,canShowCCButton:0,isAllowPanelistsVote:!1,encryptionAlg:0,encryptionExceptions:0,isRecordDisabled:!1,isLocalRecordDisabled:!1,isAuthLocalRecordDisabled:!1,isShareDesktopDisabled:!1,isAllowParticipantRenameEnabled:!1,isAllowParticipantRename:!1,meetingShareType:1,isRemovingParticipantsFromSecurity:!1,DCRegion:""},a=!1;e.g=t}(window);