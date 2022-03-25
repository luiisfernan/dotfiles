//
// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-87918972-2']);
// _gaq.push(['_trackPageview']);
//
// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

function clickConnect() {
  chrome.runtime.sendMessage({"cmd": "connect"});
}

function setStatusOn() {
  var img = document.getElementById("statusImage");
  img.src = "on.svg";
  var btn = document.getElementById("button");
  btn.textContent = "Disconnect";
  //window.open("http://www.freevpn.pw/?utm_source=chrome&utm_medium=ext");
}

function setStatusOff() {
  var img = document.getElementById("statusImage");
  img.src = "red.svg";
  var btn = document.getElementById("button");
  btn.textContent = "Connect";
}

function setCountryImage(name) {
  var imgsrc = "images/" + name + "_s.png";
  var img = document.getElementById("countryImage");
  img.src = imgsrc;
}

document.addEventListener('DOMContentLoaded', function () {
  // console.log("popup loaded");

  chrome.runtime.onMessage.addListener(function(msg, sender, respFunc) {
    if (msg.status == true) {
      setStatusOn();
    } else if (msg.status == false) {
      setStatusOff();
    }
  });

  // query selected country from local storage
  chrome.storage.sync.get(null, function(items) {
    console.log(items.country);
    if (items.country == undefined) {
      items["country"] = "us";
      chrome.storage.sync.set(items);
      setCountryImage("us");
    } else {
      setCountryImage(items.country);
    }
  });

  // handle click
  var button = document.getElementById("button");
  button.addEventListener('click', clickConnect);

  // query proxy status from background.js and update image
  var bg = chrome.runtime.getBackgroundPage(function(window) {
    if (window.on == true) {
      setStatusOn();
    }
  });

  // rate
  document.getElementById("rate").addEventListener("click", function() {
    console.log("click rate");
    window.open("https://chrome.google.com/webstore/detail/free-vpn-proxy-by-freevpn/ibmdbhboiekjjoadjahpnmmcgdmabbdf/reviews?utm_source=chrome");
  });

  document.getElementById("dl").addEventListener("click", function() {
    window.open("https://www.freevpn.pw?utm_source=chrome");
  });

  // download links
  document.getElementById("android").addEventListener("click", function() {
    window.open("https://play.google.com/store/apps/details?id=vpn.proxy.freevpn&referrer=utm_source%3Dchrome%26utm_medium%3Dext");
  });

  document.getElementById("ios").addEventListener("click", function() {
    window.open("https://itunes.apple.com/app/freevpn-plus-unlimited-vpn-proxy/id1199702014?ls=1&mt=8");
  });

  document.getElementById("win").addEventListener("click", function() {
    window.open("http://download.cnet.com/FreeVPN/3000-2144_4-77503916.html");
  });

  document.getElementById("mac").addEventListener("click", function() {
    window.open("https://itunes.apple.com/app/freevpn-plus-unlimited-free-vpn-for-mac/id1202726435?ls=1&mt=12");
  });
});
