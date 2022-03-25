check_install();
load_context_menus();
chrome.storage.onChanged.addListener(function(changes, areaName) {
	if(areaName == "sync"){
		load_context_menus();
	}

});

function translate(trans, trans_from, trans_to){
	var url = "http://translate.google.com/translate_a/t?client=j&text=" + encodeURIComponent(trans) + "&hl=en&sl=" + trans_from+ "&tl=" + trans_to;
	
	$.getJSON(url, function(data) {
		console.log(data);
		var sentence = merge_sentences(data.sentences);
		
		chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.sendMessage(tab.id,{info:sentence});
		}); 
	})
	.error(function(data){
		chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.sendMessage(tab.id,{info:"ERROR", description:"Text selection too long."});
		}); 
	});
}


function merge_sentences(sentences){
	var sentence = "";
	for(var index in sentences){
		sentence += sentences[index].trans;
	}
	return sentence;
}

function load_context_menus(){
	chrome.contextMenus.removeAll();
	var country_codes = [];
	var parent_context = chrome.contextMenus.create({title:"Translate to...", contexts:["selection"]});
	chrome.storage.sync.get("languages", function(saved_languages){
		for(language in saved_languages.languages){
			var menuId = chrome.contextMenus.create({parentId:parent_context, title:saved_languages.languages[language], contexts:["selection"], onclick:
				function(info, tab){
					var cc = "";
					for(c in country_codes){
						if(country_codes[c].menuId == info.menuItemId){
							cc = country_codes[c].cc_code;
							break;
						}
					}
					translate(info.selectionText, "auto", cc);
			}});
			country_codes.push({menuId:menuId, cc_code:get_cc(saved_languages.languages[language])});
		}
		chrome.contextMenus.create({parentId:parent_context, title:"Settings...", contexts:["selection"], onclick:
			function(info, tab){
			chrome.tabs.create({url:"options.html"});
		}});
	});
}

function check_install(){
    if (localStorage.getItem('install_time'))
        return;

	chrome.tabs.getAllInWindow(null, function(tabs) {
		for(var i = 0; i < tabs.length; i++) {
			chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
		}
	});
    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    chrome.tabs.create({url: "options.html"});
}