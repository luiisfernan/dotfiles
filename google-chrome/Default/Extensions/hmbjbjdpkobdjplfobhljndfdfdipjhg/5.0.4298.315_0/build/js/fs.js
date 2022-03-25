"use strict";var GlobalFileSystem=null;function fs(t){t=t||{},this.filesystem=null,this.fileMap={}}fs.prototype.init=function(e){var i=this;GlobalFileSystem?(this.filesystem=GlobalFileSystem,setTimeout(function(){e(null)},0)):navigator.webkitPersistentStorage.requestQuota(1048576,function(t){window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.PERSISTENT,t,function(t){i.filesystem=t,GlobalFileSystem=t,e(null)},e)},e)},fs.prototype._createDir=function(t,e,i){for(var n=this;"."===e[0]||""===e[0];)e=e.slice(1);0!==e.length?t.getDirectory(e[0],{create:!0},function(t){e.length&&n._createDir(t,e.slice(1),i)},i):setTimeout(function(){i(null)},0)},fs.prototype.createDir=function(t,e){this._createDir(this.filesystem.root,t,e)},fs.prototype.createFile=function(t,e){var i=this;this.filesystem.root.getFile(t,{create:!0},function(t){(i.fileEntry=t).createWriter(function(t){e(null,t)},e)},e)},fs.prototype.toArray=function(t){return Array.prototype.slice.call(t||[],0)},fs.prototype.readDir=function(t,r){var e=this;t instanceof Function&&(r=t,t=this.dir),this.filesystem?this.filesystem.root.getDirectory(t,{},function(t){var i=t.createReader(),n=[],o=e;!function e(){i.readEntries(function(t){t.length?(n=n.concat(o.toArray(t)),e()):setTimeout(function(){r(null,n)},0)},r)}()},r):setTimeout(function(){r(null,null)},0)},fs.prototype.readFile=function(t,i){this.filesystem?this.filesystem.root.getFile(t,{},function(t){t.file(function(t){var e=new FileReader;e.onloadend=function(){i(null,this.result)},e.readAsText(t)})}):setTimeout(function(){i(null,null)},0)},fs.prototype.getStat=function(t,e){this.filesystem?this.filesystem.root.getFile(t,{},function(t){t.file(function(t){e(null,t)})}):setTimeout(function(){e(null,null)},0)},fs.prototype.writeFile=function(i,n,o){var r=this;if(this.filesystem){var l=this.fileMap[i];l?(l.seek(l.length),l.write(n)):this.createFile(i,function(t,e){t?o(t):((l=e).onwriteend=function(){o(null,l.length)},l.onerror=function(t){o(t)},(r.fileMap[i]=l).seek(l.length),l.write(n))})}else setTimeout(function(){o(null)},0)},fs.prototype.delFile=function(t,e){this.filesystem?this.filesystem.root.getFile(t,{create:!1},function(t){t.remove(function(){e(null)},e)},e):setTimeout(function(){e(null)},0)},fs.prototype.delFiles=function(t,e){if(this.filesystem)for(var i=0,n=t.length,o=0;o<t.length;o++)this.delFile(t[o],function(t){n<=++i&&e(null)});else setTimeout(function(){e(null)},0)},fs.prototype.clearAll=function(l){this.filesystem?fsObj.readDir("/",function(t,i){if(t)l(t);else{var n=0;if(!i.length)return void l(null);for(var e=function(t,e){i[t].isDirectory?i[t].removeRecursively(function(){e<=++n&&l(null)},l):i[t].remove(function(){e<=++n&&l(null)},l)},o=0,r=i.length;o<r;o++)e(o,r)}}):setTimeout(function(){l(null)},0)},fs.prototype.saveAs=function(t,e,i){if(this.filesystem){var n={type:"saveFile",suggestedName:e};this.getStat(t,function(t,e){t?i(t):chrome.fileSystem.chooseEntry(n,function(t){!chrome.runtime.lastError&&t?t.createWriter(function(t){t.onerror=i,t.onwriteend=function(t){i(null)},t.write(e)},i):i(chrome.runtime.lastError||new Error("not support"))})})}else setTimeout(function(){i(null)},0)},fs.prototype.mutlSaveAs=function(i,o,r){if(this.filesystem){var l=this;chrome.fileSystem.chooseEntry({type:"openDirectory"},function(n){if(!chrome.runtime.lastError&&n)for(var t=0;t<i.length;t++){e(i[t],n.fullPath+"/"+o[t])}else r(chrome.runtime.lastError||new Error("not support"));function e(t,i){l.getStat(t,function(t,e){t?console.error(t):n.getFile(i,{create:!0},function(t){t.createWriter(function(t){t.onerror=function(t){console.error(t)},t.write(e)},function(t){console.error(t)})})})}})}else setTimeout(function(){r(null)},0)};