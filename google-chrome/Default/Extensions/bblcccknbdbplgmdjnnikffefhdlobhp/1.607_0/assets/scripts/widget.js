
chrome.runtime.onMessage.addListener(function (msg) {
	if(msg.subject !== 'WidgetMessage') {
		return;
	}
	console.log(msg);
	$("#submit-btn").removeClass("ext-close");
	$("#messageId").text(msg.message.id);
	
	$("#headline").text(msg.message.title);
	$("#description").text(msg.message.content);
	if(!msg.message.buy){
		$("#submit-btn").hide();
	}
	
	$("#dismiss-btn").text(msg.message.dismiss);
	if(msg.message.id == -2){
		//free message
		$("#submit-btn").text(msg.message.buy);
		$("#submit-btn").show();
	}else if(msg.message.id == -3){
		$("#submit-btn").text(msg.message.buy);
		$("#submit-btn").addClass("ext-close");
		$("#submit-btn").show();
	}
	
	if(msg.show){
		$("#message").attr("class","");
		$("#toggle-btn").attr("class","active");
	}else{
		$("#message").attr("class","hidden");
		$("#toggle-btn").attr("class","");
	}
});


$("#dismiss-btn").click(function(){
	var id = parseInt($("#messageId").text());
	$("#toggle-btn").click();
	chrome.runtime.sendMessage({
		subject: 'remaindMeLater', message : {"id":id}
	});
	/*if(id == -2){
		
	}else{
		
	}*/ 
});

$("#toggle-btn").click(function(){
	if($(this).hasClass("active")){
		$(this).attr("class","");
		$("#message").attr("class","hidden");
	}else{
		$(this).attr("class","active");
		$("#message").attr("class","");
	}
	
});

$("#submit-btn").click(function(){
	if($(this).hasClass("ext-close")){
		chrome.runtime.sendMessage({
			subject: 'closeOtherExts'
		});
	}else{
		chrome.runtime.sendMessage({
			subject: 'openMainPage'
		});
	}
});


chrome.runtime.sendMessage({
	subject: 'getWidgetMessage'
});
