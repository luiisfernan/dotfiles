"use strict";function isParticipantListShow(){return!$("#window-participant").hasClass("hideMe")||!$(".sidePanel-participant").hasClass("hideMe")||mainAppHtmlWindow.winMgr.getWinByWinId("plistWin")}function refreshParticipantListView(e){var n=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");null!==n&&"complete"===n.contentWindow.document.readyState&&(n.contentWindow.refreshParticipantNumber4ShareWin(),n.contentWindow.refreshShareMainStatus())}function refreshParticipantOnce(e,n){e.isViewOnlyUserCanTalk||e.isViewOnlyUser||participants.refreshShareMainWindowStatus()}function initHostMenu(e){a11y(),$(".host-menu li").keyup(function(e){if(e.stopPropagation(),"ArrowUp"===e.key){var n=$(this).parent().prevAll(":visible");if(0===n.length)return;$(n[0]).find("li").focus()}else if("ArrowDown"===e.key){var i=$(this).parent().nextAll(":visible");if(0===i.length)return;$(i[0]).find("li").focus()}})}function openChat(e,n){if(!mainAppHtmlWindow.g.getMeetingStatusObj().isChatOff){var i=mainAppHtmlWindow.winMgr.getWinByWinId("chatWin");isInsideMainAppWindow()?mainAppHtmlWindow.chat.chatWinExist()||mainAppHtmlWindow.chat.showChat():mainAppHtmlWindow.client.createChatWindow(!1);var t=1;"Everyone"==n&&(t=0),mainAppHtmlWindow.chat.switchChatUser(e,n,t),null!==i&&i.contentWindow.chat.switchChatUser(e,n,t)}}function handleReceiveClearAllFeedback(){}function toogleHandInFeedbackList(e){}function toogleFeedbackListDisplay(e){}function toogleFeedbackListForHost(){}function updateFeedbackCountDom(e){}function initFeedbackListInWindow(){}function initParticipantToolbar(){}function initHostTbMenu(){}function refreshHostTbMenu(){}function initRenameWindow(t,a){$("#username").val(a.originalName),mainAppHtmlWindow.client.initMove("window-rename","panel-head"),$(".confirm-rename").undelegate("span","click").delegate("span","click",function(e){var n=$(this).attr("data-name"),i=a.userId;"ok"==n&&mainAppHtmlWindow.inmeeting.renameUser("conf.renameUser",i,$("#username").val()),isInsideMainAppWindow()?mainAppHtmlWindow.client.closeDivWindow(t):window.close()})}function initMakeHostWindow(t,a){$(".confirm-makehost .username").text(a.userName),"host"==a.role?($(".confirm-makehost .co-host").addClass("hideMe").find(".username").text(""),$(".confirm-makehost .host").removeClass("hideMe").find(".username").text(a.userName)):"co-host"==a.role&&($(".confirm-makehost .host").addClass("hideMe").find(".username").text(""),$(".confirm-makehost .co-host").removeClass("hideMe").find(".username").text(a.userName)),accessibility.focusWithoutOutline(".confirm-makehost .div-text"),mainAppHtmlWindow.client.initMove("window-makehost","panel-head"),$(".confirm-makehost").undelegate("span","click").delegate("span","click",function(e){var n=$(this).attr("data-name"),i=a.userId;"yes"==n&&("host"==a.role?mainAppHtmlWindow.inmeeting.sendHostCommand("conf.makeHost",i):"co-host"==a.role&&mainAppHtmlWindow.inmeeting.sendHostCommand("conf.makeCoHost",i)),isInsideMainAppWindow()?mainAppHtmlWindow.client.closeDivWindow(t):window.close()})}function initRemoveUserWindow(t,a){$(".confirm-removeuser .username").text(a.userName),mainAppHtmlWindow.client.initMove("window-removeuser","panel-head"),$(".confirm-removeuser").undelegate("span","click").delegate("span","click",function(e){var n=$(this).attr("data-name"),i=a.userId;"yes"==n&&("viewer"==a.userType?mainAppHtmlWindow.inmeeting.expelAttendee(i):mainAppHtmlWindow.inmeeting.sendHostCommand("conf.removeUser",i)),isInsideMainAppWindow()?mainAppHtmlWindow.client.closeDivWindow(t):window.close()})}function initMuteAllWindow(i){$(".confirm-muteall #allow-unmute").prop("checked",mainAppHtmlWindow.g.getMeetingStatusObj().allowUnmute),mainAppHtmlWindow.client.initMove("window-muteall","panel-head"),$(".confirm-muteall .div-button").undelegate("span","click").delegate("span","click",function(e){if("yes"==$(this).attr("data-name")){var n=$("#allow-unmute").is(":checked");mainAppHtmlWindow.inmeeting.muteAll(n),saveMuteAllButtonStatus(1),mainAppHtmlWindow.g.getMeetingStatusObj().allowUnmute=n}isInsideMainAppWindow()?mainAppHtmlWindow.client.closeDivWindow(i):window.close()})}function initHostLockWindow(n,i){mainAppHtmlWindow.client.initMove("window-hostlock","panel-head"),"meeting"==i.lockType?mainAppHtmlWindow.g.getMeetingStatusObj().isMeetingLocked?$(".confirm-hostlock .div-text span.text").text("New attendees can join this meeting once unlocked."):$(".confirm-hostlock .div-text span.text").text("No new attendees can join this meeting once locked."):"share"==i.lockType&&(mainAppHtmlWindow.g.getMeetingStatusObj().isShareLocked?$(".confirm-hostlock .div-text span.text").text("Attendee can now screen share once unlocked."):$(".confirm-hostlock .div-text span.text").text("Only host can screen share once locked.")),$(".confirm-hostlock .div-button").undelegate("span","click").delegate("span","click",function(e){"yes"==$(this).attr("data-name")&&("meeting"==i.lockType?mainAppHtmlWindow.g.getMeetingStatusObj().isMeetingLocked?mainAppHtmlWindow.inmeeting.sendHostLockCommand("conf.lockConf",!1):mainAppHtmlWindow.inmeeting.sendHostLockCommand("conf.lockConf",!0):"share"==i.lockType&&(mainAppHtmlWindow.g.getMeetingStatusObj().isShareLocked?mainAppHtmlWindow.inmeeting.sendHostLockCommand("conf.lockShare",!1):mainAppHtmlWindow.inmeeting.sendHostLockCommand("conf.lockShare",!0))),isInsideMainAppWindow()?mainAppHtmlWindow.client.closeDivWindow(n):window.close()})}function saveMuteAllButtonStatus(e){mainAppHtmlWindow.g.getMeetingStatusObj().isHostMuteAll=e}function refreshMuteAllButtonStatus(e){}function initParticipantListView(){participantArrowEvt()}function participantArrowEvt(){$(".participant-list .dl-sidePanel").unbind("keydown").keydown(function(e){"ArrowDown"===e.key&&($(this).find("dd").attr("tabindex",1),$(this).find("dd:first").find(".btn-sidePanel.showbtn").css("display","inline-block"),$(this).find("dd:first").focus())}),$(".participant-list .dl-sidePanel").undelegate("dd","keydown").delegate("dd","keydown",function(e){switch(e.key.startsWith("Arrow")&&e.stopPropagation(),e.key){case"ArrowLeft":$(this).find(".icon-btn:visible:first").focus();break;case"ArrowRight":$(this).find(".icon-btn:visible:last").focus();break;case"ArrowUp":$(this).prev().length&&($(this).find(".btn-sidePanel.showbtn").hide(),$(this).prev().find(".btn-sidePanel.showbtn").css("display","inline-block"),$(this).prev().focus());break;case"ArrowDown":$(this).next().length&&($(this).find(".btn-sidePanel.showbtn").hide(),$(this).next().find(".btn-sidePanel.showbtn").css("display","inline-block"),$(this).next().focus());break;case"Tab":e.preventDefault(),$(this).find(".btn-sidePanel.showbtn").hide(),$(this).parents(".participant-list .dl-sidePanel").focus(),$(this).removeAttr("tabindex").siblings().removeAttr("tabindex")}})}function initParticipantListWindow(){a11y()}function initializeDivOrPopupWindow(e,n,i,t){switch(i&&($(".mainView").html(t),$("#"+e).removeClass("hideMe"),$("#"+e).addClass("popupwindow"),$("#"+e).attr("style","")),e){case"window-rename":initRenameWindow(e,n);break;case"window-makehost":initMakeHostWindow(e,n);break;case"window-removeuser":initRemoveUserWindow(e,n);break;case"window-muteall":initMuteAllWindow(e);break;case"window-hostlock":initHostLockWindow(e,n)}}function refreshTalkingUser(e){var n=[];if(e.talkingUserID0){var i=mainAppHtmlWindow.getAttendeeObject(e.talkingUserID0);if(1==i.audioIsMuted)return;n.push(i.name),refreshTalkingUserStatus(e.talkingUserID0,i.audioType)}if(e.talkingUserID1){var t=mainAppHtmlWindow.getAttendeeObject(e.talkingUserID1);if(1==t.audioIsMuted)return;n.push(t.name),refreshTalkingUserStatus(e.talkingUserID1,t.audioType)}if(e.talkingUserID2){var a=mainAppHtmlWindow.getAttendeeObject(e.talkingUserID2);if(1==a.audioIsMuted)return;n.push(a.name),refreshTalkingUserStatus(e.talkingUserID2,a.audioType)}isTalkiingUserBarShow()&&$(".talking-user").text(n.join(", "))}function isTalkiingUserBarShow(){return $(".talking-user").is(":visible")}var refreshTalkingUserStatusTimer={};function refreshTalkingUserStatus(e,n){var i="talking-img";"AUDIO_TELEPHONY"==n&&(i="phonetalking-img"),refreshTalkingUserStatusTimer.hasOwnProperty(e)&&window.clearTimeout(refreshTalkingUserStatusTimer[e]),$(".window-participants-for-3 [data-userid="+e+"] .audio-img").addClass(i),refreshTalkingUserStatusTimer[e]=window.setTimeout(function(){$(".window-participants-for-3 [data-userid="+e+"] .audio-img").removeClass(i),delete refreshTalkingUserStatusTimer[e]},1e3)}function showViewerHand4Plist(e,n){}function showViewerHandNum4Plist(){}function showPhoneViewerNum4Plist(){}function refreshPListViewerList(e){a11y()}function btnSidePanelListner4ViewerList(){}function initHostTbMenu4Plist(){}function refreshViewer4Plist(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");null!==e&&"complete"===e.contentWindow.document.readyState&&e.contentWindow.refreshParticipantNumber4ShareWin()}function refreshPlistRecordStatus(){var n=mainAppHtmlWindow.recordingNodeIDs;n.split(",");$(".dl-sidePanel dd").each(function(){var e=$(this).attr("data-userid");-1<util.trim(n).indexOf(e)&&$('.dl-sidePanel dd[data-userid="'+e+'"] .record-sidePanel').removeClass("forceHide")})}function showHideCCInMore(e){}function isCCEditUser(e){var n=mainAppHtmlWindow.CCStatusObject;return Number(e)>>10==n.CCEditroUserID>>10}function createCCAssignTypeWindow(e,n,i){winMgr.createWindow("ccAssignTypeWin",encodeURI("build/window/ccAssignTypeWindow.html?userId="+e+"&fromUserName="+n+"&toUserName="+i),{width:443,height:184},function(e){e.contentWindow.execute()})}function handleTypeCCEvt(e){var n,i,t=isCCEditUser(e),a=mainAppHtmlWindow.CCStatusObject,o=a.hasAssignedCCEditor,s=a.isMyself,r=a.CCEditroUserID;!o||s||t?mainAppHtmlWindow.inmeeting.changeCCEditor(e):(n=getAttendeeObject(r),i=getAttendeeObject(e),createCCAssignTypeWindow(e,n.name,i.name))}function needShowCCSidePanel(e){}function refreshParticipantAvatar(e){}var participants=function(){function e(){var e=mainAppHtmlWindow.winMgr.getWinByWinId("shareMainWindow");null!==e&&"complete"===e.contentWindow.document.readyState&&(e.contentWindow.refreshParticipantNumber4ShareWin(),e.contentWindow.refreshShareMainStatus())}function n(){$("#participant-panel").removeClass("hideMe"),eev.emit(g.getConstants().PARTICIAPNTS.SHOW,{show:!0,type:"side-panel"})}function i(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];$("#participant-panel").css("height",e?"100%":"50%")}return{refreshParticipantNumber:function(){e(),$(".participants-number").html(util.getParticipantsNum())},get$paticipantDomForCommon:function(e,n){},refreshShareMainWindowStatus:e,showFullPanel:function(){n(),i()},showPanel:n,hidePanel:function(){eev.emit(g.getConstants().PARTICIAPNTS.SHOW,{show:!1,type:"side-panel"}),$("#participant-panel").addClass("hideMe")},isSidePanelShow:function(){return client.isSidePanelVisible()&&!$("#participant-panel").hasClass("hideMe")},fullPanel:i,refreshParticipantVideo:function(e,n,i){}}}();