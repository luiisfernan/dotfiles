

function addMessage(message, parent, msgType) {
	var msgStr = "";
	var cls = "";
	if (msgType == "error") {
		cls = "info error";
	} else if (msgType == "info") {
		cls = "info";
	}
	msgStr = '<span class="' + cls + '">' + message + '</span>';
	$(msgStr).appendTo(parent);
};

function removeMessage(parent) {
	parent.find("span").remove();
};



(function() {
	chrome.runtime.onMessage.addListener(function(request,
			sender, sendResponse) {
		/*if(typeof func_callback[request.callback] === 'function'){
			func_callback[request.callback](request.data);
		}*/
		
		var callback;
		try {
			//get callback function name string
			callback = eval(request.callback);
		} catch (exception) {
			// do nothing
		};
		if (typeof callback === 'function') {
			// the function exist and execute it
			new callback(request.data);
		} else {
			// not a function or not exist
			// do nothing
		}
	});
})();

function reloadLang(l){
	location.reload();
	extension.reloadLang(l);
}

function saveFileAs(fileName, fileData) {
    try {
        var Blob = window.Blob || window.WebKitBlob;

        var constructor_supported = false;
        if (Blob) {
          try {
            new Blob([], { "type" : "text/plain" });
            constructor_supported = true;
          } catch (_) { }
        }

        var b = null;
        if (constructor_supported) {
          b = new Blob([fileData], { "type" : "text/plain" });
        } else {
          var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
          var bb = new BlobBuilder();
          bb.append(fileData);
          b = bb.getBlob("text/plain");
        }

        saveAs(b, fileName);
    } catch (e) {
    	alert(message.exportFailed);
    }
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-86456658-1']);
_gaq.push(['_trackPageview']);

/*(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();*/
	  
function trackButtonClick(e) {
//	_gaq.push(['_trackEvent', e.target.id, 'clicked']);
}