"use strict";var leaveBoChoice={initLeaveBoChoice:function(){$("#keep").off("click").click(function(){mainAppHtmlWindow.inmeeting.leaveMeeting()}),$("#end").off("click").click(function(){chrome.runtime.sendMessage({message:"endMeeting_fromWin"},$.noop)}),escEvt("#window-leaveBoChoice",function(){window.close()})}};