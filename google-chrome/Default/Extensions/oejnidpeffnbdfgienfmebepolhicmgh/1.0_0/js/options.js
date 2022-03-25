$(document).ready(function(){
	chrome.storage.sync.get("languages", function(saved_languages){
		
		for(var language in supported_languages){
			var l = supported_languages[language].name;
			var checked = "";
			if(saved_languages.languages !== undefined && saved_languages.languages.indexOf(l) != -1){
				checked = "checked=checked";
			}
			var html = "<li class='list-group-item'><input type='checkbox' value='" + l + "'" + checked + "></input> " + l + "</li>";
			$("#languages").append(html);
		}
	});
	
	$("#submit").click(function(){
		var checked = $("input:checked");
		var languages = [];
		for(i=0; i < checked.length; i++){
			languages.push(checked[i].value);
		}
		
		chrome.storage.sync.set({languages:languages});
		
		chrome.tabs.getCurrent(function(tab) {
			chrome.tabs.remove(tab.id, function() {});
		});
	
	});

});