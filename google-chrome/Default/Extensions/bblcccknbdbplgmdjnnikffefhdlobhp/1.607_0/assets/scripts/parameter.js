var version = chrome.runtime.getManifest().version;
var appName = "faststunnel";
var versionStatus = 0;
var vip = 0;
var maxNotice = 10;
var webServer = "";
var appOpen = "";
var announcements = [];
var ModelType = {
	needed : "needed",
	always : "always",
	closed : "closed"
};

var defaultModel = ModelType.needed;

var storage = window.localStorage;

var invationCode = null;

var invat_link = "";

var praise_link = "";

var app_download_link = "";

var homePage = "";

var login = false;

var links = null;

var limit = -1;

var uuu = null;

var ccc = false;

var errors = [
	"net::ERR_CONNECTION_TIMED_OUT","net::ERR_CONNECTION_FAILED","net::ERR_NAME_NOT_RESOLVED","net::ERR_CONNECTION_ABORTED","net::ERR_INTERNET_DISCONNECTED",
	"net::ERR_ADDRESS_INVALID","net::ERR_ADDRESS_UNREACHABLE","net::ERR_NAME_RESOLUTION_FAILED","net::ERR_NETWORK_ACCESS_DENIED",
	"net::ERR_TEMPORARILY_THROTTLED","net::ERR_INVALID_URL","net::ERR_CONNECTION_RESET","net::ERR_PROXY_CONNECTION_FAILED"
];

var freeTime = 0;

var hasChecked = 0;

var signIn = false;

var username = null;
var password = null;
var freeVIPTime = 0;
var authCode = "";
var openPageStatus = "false";
var openPageId = "";
var openPageUrl = "";
var appname = "FastStunnel1.63 ";
var isBU = false;
var hasBU = false;
var encodeType = null;
var versionCode = 1;