!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.vuefetch=t():e.vuefetch=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=function(){function e(t){o(this,e),this.Vue=t,this.opts={headers:{"content-type":"application/json;charset=utf-8",Accept:"*/*"},timeout:1e5,method:"GET",mode:"no-cors",credentials:"include",cache:"no-cache"}}return r(e,null,[{key:"install",value:function(t){e.isInstall?e.isInstall=!0:t.prototype.$fetch=new e(t)}}]),r(e,[{key:"checkStatus",value:function(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}},{key:"timeout",value:function(e){return new Promise(function(t,n){setTimeout(function(){n(new Error("fetch timeout"))},e)})}},{key:"getUrl",value:function(e,t){var n=Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&");return n.length>0?e+"?"+n:e}},{key:"getBodyData",value:function(e){return Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")}},{key:"getOpts",value:function(e){var t=Object.assign({},this.opts);for(var n in e)t[n]=e[n];return t}},{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=this.getOpts(n);o.method="GET";var r=this.getUrl(e,t);return Promise.race([fetch(r,o),this.timeout(o.timeout)]).then(this.checkStatus)}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=this.getOpts(n),r=JSON.stringify(t);return o.method="POST",o.body=r,Promise.race([fetch(e,o),this.timeout(o.timeout)]).then(this.checkStatus)}}]),e}();u.isInstall=!1,t.default=u}])});