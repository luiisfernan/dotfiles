var extension = null;
chrome.runtime.getBackgroundPage(function(win){
	extension = win;
	docReady();
});

function docReady(){
	$(document).ready(function() {
		
//		func_callback["rediectMainPage"] = rediectMainPage;
		if(extension.homePage != "" && extension.homePage){
			$("#homePage").attr("href",extension.homePage);
			$("#homePage").text(extension.homePage);
		}
		
		if(extension.login && extension.AppServer.websocket != null && extension.AppServer.websocket.readyState == 1){
			extension.checkUserLogin("rediectMainPage");
		}
		bindEvent();
	});
}



function rediectMainPage(){
	extension.openLoginPage(false, true);
}

/**
 * @return
 */
function bindEvent(){
	
	
	$(".tab").click(function(){
		if (!$(this).hasClass("selected")) {
			$(".tab.selected").removeClass("selected");
			$(this).addClass("selected");
			$(".login-form").toggleClass("hidden");
		}
	});
	/***** register ************/
	$("#email_r").blur(checkEmail);
	$("#password_r").blur(checkPassword);
	$("#repassword_r").blur(checkRePassword);
	$("#btn_r").click(validateRegInfo);
	
	/***** login ************/
	$("#email_l").blur(checkLoginEmail);
	$("#password_l").blur(checkLoginPwd);
	$("#btn_l").click(validateLoginInfo);
	$("#password_l").keydown(function(e){
		var currentKey = e.which;
		if(currentKey == 13){
			validateLoginInfo();
			return false;
		}
	});
	
	/*********** find password ********/
	$("#findPwdLink").fancybox({
		'hideOnContentClick': true
	});
	$("#findPwd-btn").click(function(){
		var email = $.trim($("#email_f").val());
		var account_f = $("#account_f");
		removeMessage(account_f);
		if(email == "" || !checkEmailFormat(email)){
			addMessage(message.errorEmail, account_f, "error");
			return;
		}else{
			$(this).attr("disabled", "disabled");
			var that = this;
			var data = {action : "findPassword" , userEmail : email};
			extension.AppServer.ajax(data, "GET", function(result){
				var msg = result.msg;
				if(result && msg){
					var account_f2 = $("#account_f");
					removeMessage(account_f2);
					addMessage(msg, account_f2, result.status == 200 ? "info" : "error");
				}else{
					alert(message.serverException);
				}
				$(that).removeAttr("disabled", "disabled");
			},function(){
				$(that).removeAttr("disabled", "disabled");
			});
		}
	});
	
	$("#emailHelp").click(function(){
		window.open(extension.homePage + 'help.html');
	})
	
	
	var ids = ["emailHelp","btn_r","findPwdLink","btn_l","zw","en"];
	$.each(ids, function(i,n){
		document.getElementById(n).addEventListener('click', trackButtonClick);
	});
};

function validateRegInfo(){
	var result = checkEmail() && checkPassword() && checkRePassword();
	if(result){
		var email = $.trim($("#email_r").val());
		var password = $.md5($("#password_r").val());
		var rePassword = $.md5($("#repassword_r").val());
		var code = $.trim($("#inviteCode").val());
		var data = {action : "register", userEmail : email, password : password,rePassword:rePassword,code:code};
		$(this).attr("disabled", "disabled");
		var that = this;
		extension.AppServer.ajax(data, "POST", function(msg){
			if(msg.status == 500 || msg.data == false){
				alert(msg.msg);
				return;
			} else if(msg.data == true){
				alert(message.registerSuccess);
			}
			$(that).attr("disabled", "disabled");
		},function(error){
			alert(message.serverException);
			$(that).attr("disabled", "disabled");
		});
	}
};
function checkEmail() {
	var email =$.trim($("#email_r").val());
	var account_r = $("#account_r");
	removeMessage(account_r);
	if (checkEmailFormat(email)) {
		//   check email is register or not
		checkEmailIsExist(email);
		return true;
	} else {
		// 
		addMessage(message.errorEmail, account_r, "error");
		return false;
	}
};

function checkEmailFormat(email){
	var reg = /\w+[@]{1}\w+[.]\w+/;
	return reg.test(email);
};

function checkEmailIsExist(email){
	var data = {action : "checkRegister", userEmail : email};
	extension.AppServer.ajax(data, "GET", function(msg){
		var account_r = $("#account_r");
		if(msg.data == false){
			var other = "";
			if(email.toLowerCase().indexOf("@qq.com") > 0){
				other = ", " + message.qqAlert;
				//window.open(extension.homePage + 'help.html');
			}
			addMessage(message.normalEmail + other, account_r, "info");
		} else {
			addMessage(message.existEmail, account_r, "error");
		}
	});
};

function checkPassword(){
	var userpwd_r = $("#userpwd_r");
	removeMessage(userpwd_r);
	var pswd = $("#password_r").val();
	if(pswd == "" || pswd.length < 6 || pswd.length > 15){
		addMessage(message.invalidPassword, userpwd_r, "error");
		return false;
	} else {
		return true;
	}
};

function checkRePassword(){
	var userrepwd_r = $("#userrepwd_r");
	removeMessage(userrepwd_r);
	var pwd = $("#password_r").val();
	var repwd = $("#repassword_r").val();
	if(pwd != repwd){
		addMessage(message.notSamePassword, userrepwd_r, "error");
		return false;
	} else {
		return true;
	}
};

function validateLoginInfo(){
	var result = checkLoginEmail() && checkLoginPwd();
	var btn = $(this);
	if(result && btn.attr("disabled") != "disabled"){
		// 
		btn.attr("disabled", "disabled");
		email = $.trim($("#email_l").val());
		var pwd = $("#password_l").val();
		var password = $.md5(pwd);
		
		
		btn.find("span").text(message.logining);
		var that = this;
		var data = {action : "tryLogon2", userEmail : email, password : password, version : extension.version};
		extension.AppServer.ajax(data,"GET",function(data){
			if(data.status == 500){
				btn.find("span").text(message.login);
				alert(data.msg);
			}else{
				var rd = data.data;
				if(data.status == 300 && rd == "NEED_UPDATE"){
					btn.find("span").text(message.login);
					extension.version = -1;
					alert(message.mustUpdate);
					return;
				}else if(data.status == 400){
					btn.find("span").text(message.login);
					var text = message.activePrefix + extension.AppServer.getHTTPServer() 
						+ "?action=reEmail&uid=" + rd.userEmail  + "&lang=" + getLang() + message.activeSuffix;
					addMessage(text , $("#account_l") ,"error");
				} else if(data.status == 200){
					extension.writeCookie(rd.cookie);
					extension.setLastLoginName(rd.userEmail);
					extension.AppServer.initWebSocket(function(){
						extension.openLoginPage(false, true);
					}, rd.key);
				}
			}
			$(that).removeAttr("disabled");
		},function(){
			alert(message.loginFaild);
			$(that).removeAttr("disabled");
		},null,false);
	}
};


function checkLoginEmail(){
	var account_l = $("#account_l");
	removeMessage(account_l);
	if($.trim($("#email_l").val()) == ""){
		addMessage(message.nullEmail, account_l, "error");
		return false;
	}else{
		return true;
	}
};

function checkLoginPwd(){
	var userpwd_l = $("#userpwd_l");
	removeMessage(userpwd_l);
	if($("#password_l").val() == ""){
		addMessage(message.nullPassword, userpwd_l, "error");
		return false;
	}else{
		return true;
	}
};

