var id = "translate-modal";
var title = "Translation:";

$(document).ready(function(){
	
	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			var info = request.info;
			if(info == "ERROR"){
				info = request.description;
				title = "ERROR";
			}
			if(!$("#translate-modal").length){ //when the div does not exist
				var html = "<div id=translate-modal>" + "<div id='close-button'>&times;</div>" + 
				"<div id='title'>" + title + "</div>" + 
				"<div id='translation-content'>" + info + "</div>";
				
				$("body").append(html);
				$("#translate-modal").draggable({ handle: "#title", cursor:"crosshair" });
				$("#translate-modal #close-button").click(function() {
					$("#translate-modal").hide(50);
				});
				
			}
			else{
				$("#translate-modal #translation-content").html(info);
			}
			if(!$("#translate-modal").is(":visible")){
				$("#translate-modal").show(50);
			}
		}
	);
	
	$(document).keyup(function(e){
		//escape key
		if(e.keyCode == 27){
			$("#translate-modal").hide(50);
		}
	
	});
});