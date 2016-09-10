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
/* 7 */,
/* 8 */,
/* 9 */
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _playerMain = __webpack_require__(28);

	var _playerMain2 = _interopRequireDefault(_playerMain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-new */
	var V = new Vue({
	  el: 'body',
	  components: { main: _playerMain2.default }
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
	  console.warn("[vue-loader] src\\components\\videoplayer\\player-main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(43)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./player-main.vue"
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
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-main.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-main.vue");
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
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,\nfieldset, legend, button, input, textarea, th, td {\n  margin: 0;\n  padding: 0;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\nbody, button, input, select, textarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-size: 100%; }\n\naddress, cite, dfn, em, var {\n  font-style: normal; }\n\ncode, kbd, pre, samp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul, ol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset, img {\n  border: 0; }\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px; }\n\n::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  background: #999999; }\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2); }\n\n::-webkit-scrollbar-thumb:hover {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.4); }\n\n@font-face {\n  font-family: 'iconfont';\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.svg#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\";\n  font-size: 14px;\n  font-style: normal; }\n\n.size-12 {\n  font-size: 12px; }\n\n.size-14 {\n  font-size: 14px; }\n\n.size-16 {\n  font-size: 16px; }\n\n.size-18 {\n  font-size: 18px; }\n\n.cusor_hand {\n  cursor: pointer; }\n\n.overflow_pre {\n  overflow: hidden;\n  white-space: pre;\n  text-overflow: ellipsis; }\n\n.clear:after {\n  display: block;\n  content: '';\n  clear: both; }\n\nhtml, body {\n  height: 100%;\n  min-width: 750px; }\n\nheader {\n  height: 45px;\n  padding: 0 30px;\n  background-image: url(" + __webpack_require__(31) + "); }\n  header ul {\n    height: 45px;\n    line-height: 45px;\n    font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n    font-size: 12px; }\n    header ul > button {\n      font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n      height: 33px;\n      line-height: 33px;\n      margin-top: 6px;\n      padding: 0 15px;\n      box-sizing: border-box;\n      border: 1px solid #e7e6e6;\n      background-color: white;\n      color: #980100;\n      -webkit-transition: all 0.2s ease-in;\n      transition: all 0.2s ease-in; }\n      header ul > button:hover {\n        background-color: #e43a3d;\n        color: #ffffff; }\n    header ul > li {\n      color: #1f1f1f; }\n      header ul > li .iconfont {\n        color: #e43a3d;\n        font-size: 12px;\n        margin-right: 3px; }\n    header ul > .alltime {\n      max-width: 300px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: pre; }\n    header ul > .functions {\n      position: relative;\n      padding-right: 13px; }\n      header ul > .functions:hover span {\n        -webkit-transform: rotate(180deg);\n                transform: rotate(180deg); }\n      header ul > .functions > span {\n        height: 0;\n        width: 0;\n        border: 5px solid transparent;\n        border-bottom-color: #333333;\n        display: block;\n        position: absolute;\n        right: 0;\n        top: 15px;\n        -webkit-transition: all 0.3s ease-in;\n        transition: all 0.3s ease-in;\n        -webkit-transform-origin: 50% 7.5px;\n                transform-origin: 50% 7.5px; }\n      header ul > .functions > button {\n        background-color: transparent;\n        border: none; }\n        header ul > .functions > button:hover {\n          color: #e43a3d; }\n  header .header_left {\n    float: left;\n    margin-right: 40px; }\n  header .header_right {\n    float: right;\n    margin-left: 40px; }\n\narticle {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-flex-direction: row;\n  height: calc(100% - 45px);\n  width: 100%; }\n  article .article_left {\n    width: 100%;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    -webkit-flex-shrink: 1;\n    height: 100%;\n    overflow: hidden; }\n    article .article_left > .nav_bottom {\n      background-color: #202020;\n      padding: 8px 25px;\n      box-sizing: border-box;\n      height: 35px;\n      color: #cacaca; }\n      article .article_left > .nav_bottom .download {\n        -webkit-transition: all 0.2s ease-in;\n        transition: all 0.2s ease-in; }\n        article .article_left > .nav_bottom .download:hover {\n          color: #ffffff; }\n      article .article_left > .nav_bottom .playtime {\n        float: right;\n        padding: 0 15px; }\n        article .article_left > .nav_bottom .playtime:after {\n          content: '';\n          display: block;\n          height: 16px;\n          width: 1px;\n          background-color: #363636;\n          float: right;\n          margin-right: -15px; }\n      article .article_left > .nav_bottom .studypeople {\n        float: right;\n        padding: 0 15px; }\n  article .article_right {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    -webkit-flex-shrink: 0;\n    width: 0px;\n    height: 100%;\n    -webkit-transition: all 0.3s ease-in;\n    transition: all 0.3s ease-in; }\n  article > .checked {\n    width: 340px; }\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/video-header-bc.png?ae8035f56f";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _playerLeftvideo = __webpack_require__(33);

	var _playerLeftvideo2 = _interopRequireDefault(_playerLeftvideo);

	var _playerRightselect = __webpack_require__(38);

	var _playerRightselect2 = _interopRequireDefault(_playerRightselect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template id="app">
	//   <!-- 头部导航栏 -->
	//  <header>
	//   <!-- 列表功能项 -->
	//     <ul>
	//       <!-- 返回按钮 -->
	//       <button type="button"  class="header_left size-14 cusor_hand"> < 返回</button>
	//       <li class="header_left size-14">正在播放：{{headerTitle}}</li>
	//       <li class="header_left alltime">总时长：{{headerAllTime}}分钟</li>
	//       <li class="header_left">已学时长：{{headerHaveTime}}分钟</li>
	//       <li class="header_right functions">Hi，hjj黄姣姣 <button type="button" class="cusor_hand">【退出】</button><span></span></li>
	//       <li class="header_right cusor_hand"><i class="iconfont">&#xe601</i>消息({{headerMessage}})</li>
	//     </ul>
	//  </header>
	//  <article>
	//    <!-- 左部视屏播放区域 -->
	//    <section class="article_left">
	//       <video-Player></video-player>
	//         <nav class="nav_bottom size-12">
	//           <i class="iconfont">&#xe602</i>
	//           <span class="download cusor_hand">下载手机app</span>
	//           <span class="studypeople">•学习人数209人</span>
	//           <span class="playtime">203次播放</span>
	//         </nav>
	//    </section>
	//    <!-- 右部列表区域 -->
	//    <section class="article_right" v-bind:class={'checked':rightShow}>
	//       <select-list></select-list>
	//    </section>
	//  </article>
	// </template>
	//
	// <script>
	//导入videoplayer组件
	exports.default = {
	  components: {
	    'video-player': _playerLeftvideo2.default,
	    'select-list': _playerRightselect2.default
	  },
	  //数据渲染区
	  data: function data() {
	    return {
	      //右侧功能栏是否显示
	      rightShow: true,
	      //*****顶部数据区域
	      headerTitle: '80,90后员工职业技能素养提升', //标题
	      headerAllTime: 54, //总时长
	      headerHaveTime: 28, //已用时长
	      headerMessage: 3 //消息数量
	    };
	  },

	  //自定义事件
	  events: {
	    'right_show': function right_show() {
	      this.rightShow == true ? this.rightShow = false : this.rightShow = true;
	    },
	    'changevideo': function changevideo(data) {
	      this.$broadcast('changesrc', data);
	    }
	  }
	};
	// </script>
	//
	// <style rel="stylesheet/scss" lang='sass'>
	//  @import "../../sass/videoPlayer/player-main.scss";
	// </style>

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(34)
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\videoPlayer\\player-leftvideo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(37)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./player-leftvideo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-leftvideo.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-leftvideo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,\nfieldset, legend, button, input, textarea, th, td {\n  margin: 0;\n  padding: 0;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\nbody, button, input, select, textarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-size: 100%; }\n\naddress, cite, dfn, em, var {\n  font-style: normal; }\n\ncode, kbd, pre, samp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul, ol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset, img {\n  border: 0; }\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px; }\n\n::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  background: #999999; }\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2); }\n\n::-webkit-scrollbar-thumb:hover {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.4); }\n\n@font-face {\n  font-family: 'iconfont';\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.svg#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\";\n  font-size: 14px;\n  font-style: normal; }\n\n.size-12 {\n  font-size: 12px; }\n\n.size-14 {\n  font-size: 14px; }\n\n.size-16 {\n  font-size: 16px; }\n\n.size-18 {\n  font-size: 18px; }\n\n.cusor_hand {\n  cursor: pointer; }\n\n.overflow_pre {\n  overflow: hidden;\n  white-space: pre;\n  text-overflow: ellipsis; }\n\n.clear:after {\n  display: block;\n  content: '';\n  clear: both; }\n\n.videoPlayer {\n  height: calc(100% - 35px);\n  width: 100%; }\n  .videoPlayer #video {\n    width: 100%;\n    height: 100%; }\n", ""]);

	// exports


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="videoPlayer">
	//     <video src="" controls="" preload="auto" poster="../../assets/images/videoplayer/video-content-poster.jpg" id="video" class="video-js vjs-default-skin vjs-big-play-centered">
	//
	//     </video>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  /****
	  页面数据部分
	  ****/
	  data: function data() {
	    return {
	      //******视屏播放对象
	      videoObj: null,
	      //*****视屏播放数据对象
	      videoData: [{
	        src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	        type: 'application/x-mpegURL',
	        label: '标清',
	        res: 360
	      }, {
	        src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	        type: 'application/x-mpegURL',
	        label: '高清',
	        res: 720
	      }, {
	        src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	        type: 'application/x-mpegURL',
	        label: '超清',
	        res: 1080
	      }]
	    };
	  },

	  /***
	  方法函数
	  ***/
	  methods: {
	    //******视屏重载方法
	    videoReload: function videoReload(videoObj, data, videoDom) {
	      videoObj = videojs(videoDom, {
	        controls: true,
	        plugins: {
	          videoJsResolutionSwitcher: {
	            default: 'low',
	            dynamicLabel: true
	          }
	        }
	      }, function () {
	        var player = this;
	        window.player = player;
	        /*此处放置视屏数据，格式为数组，下面有被注释的示例*/
	        player.updateSrc(data);
	        player.on('resolutionchange', function () {
	          console.info('Source changed to %s', player.src());
	        });
	      });
	    }
	  },
	  /****
	  初始化部分
	  ***/
	  ready: function ready() {
	    this.videoReload(this.videoObj, this.videoData, 'video');
	  },

	  /****
	  自定义事件
	  ****/
	  events: {
	    //通过父组件的中间传递，获取另一个子组件的数据
	    'changesrc': function changesrc(data) {
	      // this.videoObj.dispose();
	      this.videoReload(this.videoObj, data, 'video');
	    }
	  }
	};
	// </script>
	//
	// <!-- Add "scoped" attribute to limit CSS to this component only -->
	// <style rel="stylesheet/scss" lang='sass'>
	// @import "../../sass/config";
	// .videoPlayer{
	//   height: calc(100% - 35px);
	//   width: 100%;
	//   #video{
	//     width: 100%;
	//     height: 100%;
	//   }
	// }
	// </style>

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"videoPlayer\">\n  <video src=\"\" controls=\"\" preload=\"auto\" poster=\"../../assets/images/videoplayer/video-content-poster.jpg\" id=\"video\" class=\"video-js vjs-default-skin vjs-big-play-centered\">\n\n  </video>\n</div>\n";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(39)
	__vue_script__ = __webpack_require__(41)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\videoPlayer\\player-rightselect.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(42)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./player-rightselect.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-rightselect.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./player-rightselect.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,\nfieldset, legend, button, input, textarea, th, td {\n  margin: 0;\n  padding: 0;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\nbody, button, input, select, textarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-size: 100%; }\n\naddress, cite, dfn, em, var {\n  font-style: normal; }\n\ncode, kbd, pre, samp {\n  font-family: couriernew, courier, monospace; }\n\nsmall {\n  font-size: 12px; }\n\nul, ol {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\na:hover {\n  text-decoration: underline; }\n\nsup {\n  vertical-align: text-top; }\n\nsub {\n  vertical-align: text-bottom; }\n\nlegend {\n  color: #000; }\n\nfieldset, img {\n  border: 0; }\n\nbutton, input, select, textarea {\n  font-size: 100%;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px; }\n\n::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  background: #999999; }\n\n::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.2); }\n\n::-webkit-scrollbar-thumb:hover {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.4); }\n\n@font-face {\n  font-family: 'iconfont';\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_1473494056_6048825.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_1473494056_6048825.svg#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\";\n  font-size: 14px;\n  font-style: normal; }\n\n.size-12 {\n  font-size: 12px; }\n\n.size-14 {\n  font-size: 14px; }\n\n.size-16 {\n  font-size: 16px; }\n\n.size-18 {\n  font-size: 18px; }\n\n.cusor_hand {\n  cursor: pointer; }\n\n.overflow_pre {\n  overflow: hidden;\n  white-space: pre;\n  text-overflow: ellipsis; }\n\n.clear:after {\n  display: block;\n  content: '';\n  clear: both; }\n\n.selectList {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1'; }\n  .selectList .nav_left {\n    position: absolute;\n    z-index: 999;\n    width: 53px;\n    height: 100%;\n    top: 0;\n    left: -54px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-display: flex;\n    -webkit-flex-direction: column;\n    position: absolute;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .selectList .nav_left > li {\n      color: #ffffff;\n      background-color: #292f33;\n      width: 54px;\n      height: 64px;\n      padding: 12px;\n      box-sizing: border-box;\n      line-height: 20px;\n      font-size: 14px;\n      margin-bottom: 8px;\n      -webkit-transition: all 0.2s ease-in;\n      transition: all 0.2s ease-in; }\n      .selectList .nav_left > li:hover {\n        background-color: #e43a3d; }\n    .selectList .nav_left > .select {\n      background-color: #e43a3d; }\n  .selectList .nav_right {\n    position: relative;\n    height: 100%;\n    width: 100%;\n    background-color: #161a1d;\n    overflow: hidden; }\n    .selectList .nav_right > li {\n      box-sizing: border-box;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      -webkit-transition: all 0.2s ease-in;\n      transition: all 0.2s ease-in; }\n    .selectList .nav_right > .isshow {\n      opacity: 1;\n      z-index: 999; }\n    .selectList .nav_right .courseList {\n      padding-top: 25px;\n      color: #b5b5b5; }\n      .selectList .nav_right .courseList > h1 {\n        font-size: 16px;\n        padding: 0 20px;\n        border-top: 1px solid #333739;\n        height: 60px;\n        line-height: 60px; }\n      .selectList .nav_right .courseList > ul {\n        padding: 0 20px;\n        height: calc(100% - 86px);\n        overflow-y: auto;\n        box-sizing: border-box; }\n        .selectList .nav_right .courseList > ul > li > h2 {\n          height: 30px;\n          line-height: 30px;\n          margin-bottom: 10px;\n          font-weight: 400; }\n        .selectList .nav_right .courseList > ul > li > ul {\n          padding: 0 15px; }\n          .selectList .nav_right .courseList > ul > li > ul > li {\n            height: 15px;\n            line-height: 15px;\n            margin: 25px 0;\n            -webkit-transition: all 0.2s ease-in;\n            transition: all 0.2s ease-in; }\n            .selectList .nav_right .courseList > ul > li > ul > li:hover {\n              color: #187fee; }\n            .selectList .nav_right .courseList > ul > li > ul > li:hover .iconfont {\n              color: #187fee; }\n            .selectList .nav_right .courseList > ul > li > ul > li .iconfont {\n              font-size: 14px; }\n          .selectList .nav_right .courseList > ul > li > ul > .select {\n            color: #187fee; }\n            .selectList .nav_right .courseList > ul > li > ul > .select .iconfont {\n              color: #187fee; }\n    .selectList .nav_right .myNote {\n      color: #b5b5b5;\n      padding-top: 25px; }\n      .selectList .nav_right .myNote > .input-area {\n        padding: 40px 25px;\n        box-sizing: border-box;\n        border-top: 1px solid #798388;\n        border-bottom: 1px solid #333739; }\n        .selectList .nav_right .myNote > .input-area > textarea {\n          font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n          height: 70px;\n          width: 100%;\n          padding: 5px;\n          box-sizing: border-box;\n          display: block;\n          margin-bottom: 12px;\n          resize: none; }\n        .selectList .nav_right .myNote > .input-area > input {\n          height: 15px;\n          width: 15px;\n          border-radius: 0;\n          margin-right: 5px;\n          float: left; }\n        .selectList .nav_right .myNote > .input-area > i {\n          display: block;\n          height: 15px;\n          line-height: 15px;\n          font-style: normal;\n          float: left; }\n        .selectList .nav_right .myNote > .input-area > button {\n          font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n          height: 20px;\n          width: 55px;\n          text-align: center;\n          line-height: 20px;\n          background-color: #e43a3d;\n          color: #ffffff;\n          border-radius: 0;\n          border: 0;\n          float: right; }\n      .selectList .nav_right .myNote > .list-area {\n        height: calc(100% - 184px); }\n        .selectList .nav_right .myNote > .list-area > .table-list {\n          height: 50px;\n          margin: 0 25px;\n          border-bottom: 1px solid #65737e;\n          font-size: 0; }\n          .selectList .nav_right .myNote > .list-area > .table-list > li {\n            height: 50px;\n            line-height: 50px;\n            text-align: center;\n            width: 80px;\n            display: inline-block;\n            -webkit-transition: color 0.2s ease-in;\n            transition: color 0.2s ease-in; }\n            .selectList .nav_right .myNote > .list-area > .table-list > li:hover {\n              color: #ffffff; }\n          .selectList .nav_right .myNote > .list-area > .table-list > .select {\n            border-bottom: 1px solid #e43a3d;\n            position: relative;\n            color: #ffffff; }\n            .selectList .nav_right .myNote > .list-area > .table-list > .select:after {\n              width: 0;\n              height: 0;\n              display: block;\n              content: '';\n              border: 4px solid #161a1d;\n              border-bottom-color: #e43a3d;\n              position: absolute;\n              bottom: 0;\n              left: 38px; }\n        .selectList .nav_right .myNote > .list-area > .note-list {\n          height: calc(100% - 51px);\n          position: relative; }\n          .selectList .nav_right .myNote > .list-area > .note-list > li {\n            height: 100%;\n            box-sizing: border-box;\n            overflow-y: auto;\n            position: absolute;\n            top: 0;\n            left: 0;\n            opacity: 0;\n            -webkit-transition: all 0.3s ease-in;\n            transition: all 0.3s ease-in; }\n            .selectList .nav_right .myNote > .list-area > .note-list > li > ul > li {\n              padding: 22px 25px 16px 25px;\n              border-bottom: 1px dashed #909090; }\n              .selectList .nav_right .myNote > .list-area > .note-list > li > ul > li > img {\n                height: 35px;\n                width: 35px;\n                float: left;\n                border-radius: 50%;\n                display: block;\n                margin-right: 10px; }\n              .selectList .nav_right .myNote > .list-area > .note-list > li > ul > li > h5 {\n                float: left;\n                height: 35px;\n                line-height: 35px;\n                width: calc(100% - 45px);\n                color: #8498a8;\n                font-weight: 400; }\n              .selectList .nav_right .myNote > .list-area > .note-list > li > ul > li > p {\n                line-height: 25px;\n                margin: 5px 0;\n                float: left;\n                display: block;\n                width: 100%; }\n              .selectList .nav_right .myNote > .list-area > .note-list > li > ul > li > span {\n                float: left; }\n          .selectList .nav_right .myNote > .list-area > .note-list > .select {\n            opacity: 1;\n            z-index: 999; }\n    .selectList .nav_right .myAnswer {\n      color: #b5b5b5;\n      padding-top: 25px; }\n      .selectList .nav_right .myAnswer > .input-area {\n        padding: 40px 25px;\n        box-sizing: border-box;\n        border-top: 1px solid #798388;\n        border-bottom: 1px solid #333739; }\n        .selectList .nav_right .myAnswer > .input-area > textarea {\n          font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n          height: 70px;\n          width: 100%;\n          padding: 5px;\n          box-sizing: border-box;\n          display: block;\n          margin-bottom: 12px;\n          resize: none; }\n        .selectList .nav_right .myAnswer > .input-area > span {\n          font-size: 12px;\n          float: left; }\n        .selectList .nav_right .myAnswer > .input-area > button {\n          font-family: '\\5FAE\\8F6F\\96C5\\9ED1';\n          height: 20px;\n          width: 55px;\n          text-align: center;\n          line-height: 20px;\n          background-color: #e43a3d;\n          color: #ffffff;\n          border-radius: 0;\n          border: 0;\n          float: right; }\n      .selectList .nav_right .myAnswer > .list-area {\n        height: calc(100% - 184px); }\n        .selectList .nav_right .myAnswer > .list-area > .table-list {\n          height: 50px;\n          margin: 0 25px;\n          border-bottom: 1px solid #65737e;\n          font-size: 0; }\n          .selectList .nav_right .myAnswer > .list-area > .table-list > li {\n            height: 50px;\n            line-height: 50px;\n            text-align: center;\n            width: 80px;\n            display: inline-block;\n            -webkit-transition: color 0.2s ease-in;\n            transition: color 0.2s ease-in; }\n            .selectList .nav_right .myAnswer > .list-area > .table-list > li:hover {\n              color: #ffffff; }\n          .selectList .nav_right .myAnswer > .list-area > .table-list > .select {\n            border-bottom: 1px solid #e43a3d;\n            position: relative;\n            color: #ffffff; }\n            .selectList .nav_right .myAnswer > .list-area > .table-list > .select:after {\n              width: 0;\n              height: 0;\n              display: block;\n              content: '';\n              border: 4px solid #161a1d;\n              border-bottom-color: #e43a3d;\n              position: absolute;\n              bottom: 0;\n              left: 38px; }\n        .selectList .nav_right .myAnswer > .list-area > .aq-list {\n          height: calc(100% - 51px);\n          position: relative; }\n          .selectList .nav_right .myAnswer > .list-area > .aq-list > li {\n            height: 100%;\n            box-sizing: border-box;\n            overflow-y: auto;\n            position: absolute;\n            top: 0;\n            left: 0;\n            opacity: 0;\n            -webkit-transition: all 0.3s ease-in;\n            transition: all 0.3s ease-in; }\n            .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li {\n              padding: 22px 25px 16px 25px;\n              border-bottom: 1px dashed #909090; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > img {\n                height: 35px;\n                width: 35px;\n                float: left;\n                border-radius: 50%;\n                display: block;\n                margin-right: 10px; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > h5 {\n                float: left;\n                height: 35px;\n                line-height: 35px;\n                width: calc(100% - 45px);\n                color: #8498a8;\n                font-weight: 400; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > p {\n                line-height: 25px;\n                margin: 5px 0;\n                float: left;\n                display: block;\n                width: 100%; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > span {\n                float: left; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > button {\n                float: right;\n                background-color: transparent;\n                border: none;\n                color: #b5b5b5;\n                -webkit-transition: all 0.2s ease-in;\n                transition: all 0.2s ease-in; }\n                .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > button:hover {\n                  color: #ffffff; }\n              .selectList .nav_right .myAnswer > .list-area > .aq-list > li > ul > li > i {\n                float: right;\n                margin-right: 5px; }\n          .selectList .nav_right .myAnswer > .list-area > .aq-list > .select {\n            opacity: 1;\n            z-index: 999; }\n\n.vjs-has-started .vjs-control-bar {\n  z-index: 1000; }\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="selectList">
	//     <!-- 左侧选择按钮 -->
	//     <ul class="nav_left size-14">
	//         <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.course.value} v-on:click='rightCheck(tabelcheck.leftcheck.course)'>课程目录</li>
	//         <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.note.value} v-on:click='rightCheck(tabelcheck.leftcheck.note)'>我的笔记</li>
	//         <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.answer.value} v-on:click='rightCheck(tabelcheck.leftcheck.answer)' >我的问答</li>
	//     </ul>
	//     <!-- 右侧主体部分 -->
	//      <ul class="nav_right">
	//        <!-- 课程目录 -->
	//        <li class="courseList" v-bind:class={'isshow':tabelcheck.leftcheck.course.value}>
	//          <!-- 课程标题 -->
	//          <h1 class="overflow_pre size-16">{{courseList.title}}</h1>
	//          <ul>
	//            <li v-for="item in courseList.childernone">
	//              <h2 class="overflow_pre size-14">第一课时&nbsp;&nbsp;{{item.title}}</h2>
	//              <ul>
	//                <li class="overflow_pre size-12 cusor_hand"  v-for="ite in item.childern"  v-bind:class={'select':ite.select}  v-on:click="videocheck(ite)"><i class="iconfont ">&#xe600</i>&nbsp;{{$index+1}}&nbsp;{{ite.title}}&nbsp;&nbsp;({{ite.alltime}})</li>
	//                <!-- <li class="overflow_pre size-12 cusor_hand"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li>
	//                <li class="overflow_pre size-12 cusor_hand"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li> -->
	//              </ul>
	//            </li>
	//          </ul>
	//        </li>
	//        <!-- 我的笔记 -->
	//        <li class="myNote" v-bind:class={'isshow':tabelcheck.leftcheck.note.value}>
	//          <!-- 输入框区域 -->
	//          <div class="input-area clear">
	//             <textarea  placeholder="请输入你的笔记内容..." class="size-12" v-model="noteInput.text"></textarea>
	//             <input type="checkbox" value="" v-model="noteInput.secret"><i class="size-14">私密</i>
	//             <button type="button" class="size-14 cusor_hand" v-on:click="publishGet(noteInput.text,noteInput.secret)">发布</button>
	//          </div>
	//          <!-- 笔记列表 -->
	//          <div class="list-area">
	//             <ul class="table-list">
	//               <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.notecheck.allnote.value} v-on:click="noteCheck(tabelcheck.notecheck.allnote)">全部笔记</li>
	//               <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.notecheck.mynote.value} v-on:click="noteCheck(tabelcheck.notecheck.mynote)">我的笔记</li>
	//             </ul>
	//             <ul class="note-list">
	//               <!-- 全部笔记 -->
	//               <li class="allnote" v-bind:class={'select':tabelcheck.notecheck.allnote.value} >
	//                 <ul>
	//                   <li class="clear" v-for="item in noteData.allnote">
	//                     <img src={{item.img}} alt="img" />
	//                     <h5 class="size-14 overflow_pre">{{item.title}}</h5>
	//                     <p class="size-12">
	//                       {{item.text}}
	//                     </p>
	//                     <span class="time size-12">{{item.time}} </span>
	//                   </li>
	//                 </ul>
	//               </li>
	//               <!-- 我的笔记 -->
	//               <li class="mynote" v-bind:class={'select':tabelcheck.notecheck.mynote.value} >
	//                 <ul>
	//                   <li class="clear" v-for="item in noteData.mynote">
	//                     <img src={{item.img}} alt="img" />
	//                     <h5 class="size-14 overflow_pre">{{item.title}}</h5>
	//                     <p class="size-12">
	//                       {{item.text}}
	//                     </p>
	//                     <span class="time size-12">{{item.time}} </span>
	//                   </li>
	//                 </ul>
	//               </li>
	//             </ul>
	//          </div>
	//        </li>
	//        <!-- 我的问答 -->
	//        <li class="myAnswer" v-bind:class={'isshow':tabelcheck.leftcheck.answer.value}>
	//          <!-- 问题输入框区域 -->
	//          <div class="input-area clear">
	//             <textarea  placeholder="请输入你的提问内容..." class="size-12" v-model="answerInput"></textarea>
	//             <span>最多可以输入100字</span>
	//             <button type="button" class="size-14 cusor_hand" v-on:click="publishanswer(answerInput)">发布</button>
	//          </div>
	//          <!-- 问答列表 -->
	//          <div class="list-area">
	//             <ul class="table-list">
	//               <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.answercheck.allanswer.value} v-on:click="answerCheck(tabelcheck.answercheck.allanswer)">全部问答</li>
	//               <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.answercheck.myanswer.value} v-on:click="answerCheck(tabelcheck.answercheck.myanswer)">我的问答</li>
	//             </ul>
	//             <ul class="aq-list">
	//               <!-- 全部问答 -->
	//               <li class="allaq" v-bind:class={'select':tabelcheck.answercheck.allanswer.value}>
	//                 <ul>
	//                   <li class="clear" v-for="item in answerData.allanswer">
	//                     <img src={{item.img}} alt="img" />
	//                     <h5 class="size-14 overflow_pre">{{item.title}}</h5>
	//                     <p class="size-12">
	//                       {{item.text}}
	//                     </p>
	//                     <span class="time size-12">{{item.time}} </span>
	//                     <button type="button" class="size-12 cusor_hand">回复</button>
	//                     <i class="iconfont size-12">&#xe603</i>
	//                   </li>
	//                 </ul>
	//               </li>
	//               <!-- 我的问答 -->
	//               <li class="myaq" v-bind:class={'select':tabelcheck.answercheck.myanswer.value}>
	//                 <ul>
	//                   <li class="clear" v-for="item in answerData.myanswer">
	//                     <img src={{item.img}} alt="img" />
	//                     <h5 class="size-14 overflow_pre">{{item.title}}</h5>
	//                     <p class="size-12">
	//                       {{item.text}}
	//                     </p>
	//                     <span class="time size-12">{{item.time}} </span>
	//                     <button type="button" class="size-12 cusor_hand">回复</button>
	//                     <i class="iconfont size-12">&#xe603</i>
	//                   </li>
	//                 </ul>
	//               </li>
	//             </ul>
	//          </div>
	//        </li>
	//      </ul>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  // 数据区
	  data: function data() {
	    return {
	      charctar: {
	        imgsrc: '../../assets/images/videoplayer/video-content-charcter.png',
	        name: '寂寞星球的玫瑰'
	      },
	      /****
	      课程列表数据
	      ****/
	      courseList: {
	        title: '8090后员工管理方法',
	        //一级目录
	        childernone: [{
	          title: '名字不知道是啥王总告之',
	          childern: [{
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }]
	        }, {
	          title: '名字不知道是啥王总告之',
	          childern: [{
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }]
	        }, {
	          title: '名字不知道是啥王总告之',
	          childern: [{
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }]
	        }, {
	          title: '名字不知道是啥王总告之',
	          childern: [{
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }]
	        }, {
	          title: '名字不知道是啥王总告之',
	          childern: [{
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }, {
	            title: '8090后员工的管理方法',
	            alltime: 50.25,
	            videodata: [{
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
	              type: 'application/x-mpegURL',
	              label: '标清',
	              res: 360
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '高清',
	              res: 720
	            }, {
	              src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
	              type: 'application/x-mpegURL',
	              label: '超清',
	              res: 1080
	            }],
	            select: false
	          }]
	        }]
	      },
	      /****
	      我的笔记部分
	      ****/
	      //**********输入框
	      noteInput: {
	        text: '',
	        //是否是私密状态
	        secret: false
	      },
	      //*********数据部分
	      noteData: {
	        //所有笔记
	        allnote: [{
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '全部笔记',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '全部笔记',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }],
	        //我的笔记
	        mynote: [{
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '我的笔记',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }]
	      },
	      /****
	      我的问答部分
	      ****/
	      //**********输入框
	      answerInput: 'sdfas',
	      //********数据部分
	      answerData: {
	        //所有笔记
	        allanswer: [{
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }],
	        //我的笔记
	        myanswer: [{
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }, {
	          img: '../../assets/images/videoplayer/video-content-charcter.png',
	          title: '寂寞星球的玫瑰',
	          text: '好记性不如烂笔头所以多记笔记我也是凑字符的、哈哈哈哈哈？',
	          time: '2016-01-02 10:39'
	        }]
	      },
	      /***
	      页面元素切换数据
	      ***/
	      tabelcheck: {
	        // 课程目录，笔记和问答的切换
	        leftcheck: {
	          course: { value: false },
	          note: { value: true },
	          answer: { value: false }
	        },
	        // 我的笔记
	        notecheck: {
	          mynote: { value: false },
	          allnote: { value: true }
	        },
	        // 我的问答
	        answercheck: {
	          myanswer: { value: false },
	          allanswer: { value: true }
	        }
	      }

	    };
	  },

	  // 方法区
	  methods: {
	    /****
	    视屏切换功能
	    ****/
	    videocheck: function videocheck(item) {
	      //循环数组，清除所有的列表点击样式
	      var num = this.courseList.childernone;
	      for (var i = 0; i < num.length; i++) {
	        for (var j = 0; j < num[i].childern.length; j++) {
	          num[i].childern[j].select = false;
	        }
	      };
	      //将当前列表的显示样式设置为被点击状态
	      item.select = true;
	      //子组件冒泡事件，将视屏数据传送过去
	      this.$dispatch('changevideo', item.videodata);
	    },

	    /****
	    笔记和问答的切换
	    ****/
	    noteCheck: function noteCheck(item) {
	      if (!item.value) {
	        this.tabelcheck.notecheck.mynote.value = false;
	        this.tabelcheck.notecheck.allnote.value = false;
	        item.value = true;
	      }
	    },
	    answerCheck: function answerCheck(item) {
	      if (!item.value) {
	        this.tabelcheck.answercheck.myanswer.value = false;
	        this.tabelcheck.answercheck.allanswer.value = false;
	        item.value = true;
	      }
	    },

	    /****
	    发表提问和发表笔记
	    ****/
	    //笔记
	    publishGet: function publishGet(text, type) {
	      //清除空格
	      text = text.trim();
	      //当真是存在数据时
	      if (text) {
	        //发送后开始使用ajax
	        var newdata = {
	          img: this.charctar.imgsrc,
	          title: this.charctar.name,
	          text: this.noteInput.text,
	          time: this.getDate()
	        };
	        //当当前状态处于私密性质，下面可以使用ajax进行数据获取
	        if (type) {
	          this.noteData.mynote.unshift(newdata);
	        } else {
	          this.noteData.allnote.unshift(newdata);
	        };
	        //清空输入框内容
	        this.noteInput.text = '';
	      }
	    },

	    //提问
	    publishanswer: function publishanswer(text) {
	      //清除空格
	      text = text.trim();
	      //当真是存在数据时
	      if (text) {
	        //发送后开始使用ajax
	        var newdata = {
	          img: this.charctar.imgsrc,
	          title: this.charctar.name,
	          text: this.answerInput,
	          time: this.getDate()
	        };
	        this.answerData.allanswer.unshift(newdata);
	        this.answerData.myanswer.unshift(newdata);
	        this.answerInput = '';
	      }
	    },

	    //时间格式化函数
	    getDate: function getDate() {
	      var date = new Date();
	      var year = date.getFullYear();
	      var month = date.getMonth() + 1;
	      var day = date.getDate();
	      var hours = date.getHours();
	      var minutes = date.getMinutes();
	      return year + '-' + month + '-' + day + '  ' + hours + ':' + minutes;
	    },

	    /****
	    右侧显示区域的切换
	    *****/
	    rightCheck: function rightCheck(item) {
	      //假设处于显示状态，就清除他的显示，否则先去除其他的显示，再将其显示
	      if (item.value == true) {
	        item.value = false;
	        //自定义事件，通知子组件改变状态
	        this.$dispatch('right_show');
	      } else {
	        //所有的数据先设置为不显示
	        var result = 0;
	        //如果所有的按钮都处于未被点击状态，那么
	        for (var i in this.tabelcheck.leftcheck) {
	          if (this.tabelcheck.leftcheck[i].value == false) {
	            result++;
	          }
	        };
	        if (result == 3) {
	          this.$dispatch('right_show');
	          item.value = true;
	        } else {
	          for (var i in this.tabelcheck.leftcheck) {
	            this.tabelcheck.leftcheck[i].value = false;
	          };
	          item.value = true;
	        }
	      }
	    }
	  }
	};
	// </script>
	//
	// <!-- Add "scoped" attribute to limit CSS to this component only -->
	// <style rel="stylesheet/scss" lang='sass'>
	//  @import "../../sass/videoplayer/player-rightselect";
	//    .vjs-has-started .vjs-control-bar{
	//      z-index:1000
	//    }
	// </style>

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"selectList\">\n  <!-- 左侧选择按钮 -->\n  <ul class=\"nav_left size-14\">\n      <li class=\"cusor_hand\" v-bind:class={'select':tabelcheck.leftcheck.course.value} v-on:click='rightCheck(tabelcheck.leftcheck.course)'>课程目录</li>\n      <li class=\"cusor_hand\" v-bind:class={'select':tabelcheck.leftcheck.note.value} v-on:click='rightCheck(tabelcheck.leftcheck.note)'>我的笔记</li>\n      <li class=\"cusor_hand\" v-bind:class={'select':tabelcheck.leftcheck.answer.value} v-on:click='rightCheck(tabelcheck.leftcheck.answer)' >我的问答</li>\n  </ul>\n  <!-- 右侧主体部分 -->\n   <ul class=\"nav_right\">\n     <!-- 课程目录 -->\n     <li class=\"courseList\" v-bind:class={'isshow':tabelcheck.leftcheck.course.value}>\n       <!-- 课程标题 -->\n       <h1 class=\"overflow_pre size-16\">{{courseList.title}}</h1>\n       <ul>\n         <li v-for=\"item in courseList.childernone\">\n           <h2 class=\"overflow_pre size-14\">第一课时&nbsp;&nbsp;{{item.title}}</h2>\n           <ul>\n             <li class=\"overflow_pre size-12 cusor_hand\"  v-for=\"ite in item.childern\"  v-bind:class={'select':ite.select}  v-on:click=\"videocheck(ite)\"><i class=\"iconfont \">&#xe600</i>&nbsp;{{$index+1}}&nbsp;{{ite.title}}&nbsp;&nbsp;({{ite.alltime}})</li>\n             <!-- <li class=\"overflow_pre size-12 cusor_hand\"><i class=\"iconfont \">&#xe600</i>8090后员工管理方法(50:25)</li>\n             <li class=\"overflow_pre size-12 cusor_hand\"><i class=\"iconfont \">&#xe600</i>8090后员工管理方法(50:25)</li> -->\n           </ul>\n         </li>\n       </ul>\n     </li>\n     <!-- 我的笔记 -->\n     <li class=\"myNote\" v-bind:class={'isshow':tabelcheck.leftcheck.note.value}>\n       <!-- 输入框区域 -->\n       <div class=\"input-area clear\">\n          <textarea  placeholder=\"请输入你的笔记内容...\" class=\"size-12\" v-model=\"noteInput.text\"></textarea>\n          <input type=\"checkbox\" value=\"\" v-model=\"noteInput.secret\"><i class=\"size-14\">私密</i>\n          <button type=\"button\" class=\"size-14 cusor_hand\" v-on:click=\"publishGet(noteInput.text,noteInput.secret)\">发布</button>\n       </div>\n       <!-- 笔记列表 -->\n       <div class=\"list-area\">\n          <ul class=\"table-list\">\n            <li class=\"cusor_hand size-14\" v-bind:class={'select':tabelcheck.notecheck.allnote.value} v-on:click=\"noteCheck(tabelcheck.notecheck.allnote)\">全部笔记</li>\n            <li class=\"cusor_hand size-14\" v-bind:class={'select':tabelcheck.notecheck.mynote.value} v-on:click=\"noteCheck(tabelcheck.notecheck.mynote)\">我的笔记</li>\n          </ul>\n          <ul class=\"note-list\">\n            <!-- 全部笔记 -->\n            <li class=\"allnote\" v-bind:class={'select':tabelcheck.notecheck.allnote.value} >\n              <ul>\n                <li class=\"clear\" v-for=\"item in noteData.allnote\">\n                  <img src={{item.img}} alt=\"img\" />\n                  <h5 class=\"size-14 overflow_pre\">{{item.title}}</h5>\n                  <p class=\"size-12\">\n                    {{item.text}}\n                  </p>\n                  <span class=\"time size-12\">{{item.time}} </span>\n                </li>\n              </ul>\n            </li>\n            <!-- 我的笔记 -->\n            <li class=\"mynote\" v-bind:class={'select':tabelcheck.notecheck.mynote.value} >\n              <ul>\n                <li class=\"clear\" v-for=\"item in noteData.mynote\">\n                  <img src={{item.img}} alt=\"img\" />\n                  <h5 class=\"size-14 overflow_pre\">{{item.title}}</h5>\n                  <p class=\"size-12\">\n                    {{item.text}}\n                  </p>\n                  <span class=\"time size-12\">{{item.time}} </span>\n                </li>\n              </ul>\n            </li>\n          </ul>\n       </div>\n     </li>\n     <!-- 我的问答 -->\n     <li class=\"myAnswer\" v-bind:class={'isshow':tabelcheck.leftcheck.answer.value}>\n       <!-- 问题输入框区域 -->\n       <div class=\"input-area clear\">\n          <textarea  placeholder=\"请输入你的提问内容...\" class=\"size-12\" v-model=\"answerInput\"></textarea>\n          <span>最多可以输入100字</span>\n          <button type=\"button\" class=\"size-14 cusor_hand\" v-on:click=\"publishanswer(answerInput)\">发布</button>\n       </div>\n       <!-- 问答列表 -->\n       <div class=\"list-area\">\n          <ul class=\"table-list\">\n            <li class=\"cusor_hand size-14\" v-bind:class={'select':tabelcheck.answercheck.allanswer.value} v-on:click=\"answerCheck(tabelcheck.answercheck.allanswer)\">全部问答</li>\n            <li class=\"cusor_hand size-14\" v-bind:class={'select':tabelcheck.answercheck.myanswer.value} v-on:click=\"answerCheck(tabelcheck.answercheck.myanswer)\">我的问答</li>\n          </ul>\n          <ul class=\"aq-list\">\n            <!-- 全部问答 -->\n            <li class=\"allaq\" v-bind:class={'select':tabelcheck.answercheck.allanswer.value}>\n              <ul>\n                <li class=\"clear\" v-for=\"item in answerData.allanswer\">\n                  <img src={{item.img}} alt=\"img\" />\n                  <h5 class=\"size-14 overflow_pre\">{{item.title}}</h5>\n                  <p class=\"size-12\">\n                    {{item.text}}\n                  </p>\n                  <span class=\"time size-12\">{{item.time}} </span>\n                  <button type=\"button\" class=\"size-12 cusor_hand\">回复</button>\n                  <i class=\"iconfont size-12\">&#xe603</i>\n                </li>\n              </ul>\n            </li>\n            <!-- 我的问答 -->\n            <li class=\"myaq\" v-bind:class={'select':tabelcheck.answercheck.myanswer.value}>\n              <ul>\n                <li class=\"clear\" v-for=\"item in answerData.myanswer\">\n                  <img src={{item.img}} alt=\"img\" />\n                  <h5 class=\"size-14 overflow_pre\">{{item.title}}</h5>\n                  <p class=\"size-12\">\n                    {{item.text}}\n                  </p>\n                  <span class=\"time size-12\">{{item.time}} </span>\n                  <button type=\"button\" class=\"size-12 cusor_hand\">回复</button>\n                  <i class=\"iconfont size-12\">&#xe603</i>\n                </li>\n              </ul>\n            </li>\n          </ul>\n       </div>\n     </li>\n   </ul>\n</div>\n";

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "\n <!-- 头部导航栏 -->\n<header>\n <!-- 列表功能项 -->\n   <ul>\n     <!-- 返回按钮 -->\n     <button type=\"button\"  class=\"header_left size-14 cusor_hand\"> < 返回</button>\n     <li class=\"header_left size-14\">正在播放：{{headerTitle}}</li>\n     <li class=\"header_left alltime\">总时长：{{headerAllTime}}分钟</li>\n     <li class=\"header_left\">已学时长：{{headerHaveTime}}分钟</li>\n     <li class=\"header_right functions\">Hi，hjj黄姣姣 <button type=\"button\" class=\"cusor_hand\">【退出】</button><span></span></li>\n     <li class=\"header_right cusor_hand\"><i class=\"iconfont\">&#xe601</i>消息({{headerMessage}})</li>\n   </ul>\n</header>\n<article>\n  <!-- 左部视屏播放区域 -->\n  <section class=\"article_left\">\n     <video-Player></video-player>\n       <nav class=\"nav_bottom size-12\">\n         <i class=\"iconfont\">&#xe602</i>\n         <span class=\"download cusor_hand\">下载手机app</span>\n         <span class=\"studypeople\">•学习人数209人</span>\n         <span class=\"playtime\">203次播放</span>\n       </nav>\n  </section>\n  <!-- 右部列表区域 -->\n  <section class=\"article_right\" v-bind:class={'checked':rightShow}>\n     <select-list></select-list>\n  </section>\n</article>\n";

/***/ }
/******/ ]);