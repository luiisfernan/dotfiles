
var config = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) { return \"HTTPS ca.freevpn.pw:443\"; }"
  }
};

// current proxy status, set or not set
var on = false;
var os = "";
var landingPage = "https://www.freevpn.pw/mac-vpn?from=done&utm_source=chrome";

// pacScript.data template, replace countryName
var pacValue = "function FindProxyForURL(url, host) { return \"HTTPS countryName.freevpn.pw:443\"; }";

chrome.runtime.getPlatformInfo(function(info)
{
  os = info.os;
  //landingPage = landingPage + "&os=" + os;
  //console.log(landingPage);
});

chrome.runtime.onStartup.addListener(
  function() {
    clearProxy();
    var thisVer = chrome.runtime.getManifest().version;
    chrome.runtime.onUpdateAvailable.addListener(
      function(details) {
        if (details.version != thisVer) {
          chrome.notifications.create(
            "",
            {message: "New version is available.",
            type: "basic",
            title: "Upgrade HideMe from Settings > Extension.",
            iconUrl: "icon128.png"}
          );
        }
      }
    );
});

// chrome.browserAction.onClicked.addListener(
//   function(tab) {
//     updateProxy();
// });

function updateProxy() {
  chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {
          var mode = config.value.mode;
          if (mode == "system") {
            setProxy();
          } else {
            clearProxy();
          }
        });
}

function setProxy() {
    chrome.storage.sync.get(null, function(items) {
      console.log(items.country);
      config.pacScript.data = pacValue.replace("countryName", items.country);
      //console.log(config.pacScript.data);

      chrome.proxy.settings.set(
           {value: config, scope: 'regular'},
           function() {
             on = true;
             chrome.browserAction.setIcon({path: "icon128.png"});
             chrome.runtime.sendMessage({status: on});
             chrome.alarms.create("site", {when: Date.now() + 500});
           });
    });
}

function clearProxy() {
  chrome.proxy.settings.clear(
    {scope: "regular"},
    function() {
      on = false;
      chrome.browserAction.setIcon({path: "off128.png"});
      chrome.runtime.sendMessage({status: on});
    }
  );
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.cmd == "connect") {
      updateProxy();
    }
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == "site") {
    window.open(landingPage);
  }
});
