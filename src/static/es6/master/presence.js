/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/content-bc.png?e90c327320";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(11)
	__vue_script__ = __webpack_require__(14)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,\nfieldset, legend, button, input, textarea, th, td {\n  margin: 0;\n  padding: 0;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\nbody, button, input, select, textarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-size: 100%; }\n\naddress, cite, dfn, em, var {\n  font-style: normal; }\n\ncode, kbd, pre, samp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul, ol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset, img {\n  border: 0; }\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px; }\n\n::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  background: #999999; }\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2); }\n\n::-webkit-scrollbar-thumb:hover {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.4); }\n\n@font-face {\n  font-family: 'iconfont';\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.svg#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\";\n  font-size: 14px;\n  font-style: normal; }\n\n.size-12 {\n  font-size: 12px; }\n\n.size-14 {\n  font-size: 14px; }\n\n.size-16 {\n  font-size: 16px; }\n\n.size-18 {\n  font-size: 18px; }\n\n.cusor_hand {\n  cursor: pointer; }\n\n.overflow_pre {\n  overflow: hidden;\n  white-space: pre;\n  text-overflow: ellipsis; }\n\n.clear:after {\n  display: block;\n  content: '';\n  clear: both; }\n\n.header-top {\n  height: 38px;\n  width: 1200px;\n  margin: 0 auto;\n  color: #212121; }\n  .header-top > ul {\n    height: 100%; }\n    .header-top > ul > li {\n      box-sizing: border-box;\n      position: relative;\n      padding: 0 25px;\n      float: right;\n      height: 100%;\n      line-height: 38px;\n      text-align: center; }\n      .header-top > ul > li:after {\n        content: '';\n        display: block;\n        height: 15px;\n        width: 1px;\n        float: right;\n        background-color: #cccccc;\n        margin-top: 11.5px;\n        margin-right: -25px; }\n      .header-top > ul > li .iconfont {\n        color: #e43a3d;\n        font-size: 12px;\n        margin-right: 3px; }\n    .header-top > ul > .focusus > img {\n      margin-left: 7px;\n      cursor: pointer; }\n    .header-top > ul > .focusus:after {\n      display: none; }\n    .header-top > ul .message span {\n      color: #e43a3d; }\n    .header-top > ul .functions:hover span {\n      -webkit-transform: rotate(180deg);\n              transform: rotate(180deg); }\n    .header-top > ul .functions > span {\n      height: 0;\n      width: 0;\n      border: 5px solid transparent;\n      border-bottom-color: #333333;\n      display: block;\n      position: absolute;\n      right: 15px;\n      top: 12px;\n      -webkit-transition: all 0.3s ease-in;\n      transition: all 0.3s ease-in;\n      -webkit-transform-origin: 50% 7.5px;\n              transform-origin: 50% 7.5px; }\n    .header-top > ul .functions > button {\n      background-color: transparent;\n      border: none; }\n      .header-top > ul .functions > button:hover {\n        color: #e43a3d; }\n\n.header-bottom {\n  background-image: url(" + __webpack_require__(13) + "); }\n  .header-bottom > .header-bottom-content {\n    width: 1200px;\n    height: 60px;\n    margin: 0 auto; }\n    .header-bottom > .header-bottom-content > figure {\n      float: left;\n      height: 100%;\n      width: 190px;\n      margin: 0;\n      background-color: rgba(0, 0, 0, 0.25);\n      padding: 0 5px;\n      box-sizing: border-box; }\n      .header-bottom > .header-bottom-content > figure img {\n        width: 100%;\n        margin-top: 8px; }\n    .header-bottom > .header-bottom-content > ul {\n      height: 100%;\n      float: left;\n      width: calc(100% - 190px - 287px);\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      box-sizing: border-box; }\n      .header-bottom > .header-bottom-content > ul > li {\n        font-size: 14px;\n        color: #ffffff;\n        text-align: center;\n        height: 100%;\n        line-height: 60px;\n        box-sizing: border-box;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        position: relative;\n        cursor: pointer;\n        -webkit-transition: all 0.3s ease-in;\n        transition: all 0.3s ease-in; }\n        .header-bottom > .header-bottom-content > ul > li:hover {\n          color: #dadada;\n          background-color: rgba(255, 255, 255, 0.2); }\n      .header-bottom > .header-bottom-content > ul > .select:after {\n        position: absolute;\n        content: '';\n        display: block;\n        background-color: #b09c56;\n        top: 0;\n        left: 50%;\n        height: 5px;\n        width: 90%;\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%); }\n    .header-bottom > .header-bottom-content > .header-search {\n      float: left;\n      width: 287px;\n      height: 30px;\n      box-sizing: border-box;\n      border: 1px solid #b71313;\n      position: relative;\n      font-size: 14px;\n      margin-top: 15px; }\n      .header-bottom > .header-bottom-content > .header-search > input {\n        height: 100%;\n        width: 100%;\n        padding-left: 35px;\n        border: none; }\n      .header-bottom > .header-bottom-content > .header-search i {\n        font-size: 16px;\n        top: 7px;\n        position: absolute;\n        display: block;\n        left: 10px;\n        color: #7d7d7d; }\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/header-bc.png?524d46358f";

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="header-top">
	//        <ul>
	//          <li class="focusus size-12">关注我们: <img src="../../assets/images/common/header-weibo.png" alt="weibo" /><img src="../../assets/images/common/header-weixin.png" alt="weixin" /></li>
	//          <li class="appdownload size-12 cusor_hand"><i class="iconfont">&#xe602;</i>App下载</li>
	//          <li class="contactus size-12">联系我们</li>
	//          <li class="message size-12 cusor_hand"><i class="iconfont">&#xe601;</i>消息 <span>(3)</span></li>
	//          <li class="functions size-12 cusor_hand">Hi，hjj黄姣姣 <button type="button" class="cusor_hand">【退出】</button><span></span></li>
	//        </ul>
	//     </div>
	//     <div class="header-bottom">
	//       <div class="header-bottom-content">
	//         <figure>
	//           <img src="../../assets/images/common/header-log.png" alt="log" />
	//         </figure>
	//         <ul>
	//           <li>课程中心</li>
	//           <li>我的考试</li>
	//           <li class="select">我的云课堂</li>
	//           <li>作品展示</li>
	//           <li>大师风采</li>
	//           <li>证书查询</li>
	//           <li>作品追溯</li>
	//         </ul>
	//         <div class="header-search">
	//           <i class="iconfont">&#xe604;</i>
	//           <input type="text"  value="" placeholder="搜素你要的课程">
	//         </div>
	//      </div>
	//     </div>
	// </template>
	// <style rel="stylesheet/scss" lang="sass">
	//    @import "../../sass/config";
	//    @import "../../sass/common/header";
	// </style>
	// <script>
	// common是所有业务模块下的通用组件
	// 修改common下的组件,所有业务模块的入口js都会编译
	exports.default = {
	    ready: function ready() {
	        console.log("jiazaichenggong");
	    }
	};
	// </script>

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"header-top\">\n   <ul>\n     <li class=\"focusus size-12\">关注我们: <img src=\"" + __webpack_require__(16) + "\" alt=\"weibo\" /><img src=\"" + __webpack_require__(17) + "\" alt=\"weixin\" /></li>\n     <li class=\"appdownload size-12 cusor_hand\"><i class=\"iconfont\">&#xe602;</i>App下载</li>\n     <li class=\"contactus size-12\">联系我们</li>\n     <li class=\"message size-12 cusor_hand\"><i class=\"iconfont\">&#xe601;</i>消息 <span>(3)</span></li>\n     <li class=\"functions size-12 cusor_hand\">Hi，hjj黄姣姣 <button type=\"button\" class=\"cusor_hand\">【退出】</button><span></span></li>\n   </ul>\n</div>\n<div class=\"header-bottom\">\n  <div class=\"header-bottom-content\">\n    <figure>\n      <img src=\"" + __webpack_require__(18) + "\" alt=\"log\" />\n    </figure>\n    <ul>\n      <li>课程中心</li>\n      <li>我的考试</li>\n      <li class=\"select\">我的云课堂</li>\n      <li>作品展示</li>\n      <li>大师风采</li>\n      <li>证书查询</li>\n      <li>作品追溯</li>\n    </ul>\n    <div class=\"header-search\">\n      <i class=\"iconfont\">&#xe604;</i>\n      <input type=\"text\"  value=\"\" placeholder=\"搜素你要的课程\">\n    </div>\n </div>\n</div>\n";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACyklEQVQoz41SfSzUcRx+nLvzc96OykuccPMbf3hJf+RtrfeVLaS0hmTmXXNklvVHqrFmSitDxfVmrX9MtdwhMtYuI4s7R6e8E87h7nCdvH37y0Vrq89/n8/neZ49+3we4D9L3Vx6uS/KmAxn8jfm3t4o/CdBWVtrvrXXKWpOLLbcFWibim4PxpmT8cLj3X8lzr1v3KeICK/vduJpBlKT3qyqlMabu/m2kjyNRJi8stC/41sMi8y+FDzdRp4SVqR12dkSKYtJetls0uPpSQBAJ5Mz1JImp+nXuc8HEzhE2yZM17aWFAxl8QnDYFn4WDCWlFTKWl8Hm+cMwmSCyTFdGb6UVj2WEDc+Hhrdz/ju9coutTxRW3fvjrEZV27MYsMIAOaaG44Oh0c2sn/qscEygZULD1w3/uTiks5ILZc7YEYFFgCW/+EJx6r80LW1SZ+NiVH7eXHZLawoR6heX+/lLoD00vTy0v3ijIV2icGZvu2jjfJRWbyM56jt8/UZ1/bIdgOAfqDeT/up6jwmCgvyOgHy1cd3lowOuAJAWHxitAPtWZGSfSXS8AVpu7t0j7P+s4UVmRY+TDAcrs9/v6qboshap8QXAGgvPxkAYkJRBABJzczJ38RO5mQLpQD5std72SDQbe9ApoICCQBEJaZEUpSZvrio+IAgIyuWy+VqAag3saqsrOoegCiCAiY3ZwwTD88RtVQGALCl3VVOLq5dNE23icTiXI1GY3ns9NlKANC1vAuYqa45sw7AIiSk4ndEm+oOSQAyFhwsA4CMwqJzsNmpgIWl8mDsxZsAQESisB4He9IBEMXJkP6t2TECgJlnT5KHU9IfcM0p2F6Iqfwwv2DN4JiqA/guU2hujRwSiT2YAMxjY8S869eiKTdas00AABa7OpynS8qvErkswhqEafRjmTOnVpuscrk6jn9gjcWpIy92hUc1/Bn9X9HEMdPDSRePAAAAAElFTkSuQmCC"

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQoz4XRMUhWURjG8d/35S1osAsRIXyLgQ0tRdBQja6SHBqipXCpoaWhhoYWGwIjdDVocND1ugVBa6EREVgQiCAZohBcgqi+A34NnguXS1cfOPA+PO/5n/fwdiRlRd7DfVzDGXSxgVeYjaHc0KJOAkxgEcMtfX9xL4by5X8hWZGfx3tk+II+LqR8B2sYTz7EUC43IV08SQB4jOlavoBbNf+8bZJfOJ78XjpDtZ4/eI1NHMNnrGIlhnJQQWLjUl0/MI+7ONnIPmIqhvJTJyvyD7jYAnmKR9r1E5e7mGlpeJMmkMa/WsvOYd3+NmeqFT/DgwbkBe6keoBdnE5+GyOp7nchhvIh3jYg/foCagA1APSH0iQncAST2MIYvuMGTjlYRfWdo4jVyiplRX4TSwcAvuFS55BXZEV+HXPoNaIBRmMoNw+FJFCGKziL3/iK21iMoXz3D4cJWslUJZ89AAAAAElFTkSuQmCC"

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/header-log.png?e81e31e697";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(20)
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\footer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./footer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./footer.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./footer.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".footer-outer {\n  width: 100%;\n  overflow: hidden;\n  background-color: #242424;\n  padding-bottom: 30px; }\n  .footer-outer > img {\n    display: block;\n    margin-bottom: 30px;\n    background-color: #ffffff; }\n  .footer-outer > ul {\n    margin: 0 auto;\n    width: 730px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    margin-bottom: 35px; }\n    .footer-outer > ul > li {\n      color: #d2d2d2;\n      font-size: 14px;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1;\n      position: relative;\n      height: 20px;\n      line-height: 20px;\n      text-align: center;\n      cursor: pointer;\n      -webkit-transition: all 0.2s ease-in;\n      transition: all 0.2s ease-in; }\n      .footer-outer > ul > li:after {\n        content: '';\n        display: block;\n        width: 1px;\n        height: 20px;\n        float: right;\n        background-color: #6f6e6e; }\n      .footer-outer > ul > li:hover {\n        color: #ffffff; }\n  .footer-outer .line-black {\n    display: block;\n    height: 1px;\n    width: 1000px;\n    background-color: #010101;\n    margin: 0 auto; }\n  .footer-outer .line-white {\n    display: block;\n    height: 1px;\n    width: 1000px;\n    background-color: #4b4b4b;\n    margin: 0 auto;\n    margin-bottom: 20px; }\n  .footer-outer > p {\n    text-align: center;\n    color: #bdbdbd;\n    margin: 0 auto;\n    line-height: 30px;\n    font-size: 12px; }\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//    <div class="footer-outer">
	//      <img src="../../assets/images/common/footer-bc.png" alt="footer" />
	//      <ul>
	//        <li>关于我们</li>
	//        <li>联系我们</li>
	//        <li>友情合作</li>
	//        <li>诚聘英才</li>
	//        <li>官方网站</li>
	//        <li>意见反馈</li>
	//      </ul>
	//      <span class="line-black"></span>
	//      <span class="line-white"></span>
	//      <p>
	//        Copyright 2016. All right reserved www.zjzx.cn
	//      </p>
	//      <p>
	//        版权所有：北京中教在线科技有限公司 
	//      </p>
	//    </div>
	// </template>
	// <script>
	// common是所有业务模块下的通用组件
	// 修改common下的组件,所有业务模块的入口js都会编译
	exports.default = {
	  //数据层
	  data: function data() {
	    return {};
	  },
	  ready: function ready() {}
	};
	// </script>
	// <style  rel="stylesheet/scss" lang="sass">
	//   @import "../../sass/common/footer";
	// </style>

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"footer-outer\">\n  <img src=\"" + __webpack_require__(24) + "\" alt=\"footer\" />\n  <ul>\n    <li>关于我们</li>\n    <li>联系我们</li>\n    <li>友情合作</li>\n    <li>诚聘英才</li>\n    <li>官方网站</li>\n    <li>意见反馈</li>\n  </ul>\n  <span class=\"line-black\"></span>\n  <span class=\"line-white\"></span>\n  <p>\n    Copyright 2016. All right reserved www.zjzx.cn\n  </p>\n  <p>\n    版权所有：北京中教在线科技有限公司 \n  </p>\n</div>\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/footer-bc.png?0f65e329e8";

/***/ },
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _presenceMain = __webpack_require__(28);

	var _presenceMain2 = _interopRequireDefault(_presenceMain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-new */
	var V = new Vue({
	  el: 'body',
	  components: { main: _presenceMain2.default }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(29)
	__vue_script__ = __webpack_require__(32)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\master\\presence-main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(33)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./presence-main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./presence-main.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./presence-main.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,\nfieldset, legend, button, input, textarea, th, td {\n  margin: 0;\n  padding: 0;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\nbody, button, input, select, textarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-size: 100%; }\n\naddress, cite, dfn, em, var {\n  font-style: normal; }\n\ncode, kbd, pre, samp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul, ol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset, img {\n  border: 0; }\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px; }\n\n::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  background: #999999; }\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2); }\n\n::-webkit-scrollbar-thumb:hover {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.4); }\n\n@font-face {\n  font-family: 'iconfont';\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.svg#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\";\n  font-size: 14px;\n  font-style: normal; }\n\n.size-12 {\n  font-size: 12px; }\n\n.size-14 {\n  font-size: 14px; }\n\n.size-16 {\n  font-size: 16px; }\n\n.size-18 {\n  font-size: 18px; }\n\n.cusor_hand {\n  cursor: pointer; }\n\n.overflow_pre {\n  overflow: hidden;\n  white-space: pre;\n  text-overflow: ellipsis; }\n\n.clear:after {\n  display: block;\n  content: '';\n  clear: both; }\n\nbody {\n  background-image: url(" + __webpack_require__(7) + "); }\n\n.master-content {\n  width: 1200px;\n  margin: 0 auto; }\n  .master-content > h4 {\n    height: 70px;\n    color: #161616;\n    font-size: 13px;\n    font-weight: 400;\n    line-height: 70px; }\n  .master-content .master-list {\n    width: 100%; }\n    .master-content .master-list > li {\n      display: block;\n      width: 100%; }\n      .master-content .master-list > li > h2 {\n        color: #ffffff;\n        display: inline-block;\n        background-image: url(" + __webpack_require__(31) + ");\n        background-size: cover;\n        padding: 0 10px;\n        height: 40px;\n        line-height: 40px;\n        text-align: center; }\n      .master-content .master-list > li > ul {\n        font-size: 0px; }\n        .master-content .master-list > li > ul > li {\n          height: 320px;\n          width: 20%;\n          display: inline-block; }\n          .master-content .master-list > li > ul > li > a {\n            cursor: pointer;\n            display: block;\n            height: 100%;\n            width: 100%;\n            text-decoration: none; }\n            .master-content .master-list > li > ul > li > a > figure {\n              padding-top: 45px;\n              margin: 0; }\n              .master-content .master-list > li > ul > li > a > figure > img {\n                box-sizing: border-box;\n                height: 190px;\n                width: 190px;\n                display: block;\n                border-radius: 50%;\n                margin: 0  auto;\n                margin-bottom: 20px;\n                -webkit-transition: all 0.3s ease-in;\n                transition: all 0.3s ease-in; }\n                .master-content .master-list > li > ul > li > a > figure > img:hover {\n                  border: 4px solid #35f8ed; }\n              .master-content .master-list > li > ul > li > a > figure > h5 {\n                font-weight: 400;\n                color: #161616;\n                font-size: 14px;\n                text-align: center;\n                -webkit-transition: all 0.3s ease-in;\n                transition: all 0.3s ease-in; }\n              .master-content .master-list > li > ul > li > a > figure > p {\n                line-height: 30px;\n                color: #161616;\n                font-size: 14px;\n                text-align: center;\n                -webkit-transition: all 0.3s ease-in;\n                transition: all 0.3s ease-in; }\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/master-bc.png?896c7b197a";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _header = __webpack_require__(10);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(19);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <header>
	//     <common-header></common-header>
	//   </header>
	//   <article class="master-content">
	//     <h4>当前位置:大师风采</h4>
	//      <ul class="master-list ">
	//         <li v-for="item in items.region">
	//           <h2>{{item.title}}玉石雕刻大师</h2>
	//           <ul>
	//             <li v-for="ite in item.children">
	//               <a href={{ite.href}}>
	//                 <figure>
	//                   <img src={{ite.src}} alt="arcter" />
	//                   <h5>{{ite.name}}</h5>
	//                   <p>
	//                     {{ite.sex}}&nbsp;{{ite.age}}年出生&nbsp;{{ite.area}}人
	//                   </p>
	//                 </figure>
	//               </a>
	//             </li>
	//           </ul>
	//         </li>
	//      </ul>
	//   </article>
	//   <footer>
	//       <common-footer></common-footer>
	//   </footer>
	// </template>
	// <script>
	exports.default = {
	  //数据层
	  data: function data() {
	    return {
	      // 静态页面，整体数据层
	      items: {
	        region: [{
	          title: "河南",
	          children: [{
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }]
	        }, {
	          title: "河南",
	          children: [{
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }]
	        }, {
	          title: "河南",
	          children: [{
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }, {
	            src: "../../assets/images/master/master-arcter.png",
	            href: 'http://localhost:3000/views/masterInf/informatin.html',
	            name: '王俊毅',
	            sex: '男',
	            age: '1975',
	            area: '桂林'
	          }]
	        }]
	      }
	    };
	  },

	  components: {
	    'common-header': _header2.default,
	    'common-footer': _footer2.default
	  },
	  ready: function ready() {}
	};
	// </script>
	// <style  rel="stylesheet/scss" lang="sass">
	//     @import "../../sass/config";
	//     @import "../../sass/master/presence-main";
	// </style>

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n  <common-header></common-header>\n</header>\n<article class=\"master-content\">\n  <h4>当前位置:大师风采</h4>\n   <ul class=\"master-list \">\n      <li v-for=\"item in items.region\">\n        <h2>{{item.title}}玉石雕刻大师</h2>\n        <ul>\n          <li v-for=\"ite in item.children\">\n            <a href={{ite.href}}>\n              <figure>\n                <img src={{ite.src}} alt=\"arcter\" />\n                <h5>{{ite.name}}</h5>\n                <p>\n                  {{ite.sex}}&nbsp;{{ite.age}}年出生&nbsp;{{ite.area}}人\n                </p>\n              </figure>\n            </a>\n          </li>\n        </ul>\n      </li>\n   </ul>\n</article>\n<footer>\n    <common-footer></common-footer>\n</footer>\n";

/***/ }
/******/ ]);