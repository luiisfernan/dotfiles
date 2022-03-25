!function(r){"use strict";function e(r,e){var t=r.length,n=t<<2;if(e){var o=r[t-1];if(n-=4,o<n-3||o>n)return null;n=o}for(var a=0;a<t;a++)r[a]=String.fromCharCode(255&r[a],r[a]>>>8&255,r[a]>>>16&255,r[a]>>>24&255);var c=r.join("");return e?c.substring(0,n):c}function t(r,e){var t=r.length,n=t>>2;0!==(3&t)&&++n;var o;e?(o=new Array(n+1),o[n]=t):o=new Array(n);for(var a=0;a<t;++a)o[a>>2]|=r.charCodeAt(a)<<((3&a)<<3);return o}function n(r){return 4294967295&r}function o(r,e,t,n,o,a){return(t>>>5^e<<2)+(e>>>3^t<<4)^(r^e)+(a[3&n^o]^t)}function a(r){return r.length<4&&(r.length=4),r}function c(r,e){var t,a,c,i,h,f,d=r.length,u=d-1;for(a=r[u],c=0,f=0|Math.floor(6+52/d);f>0;--f){for(c=n(c+A),i=c>>>2&3,h=0;h<u;++h)t=r[h+1],a=r[h]=n(r[h]+o(c,t,a,h,i,e));t=r[0],a=r[u]=n(r[u]+o(c,t,a,u,i,e))}return r}function i(r,e){var t,a,c,i,h,f,d=r.length,u=d-1;for(t=r[0],f=Math.floor(6+52/d),c=n(f*A);0!==c;c=n(c-A)){for(i=c>>>2&3,h=u;h>0;--h)a=r[h-1],t=r[h]=n(r[h]-o(c,t,a,h,i,e));a=r[u],t=r[0]=n(r[0]-o(c,t,a,0,i,e))}return r}function h(r){if(/^[\x00-\x7f]*$/.test(r))return r;for(var e=[],t=r.length,n=0,o=0;n<t;++n,++o){var a=r.charCodeAt(n);if(a<128)e[o]=r.charAt(n);else if(a<2048)e[o]=String.fromCharCode(192|a>>6,128|63&a);else{if(!(a<55296||a>57343)){if(n+1<t){var c=r.charCodeAt(n+1);if(a<56320&&56320<=c&&c<=57343){var i=((1023&a)<<10|1023&c)+65536;e[o]=String.fromCharCode(240|i>>18&63,128|i>>12&63,128|i>>6&63,128|63&i),++n;continue}}throw new Error("Malformed string")}e[o]=String.fromCharCode(224|a>>12,128|a>>6&63,128|63&a)}}return e.join("")}function f(r,e){for(var t=new Array(e),n=0,o=0,a=r.length;n<e&&o<a;n++){var c=r.charCodeAt(o++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:t[n]=c;break;case 12:case 13:if(!(o<a))throw new Error("Unfinished UTF-8 octet sequence");t[n]=(31&c)<<6|63&r.charCodeAt(o++);break;case 14:if(!(o+1<a))throw new Error("Unfinished UTF-8 octet sequence");t[n]=(15&c)<<12|(63&r.charCodeAt(o++))<<6|63&r.charCodeAt(o++);break;case 15:if(!(o+2<a))throw new Error("Unfinished UTF-8 octet sequence");var i=((7&c)<<18|(63&r.charCodeAt(o++))<<12|(63&r.charCodeAt(o++))<<6|63&r.charCodeAt(o++))-65536;if(!(0<=i&&i<=1048575))throw new Error("Character outside valid Unicode range: 0x"+i.toString(16));t[n++]=i>>10&1023|55296,t[n]=1023&i|56320;break;default:throw new Error("Bad UTF-8 encoding 0x"+c.toString(16))}}return n<e&&(t.length=n),String.fromCharCode.apply(String,t)}function d(r,e){for(var t=[],n=new Array(32768),o=0,a=0,c=r.length;o<e&&a<c;o++){var i=r.charCodeAt(a++);switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:n[o]=i;break;case 12:case 13:if(!(a<c))throw new Error("Unfinished UTF-8 octet sequence");n[o]=(31&i)<<6|63&r.charCodeAt(a++);break;case 14:if(!(a+1<c))throw new Error("Unfinished UTF-8 octet sequence");n[o]=(15&i)<<12|(63&r.charCodeAt(a++))<<6|63&r.charCodeAt(a++);break;case 15:if(!(a+2<c))throw new Error("Unfinished UTF-8 octet sequence");var h=((7&i)<<18|(63&r.charCodeAt(a++))<<12|(63&r.charCodeAt(a++))<<6|63&r.charCodeAt(a++))-65536;if(!(0<=h&&h<=1048575))throw new Error("Character outside valid Unicode range: 0x"+h.toString(16));n[o++]=h>>10&1023|55296,n[o]=1023&h|56320;break;default:throw new Error("Bad UTF-8 encoding 0x"+i.toString(16))}if(o>=32766){var f=o+1;n.length=f,t[t.length]=String.fromCharCode.apply(String,n),e-=f,o=-1}}return o>0&&(n.length=o,t[t.length]=String.fromCharCode.apply(String,n)),t.join("")}function u(r,e){return(void 0===e||null===e||e<0)&&(e=r.length),0===e?"":/^[\x00-\x7f]*$/.test(r)||!/^[\x00-\xff]*$/.test(r)?e===r.length?r:r.substr(0,e):e<65535?f(r,e):d(r,e)}function s(r,n){return void 0===r||null===r||0===r.length?r:(r=h(r),n=h(n),e(c(t(r,!0),a(t(n,!1))),!1))}function C(e,t){return r.btoa(s(e,t))}function l(r,n){return void 0===r||null===r||0===r.length?r:(n=h(n),u(e(i(t(r,!1),a(t(n,!1))),!0)))}function g(e,t){return void 0===e||null===e||0===e.length?e:l(r.atob(e),t)}"undefined"==typeof r.btoa&&(r.btoa=function(){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");return function(e){var t,n,o,a,c,i,h;for(n=o=0,a=e.length,c=a%3,a-=c,i=a/3<<2,c>0&&(i+=4),t=new Array(i);n<a;)h=e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<8|e.charCodeAt(n++),t[o++]=r[h>>18]+r[h>>12&63]+r[h>>6&63]+r[63&h];return 1==c?(h=e.charCodeAt(n++),t[o++]=r[h>>2]+r[(3&h)<<4]+"=="):2==c&&(h=e.charCodeAt(n++)<<8|e.charCodeAt(n++),t[o++]=r[h>>10]+r[h>>4&63]+r[(15&h)<<2]+"="),t.join("")}}()),"undefined"==typeof r.atob&&(r.atob=function(){var r=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];return function(e){var t,n,o,a,c,i,h,f,d,u;if(h=e.length,h%4!==0)return"";if(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\+\/\=]/.test(e))return"";for(f="="==e.charAt(h-2)?1:"="==e.charAt(h-1)?2:0,d=h,f>0&&(d-=4),d=3*(d>>2)+f,u=new Array(d),c=i=0;c<h&&(t=r[e.charCodeAt(c++)],t!=-1)&&(n=r[e.charCodeAt(c++)],n!=-1)&&(u[i++]=String.fromCharCode(t<<2|(48&n)>>4),o=r[e.charCodeAt(c++)],o!=-1)&&(u[i++]=String.fromCharCode((15&n)<<4|(60&o)>>2),a=r[e.charCodeAt(c++)],a!=-1);)u[i++]=String.fromCharCode((3&o)<<6|a);return u.join("")}}());var A=2654435769;r.XXTEA={utf8Encode:h,utf8Decode:u,encrypt:s,encryptToBase64:C,decrypt:l,decryptFromBase64:g}}(this||[eval][0]("this"));