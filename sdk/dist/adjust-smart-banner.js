(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AdjustSmartBanner"] = factory();
	else
		root["AdjustSmartBanner"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 250:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Sl: () => (/* binding */ image),
/* harmony export */   qf: () => (/* binding */ placeholder),
/* harmony export */   w4: () => (/* binding */ _1)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_app-icon__itGOV{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;min-width:56px;width:56px;height:56px;overflow:hidden;border-radius:8px}.small .adjust-sb_app-icon__itGOV{min-width:56px;width:56px;height:56px}.medium .adjust-sb_app-icon__itGOV{min-width:56px;width:56px;height:56px}.large .adjust-sb_app-icon__itGOV{min-width:64px;width:64px;height:64px}.adjust-sb_app-icon__itGOV .adjust-sb_placeholder__b7yZC{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#6e7492;font-weight:bold;font-size:23px;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;line-height:32px;background-color:#e0e2ec}.adjust-sb_app-icon__itGOV .adjust-sb_image__Fux1Q{width:100%}`, ""]);
// Exports
var _1 = `adjust-sb_app-icon__itGOV`;

var placeholder = `adjust-sb_placeholder__b7yZC`;
var image = `adjust-sb_image__Fux1Q`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 278:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 437:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBannerView = void 0;
var font_loader_1 = __webpack_require__(6374);
var data_types_1 = __webpack_require__(4153);
var banner_body_1 = __webpack_require__(7675);
var styles = __importStar(__webpack_require__(4189));
var SmartBannerView = /** @class */ (function () {
    function SmartBannerView(data, trackerUrl, impressionUrl, onDismiss) {
        this.data = data;
        this.placeholder = null;
        this.wrapper = null;
        this.root = document.createElement('div');
        this.bannerBody = new banner_body_1.BannerBody(data, onDismiss, trackerUrl, impressionUrl);
    }
    SmartBannerView.prototype.applyRootStyles = function (customParent) {
        var customParentStyle = customParent ? styles['custom-parent'] : '';
        var positionStyle = this.data.position === data_types_1.Position.Top ? styles.stickyToTop : styles.stickyToBottom;
        this.root.className = "".concat(styles.banner, " ").concat(customParentStyle, " ").concat(positionStyle, " ").concat(this.data.size);
    };
    SmartBannerView.prototype.createCustomParentWrapper = function () {
        this.wrapper = document.createElement('div');
        this.wrapper.className = styles['wrapper'];
    };
    SmartBannerView.prototype.createPlaceholder = function () {
        this.placeholder = document.createElement('div');
        this.placeholder.className = styles['banner-placeholder'];
    };
    SmartBannerView.prototype.attachBannerToParent = function (parent) {
        var attach = function (child, parent, position) {
            if (position === data_types_1.Position.Top) {
                parent.insertBefore(child, parent.firstChild);
            }
            else {
                parent.appendChild(child);
            }
        };
        if (this.placeholder) {
            attach(this.placeholder, parent, this.data.position);
        }
        if (this.wrapper) {
            attach(this.root, this.wrapper, this.data.position);
            attach(this.wrapper, parent, this.data.position);
        }
        else {
            attach(this.root, parent, this.data.position);
        }
    };
    SmartBannerView.prototype.render = function (parent) {
        if (parent === void 0) { parent = document.body; }
        this.parent = parent;
        var customParent = this.parent !== document.body;
        this.applyRootStyles(customParent);
        if (customParent) {
            this.createCustomParentWrapper();
        }
        if (!customParent && this.data.size === data_types_1.BannerSize.Small) {
            this.createPlaceholder(); // Trying to push the content
        }
        this.bannerBody.render(this.root);
        this.attachBannerToParent(this.parent);
    };
    SmartBannerView.prototype.update = function (banner, trackerUrl) {
        if (trackerUrl === void 0) { trackerUrl = ''; }
        this.data = banner;
        (0, font_loader_1.loadFontsFromViewData)(this.data);
        this.applyRootStyles(this.parent !== document.body);
        this.bannerBody.update(banner, trackerUrl);
    };
    SmartBannerView.prototype.show = function () {
        this.root.hidden = false;
        if (this.wrapper) {
            this.wrapper.hidden = false;
        }
        if (this.placeholder) {
            this.placeholder.hidden = false;
        }
    };
    SmartBannerView.prototype.hide = function () {
        this.root.hidden = true;
        if (this.wrapper) {
            this.wrapper.hidden = true;
        }
        if (this.placeholder) {
            this.placeholder.hidden = true;
        }
    };
    SmartBannerView.prototype.destroy = function () {
        this.bannerBody.destroy();
        this.root.remove();
        if (this.placeholder) {
            this.placeholder.remove();
        }
    };
    return SmartBannerView;
}());
exports.SmartBannerView = SmartBannerView;


/***/ }),

/***/ 676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerSize = exports.Position = void 0;
var _layout_1 = __webpack_require__(3868);
Object.defineProperty(exports, "Position", ({ enumerable: true, get: function () { return _layout_1.Position; } }));
Object.defineProperty(exports, "BannerSize", ({ enumerable: true, get: function () { return _layout_1.BannerSize; } }));


/***/ }),

/***/ 707:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBanner = void 0;
var logger_1 = __webpack_require__(1744);
var language_1 = __webpack_require__(1886);
var _layout_1 = __webpack_require__(3868);
var api_1 = __webpack_require__(3981);
var banner_provider_1 = __webpack_require__(9921);
var smart_banner_repository_1 = __webpack_require__(8971);
var smart_banner_to_link_data_1 = __webpack_require__(7289);
var smart_banner_for_view_1 = __webpack_require__(8845);
var network_factory_1 = __webpack_require__(9684);
var globals_1 = __webpack_require__(4208);
var dismiss_handler_1 = __webpack_require__(1172);
var banner_selector_1 = __webpack_require__(4026);
var tracker_builder_1 = __webpack_require__(7446);
var impression_link_builder_1 = __webpack_require__(8014);
var SmartBanner = /** @class */ (function () {
    function SmartBanner(appToken, options, platform) {
        this.platform = platform;
        this.customDeeplinkData = { context: {} };
        this.view = null;
        this.url = window.location.href;
        var language = options.language, bannerParent = options.bannerParent, iosDeepLinkPath = options.iosDeepLinkPath, androidDeepLinkPath = options.androidDeepLinkPath, onCreated = options.onCreated, onDismissed = options.onDismissed;
        var context = options.context;
        this.dismissHandler = new dismiss_handler_1.DismissHandler();
        var networkConfig = {
            dataEndpoint: (globals_1.Globals._DEV_MODE_ && globals_1.Globals._DEV_ENDPOINT_) ? globals_1.Globals._DEV_ENDPOINT_ : undefined
        };
        this.network = network_factory_1.NetworkFactory.create(networkConfig);
        var networkApi = new api_1.SmartBannerApi(this.platform, this.network);
        this.bannerProvider = new banner_provider_1.BannerProvider(appToken, new smart_banner_repository_1.SmartBannerRepository(networkApi), new banner_selector_1.BannerSelector(this.dismissHandler));
        this.bannerParent = bannerParent;
        if (Object.prototype.hasOwnProperty.call(options, 'bannerParent') && !this.bannerParent) {
            logger_1.Logger.warn('Specified banner parent not found, banner will be attached to document.body');
        }
        this.onCreated = onCreated;
        this.onDismissed = onDismissed;
        this.language = language || (0, language_1.getLanguage)();
        context = context || {};
        this.customDeeplinkData = { androidDeepLinkPath: androidDeepLinkPath, iosDeepLinkPath: iosDeepLinkPath, context: context };
        this.init();
    }
    SmartBanner.prototype.show = function () {
        if (this.url === window.location.href) {
            this.changeVisibility('show');
        }
        else {
            logger_1.Logger.info('Page address changed');
            this.url = window.location.href;
            if (this.view) {
                this.destroyView();
            }
            this.init();
        }
    };
    SmartBanner.prototype.hide = function () {
        this.changeVisibility('hide');
    };
    SmartBanner.prototype.setLanguage = function (language) {
        this.language = language;
        this.applyConfigUpdate('the chosen language');
    };
    SmartBanner.prototype.setIosDeepLinkPath = function (deeplinkPath) {
        this.customDeeplinkData.iosDeepLinkPath = deeplinkPath;
        this.applyConfigUpdate('the provided iOS deeplink path');
    };
    SmartBanner.prototype.setAndroidDeepLinkPath = function (deeplinkPath) {
        this.customDeeplinkData.androidDeepLinkPath = deeplinkPath;
        this.applyConfigUpdate('the provided Android deeplink path');
    };
    SmartBanner.prototype.setContext = function (context) {
        if (context === void 0) { context = {}; }
        this.customDeeplinkData.context = context;
        this.applyConfigUpdate('the provided deeplink context');
    };
    SmartBanner.prototype.init = function () {
        var _this = this;
        this.bannerProvider.fetchBanner(this.url)
            .then(function () {
            if (!_this.bannerProvider.banner) {
                return;
            }
            var _a = _this.bannerProvider.banner, banner = _a.banner, when = _a.when;
            _this.createOrSchedule(banner, when);
        });
    };
    SmartBanner.prototype.createOrSchedule = function (banner, when) {
        var _this = this;
        if (when <= 0) {
            this.createView(banner);
        }
        else {
            this.dismissHandler.schedule(banner, function () { return _this.createView(banner); }, when);
        }
    };
    SmartBanner.prototype.createView = function (bannerData) {
        var _this = this;
        logger_1.Logger.info("Render banner: ".concat(bannerData.title));
        var _a = this.prepareDataForRender(bannerData), renderData = _a.renderData, trackerUrl = _a.trackerUrl, impressionUrl = _a.impressionUrl;
        this.view = _layout_1.SmartBannerLayoutFactory.createViewForSdk(renderData, trackerUrl, impressionUrl, function () { return _this.dismiss(bannerData); });
        this.view.render(this.bannerParent);
        logger_1.Logger.log('Smart banner rendered');
        if (this.onCreated) {
            this.onCreated();
        }
    };
    SmartBanner.prototype.updateViewOrScheduleCreation = function (banner, when) {
        var _this = this;
        if (when <= 0) {
            this.updateView(banner);
        }
        else {
            this.dismissHandler.schedule(banner, function () { return _this.createView(banner); }, when);
        }
    };
    SmartBanner.prototype.updateView = function (banner) {
        if (this.view) {
            logger_1.Logger.log('Updating Smart banner');
            var _a = this.prepareDataForRender(banner), renderData = _a.renderData, trackerUrl = _a.trackerUrl, impressionUrl = _a.impressionUrl;
            this.view.update(renderData, trackerUrl, impressionUrl);
            logger_1.Logger.log('Smart banner updated');
        }
        else {
            logger_1.Logger.error('There is no Smart banner to update');
        }
    };
    SmartBanner.prototype.destroyView = function () {
        if (this.view) {
            this.view.destroy();
            this.view = null;
            logger_1.Logger.log('Smart banner removed');
        }
        else {
            logger_1.Logger.error('There is no Smart banner to remove');
        }
    };
    SmartBanner.prototype.dismiss = function (banner) {
        this.dismissHandler.dismiss(banner);
        this.destroyView();
        if (this.onDismissed) {
            this.onDismissed();
        }
    };
    SmartBanner.prototype.changeVisibility = function (action) {
        var _this = this;
        if (this.view) {
            this.view[action]();
            var message = "".concat(action, " banner");
            message = message.charAt(0).toUpperCase() + message.slice(1);
            logger_1.Logger.log(message);
            return;
        }
        if (this.bannerProvider.isLoading) {
            logger_1.Logger.log("Fetching banners now, ".concat(action, " banner after fetch finished"));
            this.bannerProvider.fetchBanner(this.url)
                .then(function () {
                logger_1.Logger.log("Banners fetch finished, ".concat(action, " Smart banner now"));
                _this.changeVisibility(action);
            });
            return;
        }
    };
    SmartBanner.prototype.applyConfigUpdate = function (action) {
        if (this.bannerProvider.isLoading) {
            logger_1.Logger.log("Smart banner was not rendered yet, ".concat(action, " will be applied within render"));
            return;
        }
        if (!this.bannerProvider.banner) {
            logger_1.Logger.log("There is no suitable banner for current page, preserving ".concat(action));
            return;
        }
        var _a = this.bannerProvider.banner, banner = _a.banner, when = _a.when;
        this.updateViewOrScheduleCreation(banner, when);
    };
    /**
     * Returns localized render data and tracker URL
     */
    SmartBanner.prototype.prepareDataForRender = function (bannerData) {
        this.language = (0, language_1.getCompatibleZhLanguage)(bannerData.localizations, this.language);
        var renderData = (0, smart_banner_for_view_1.convertSmartBannerDataForView)(bannerData, this.language);
        var trackerData = (0, smart_banner_to_link_data_1.convertSmartBannerToTracker)(bannerData, this.language);
        var trackerUrl = tracker_builder_1.TrackerBuilder.build(trackerData, this.url, this.customDeeplinkData);
        var impressionData = (0, smart_banner_to_link_data_1.convertSmartBannerToImpression)(bannerData, this.language);
        var impressionUrl = impression_link_builder_1.ImpressionLinkBuilder.build(impressionData, this.url);
        return { renderData: renderData, trackerUrl: trackerUrl, impressionUrl: impressionUrl };
    };
    return SmartBanner;
}());
exports.SmartBanner = SmartBanner;


/***/ }),

/***/ 964:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XhrNetwork = void 0;
var json_1 = __webpack_require__(7606);
var globals_1 = __webpack_require__(4208);
var errors_1 = __webpack_require__(5242);
/** Sends HTTP GET request using XMLHttpRequest */
var XhrNetwork = /** @class */ (function () {
    function XhrNetwork(dataEndpoint) {
        this.dataEndpoint = dataEndpoint;
    }
    /**
     * Creates an XMLHttpRequest object and sends a GET request with provided encoded URL
     * @param url encoded URL
     */
    XhrNetwork.prototype.xhr = function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            var headers = [
                ['Client-SDK', "js".concat(globals_1.Globals.version)],
                ['Content-Type', 'application/json']
            ];
            headers.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                xhr.setRequestHeader(key, value);
            });
            xhr.onerror = function () { return reject(errors_1.NoConnectionError); };
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                var okStatus = xhr.status >= 200 && xhr.status < 300;
                var json = (0, json_1.parseJson)(xhr.responseText);
                if (xhr.status === 0) {
                    reject(errors_1.NoConnectionError);
                }
                else {
                    if (okStatus) {
                        resolve(json);
                    }
                    else {
                        reject({ status: xhr.status, message: json || xhr.responseText || '' });
                    }
                }
            };
            xhr.send();
        });
    };
    XhrNetwork.prototype.encodeParams = function (params) {
        return Object.keys(params)
            .map(function (key) { return [encodeURIComponent(key), encodeURIComponent(params[key])].join('='); })
            .join('&');
    };
    XhrNetwork.prototype.request = function (path, params) {
        var encodedParams = params ? "?".concat(this.encodeParams(params)) : '';
        return this.xhr("".concat(this.dataEndpoint).concat(path).concat(encodedParams));
    };
    return XhrNetwork;
}());
exports.XhrNetwork = XhrNetwork;


/***/ }),

/***/ 1172:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DismissHandler = void 0;
var logger_1 = __webpack_require__(1744);
var storage_factory_1 = __webpack_require__(5037);
var DismissHandler = /** @class */ (function () {
    function DismissHandler(storage) {
        this.timer = null;
        this.storage = storage !== null && storage !== void 0 ? storage : storage_factory_1.StorageFactory.createStorage();
    }
    DismissHandler.prototype.getDateToShowAgain = function (banner) {
        var dismissedDate = this.storage.getItem(banner.id);
        if (!dismissedDate || typeof dismissedDate !== 'number') {
            return Date.now();
        }
        return Math.max(dismissedDate + banner.dismissal_period * 1000, Date.now());
    };
    DismissHandler.prototype.isDismissed = function (banner) {
        return this.getDateToShowAgain(banner) > Date.now();
    };
    DismissHandler.prototype.dismiss = function (banner) {
        this.storage.setItem(banner.id, Date.now());
    };
    DismissHandler.prototype.schedule = function (banner, showBannerCallback, when) {
        var _this = this;
        if (this.timer) {
            logger_1.Logger.log('Clearing previously scheduled creation of a Smart banner');
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(function () {
            _this.timer = null;
            _this.storage.removeItem(banner.id);
            showBannerCallback();
        }, when - Date.now());
        logger_1.Logger.info("Smart banner ".concat(banner.title, " creation scheduled on ").concat(new Date(when)));
    };
    return DismissHandler;
}());
exports.DismissHandler = DismissHandler;


/***/ }),

/***/ 1397:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DismissButton = void 0;
var cross_svg_1 = __importDefault(__webpack_require__(5494));
var styles = __importStar(__webpack_require__(9911));
var DismissButton = /** @class */ (function () {
    function DismissButton(onClick, color) {
        this.onClick = onClick;
        this.crossSvg = null;
        this.button = document.createElement('button');
        this.button.innerHTML = cross_svg_1.default;
        this.button.className = styles.dismiss;
        this.button.ariaLabel = 'Close banner';
        var svg = this.button.querySelector('svg');
        if (svg) {
            this.crossSvg = svg;
        }
        this.color = color;
    }
    DismissButton.prototype.render = function (root) {
        this.button.addEventListener('click', this.onClick);
        this.setColor(this.color);
        root.appendChild(this.button);
    };
    DismissButton.prototype.setColor = function (color) {
        if (this.crossSvg && color) {
            this.crossSvg.style.fill = color;
        }
    };
    DismissButton.prototype.update = function (color) {
        this.setColor(color);
    };
    DismissButton.prototype.destroy = function () {
        this.button.removeEventListener('click', this.onClick);
    };
    return DismissButton;
}());
exports.DismissButton = DismissButton;


/***/ }),

/***/ 1744:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.print = function (messageLevel, message) {
        if (Logger.LEVELS[messageLevel] < Logger.level) {
            return;
        }
        switch (messageLevel) {
            case 'verbose':
                console.log(message);
                break;
            case 'info':
                console.log(message);
                break;
            case 'warning':
                console.warn(message);
                break;
            case 'error':
                console.error(message);
                break;
        }
    };
    Logger.setLogLevel = function (level) {
        Logger.level = Logger.LEVELS[level];
    };
    Logger.log = function (message) {
        Logger.print('verbose', message);
    };
    Logger.info = function (message) {
        Logger.print('info', message);
    };
    Logger.warn = function (message) {
        Logger.print('warning', message);
    };
    Logger.error = function (message) {
        Logger.print('error', message);
    };
    Logger.LEVELS = {
        'none': 100,
        'verbose': 1,
        'info': 2,
        'warning': 3,
        'error': 4
    };
    Logger.level = Logger.LEVELS.error;
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ 1819:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionButton = void 0;
var styles = __importStar(__webpack_require__(2843));
var ActionButton = /** @class */ (function () {
    function ActionButton(banner, trackerUrl) {
        if (trackerUrl === void 0) { trackerUrl = ''; }
        this.banner = banner;
        this.trackerUrl = trackerUrl;
        this.link = document.createElement('a');
        // In a case when banner in an iframe rendered, open a link in current window instead of the iframe
        this.link.target = '_top';
    }
    ActionButton.prototype.applyStyle = function () {
        this.link.style.backgroundColor = this.banner.buttonColor || '';
        this.link.style.color = this.banner.buttonTextColor || '';
        this.link.style.fontFamily = this.banner.buttonFont ? this.banner.buttonFont.family : '';
        this.link.style.fontSize = this.banner.buttonFontSize ? (this.banner.buttonFontSize + 'px') : '';
    };
    ActionButton.prototype.applyUrl = function () {
        if (this.trackerUrl && this.trackerUrl !== '') {
            this.link.href = this.trackerUrl;
        }
        else {
            this.link.removeAttribute('href');
        }
    };
    ActionButton.prototype.render = function (root) {
        this.link.className = styles.action;
        this.link.innerText = this.banner.buttonText;
        this.applyUrl();
        this.applyStyle();
        root.appendChild(this.link);
    };
    ActionButton.prototype.update = function (banner, trackerUrl) {
        this.banner = banner;
        this.trackerUrl = trackerUrl;
        this.link.innerText = this.banner.buttonText;
        this.applyUrl();
        this.applyStyle();
    };
    return ActionButton;
}());
exports.ActionButton = ActionButton;


/***/ }),

/***/ 1886:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLanguage = getLanguage;
exports.getCompatibleZhLanguage = getCompatibleZhLanguage;
var chineseSimplified = 'zh-hans';
var chineseTraditional = 'zh-hant';
var chineseSimplifiedVariations = [chineseSimplified, 'zh-cn'];
var zhTraditionalVariations = [chineseTraditional, 'zh-tw'];
function getLanguage() {
    var languageTag = null;
    if (navigator) {
        var language = ((Array.isArray(navigator.languages) && navigator.languages.length > 0) ? navigator.languages[0] : navigator.language) || '';
        language = language.toLowerCase();
        if (chineseSimplifiedVariations.includes(language)) {
            return chineseSimplified;
        }
        if (zhTraditionalVariations.includes(language)) {
            return chineseTraditional;
        }
        languageTag = language.split('-')[0];
        if (languageTag.length < 2) {
            languageTag = null;
        }
    }
    return languageTag || null;
}
/**
 * Check if data contains detected Chinese language, otherwise try to fallback.
 */
function getCompatibleZhLanguage(localizations, lang) {
    var chineseLanguages = [chineseSimplified, chineseTraditional];
    if (!lang || !__spreadArray(['zh'], chineseLanguages, true).includes(lang)) {
        return lang; // It's not Chinese at all
    }
    if (localizations[lang]) {
        return lang; // Localization is present, nothing to do here
    }
    if (chineseLanguages.includes(lang) && localizations['zh']) {
        // We detect one of 'modern' Chinese locale, but there is no such key in localizations data
        return 'zh'; // Fallback to 'outdated' one
    }
    if (lang === 'zh') {
        // We detect zh locale, and localizations data does not contain it
        if (localizations[chineseSimplified]) {
            return chineseSimplified;
        }
        if (localizations[chineseTraditional]) {
            return chineseTraditional;
        }
    }
    return null;
}


/***/ }),

/***/ 2165:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   f: () => (/* binding */ pixel)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_pixel__yXLhF{pointer-events:none;position:fixed;width:0;height:0}`, ""]);
// Exports
var pixel = `adjust-sb_pixel__yXLhF`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2292:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   e: () => (/* binding */ _2),
/* harmony export */   kL: () => (/* binding */ container),
/* harmony export */   oi: () => (/* binding */ _1)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_banner-body__HxwGn{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;display:flex;box-sizing:border-box;height:100%;margin:0 auto;background:#fff;pointer-events:auto;background-repeat:no-repeat;background-position:center center;background-size:cover}.small .adjust-sb_banner-body__HxwGn{flex-direction:row;max-width:428px;padding-block:12px;padding-inline:8px;gap:8px}.medium .adjust-sb_banner-body__HxwGn{flex-direction:column;max-width:428px;padding-block:20px;padding-inline:20px}.large .adjust-sb_banner-body__HxwGn{flex-direction:column;max-width:100%;padding-block:32px;padding-inline:32px}.adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;display:flex;flex:1;height:100%;overflow:hidden}.small .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ{flex-direction:row;align-items:center;gap:12px}.medium .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ,.large .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ{flex-direction:column;justify-content:flex-end;align-items:flex-start}.medium .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ{gap:20px;margin-block-start:-24px}.large .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ{gap:24px;margin-block-start:-24px}.adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ .adjust-sb_text-container__XfKON{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;flex:0 1 auto;min-height:0;min-width:0}.small .adjust-sb_banner-body__HxwGn .adjust-sb_container__Q_SbQ .adjust-sb_text-container__XfKON{flex:1 1 auto}`, ""]);
// Exports
var _1 = `adjust-sb_banner-body__HxwGn`;

var container = `adjust-sb_container__Q_SbQ`;
var _2 = `adjust-sb_text-container__XfKON`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   action: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.X),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4068);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 3313:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerText = exports.TextType = void 0;
var styles = __importStar(__webpack_require__(5939));
var TextType;
(function (TextType) {
    TextType[TextType["Title"] = 0] = "Title";
    TextType[TextType["Description"] = 1] = "Description";
})(TextType || (exports.TextType = TextType = {}));
var BannerText = /** @class */ (function () {
    function BannerText(type, text, style) {
        this.text = text;
        this.style = style;
        if (type === TextType.Title) {
            this.element = document.createElement('h4');
        }
        else {
            this.element = document.createElement('p');
        }
        this.element.className = styles['banner-text'];
    }
    BannerText.prototype.renderText = function (text, style) {
        if (text) {
            this.element.hidden = false;
            this.element.innerText = text;
        }
        else {
            this.element.hidden = true;
        }
        if (style) {
            var _a = style.color, color = _a === void 0 ? '' : _a, fontSize = style.fontSize, _b = style.fontFamily, fontFamily = _b === void 0 ? '' : _b;
            this.element.style.color = color;
            this.element.style.fontFamily = fontFamily;
            if (fontSize) {
                this.element.style.fontSize = fontSize + 'px';
            }
            else {
                this.element.style.fontSize = '';
            }
        }
        return this.element;
    };
    BannerText.prototype.render = function (root) {
        root.appendChild(this.renderText(this.text, this.style));
    };
    BannerText.prototype.update = function (text, style) {
        this.text = text;
        this.style = __assign(__assign({}, this.style), style);
        this.renderText(text, style);
    };
    return BannerText;
}());
exports.BannerText = BannerText;


/***/ }),

/***/ 3868:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBannerLayoutFactory = exports.BannerSize = exports.Position = void 0;
var smart_banner_layout_factory_1 = __webpack_require__(8189);
Object.defineProperty(exports, "SmartBannerLayoutFactory", ({ enumerable: true, get: function () { return smart_banner_layout_factory_1.SmartBannerLayoutFactory; } }));
var data_types_1 = __webpack_require__(4153);
Object.defineProperty(exports, "Position", ({ enumerable: true, get: function () { return data_types_1.Position; } }));
Object.defineProperty(exports, "BannerSize", ({ enumerable: true, get: function () { return data_types_1.BannerSize; } }));


/***/ }),

/***/ 3981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBannerApi = void 0;
var logger_1 = __webpack_require__(1744);
var response_to_smart_banners_1 = __webpack_require__(7422);
var globals_1 = __webpack_require__(4208);
/**
 * Fetches smart banners for the certain platform from the backend using provided network.
 */
var SmartBannerApi = /** @class */ (function () {
    function SmartBannerApi(platform, network) {
        this.platform = platform;
        this.network = network;
    }
    SmartBannerApi.prototype.retrieve = function (token) {
        var _this = this;
        logger_1.Logger.log('Fetching Smart banners');
        var path = '/smart_banner';
        return this.network.request(path, {
            'app_token': token,
            'platform': this.platform,
            'data_version': globals_1.Globals.dataVersion
        })
            .then(function (data) {
            var convertedData = (0, response_to_smart_banners_1.convertResponseToSmartBanners)(data);
            if (convertedData) {
                logger_1.Logger.log('Smart banners fetched');
                var dataVersion = convertedData.dataVersion;
                if (dataVersion && dataVersion.current !== dataVersion.latest) {
                    logger_1.Logger.warn('Data version does not match, consider to update the SDK');
                }
                return convertedData.banners;
            }
            else {
                logger_1.Logger.log("No Smart Banners for ".concat(_this.platform, " platform found"));
                return null;
            }
        })
            .catch(function (error) {
            logger_1.Logger.error('Network error occurred during loading Smart Banner: ' + JSON.stringify(error));
            return null;
        });
    };
    return SmartBannerApi;
}());
exports.SmartBannerApi = SmartBannerApi;


/***/ }),

/***/ 4026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerSelector = exports.NO_DELAY = void 0;
var logger_1 = __webpack_require__(1744);
var random_1 = __webpack_require__(9655);
var display_rules_1 = __webpack_require__(4934);
exports.NO_DELAY = -1;
var BannerSelector = /** @class */ (function () {
    function BannerSelector(dismissHandler) {
        this.dismissHandler = dismissHandler;
    }
    /**
     * Returns next suitable banner and a number of seconds to wait until show the banner
     */
    BannerSelector.prototype.next = function (banners, url) {
        var _this = this;
        var suitableBanners = new display_rules_1.DisplayRules(url).filter(banners);
        if (suitableBanners.length <= 0) {
            logger_1.Logger.log("No Smart Banners for ".concat(url, " page found"));
            return null;
        }
        // If at least one of banners was dismissed, we should wait till 'the oldest' dismissalPeriod passed
        var dateToShow = null;
        var dismissed = suitableBanners.filter(function (banner) { return _this.dismissHandler.isDismissed(banner); });
        if (dismissed.length > 0) {
            dismissed.sort(function (a, b) { return _this.dismissHandler.getDateToShowAgain(a) - _this.dismissHandler.getDateToShowAgain(b); });
            dateToShow = this.dismissHandler.getDateToShowAgain(dismissed[0]);
        }
        return {
            banner: suitableBanners[(0, random_1.random)(0, suitableBanners.length)], // Show any banner with equal probability
            when: dateToShow || exports.NO_DELAY
        };
    };
    return BannerSelector;
}());
exports.BannerSelector = BannerSelector;


/***/ }),

/***/ 4068:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   X: () => (/* binding */ action)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_action__sHg6Z{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;color:#191d2f;background:#f4f6f9;border:1px solid rgba(205,208,224,.3);border-radius:6px;box-shadow:inset 0px -1px 1px 0px rgba(205,208,224,.3);padding-inline:12px;padding-block:8px;display:inline-block;vertical-align:middle;text-align:center;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:14px;font-weight:500;line-height:20px;cursor:pointer;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.small .adjust-sb_action__sHg6Z{max-width:115px;flex-shrink:0}.medium .adjust-sb_action__sHg6Z{align-self:stretch;padding-inline:16px;padding-block:8px}.large .adjust-sb_action__sHg6Z{align-self:stretch;padding-inline:16px;padding-block:12px;font-size:16px;line-height:20px}`, ""]);
// Exports
var action = `adjust-sb_action__sHg6Z`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4070:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   X: () => (/* binding */ dismiss)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_dismiss__g3JCL{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;flex-shrink:0;padding:0;border:none;background:none;cursor:pointer;z-index:1}.small .adjust-sb_dismiss__g3JCL{align-self:center;width:16px;height:16px}.medium .adjust-sb_dismiss__g3JCL{align-self:flex-end;width:24px;height:24px}.large .adjust-sb_dismiss__g3JCL{align-self:flex-end;width:24px;height:24px}.adjust-sb_dismiss__g3JCL svg{fill:#6e7492}`, ""]);
// Exports
var dismiss = `adjust-sb_dismiss__g3JCL`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4153:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerSize = exports.Position = void 0;
var Position;
(function (Position) {
    Position["Top"] = "top";
    Position["Bottom"] = "bottom";
})(Position || (exports.Position = Position = {}));
var BannerSize;
(function (BannerSize) {
    BannerSize["Small"] = "small";
    BannerSize["Medium"] = "medium";
    BannerSize["Large"] = "large";
})(BannerSize || (exports.BannerSize = BannerSize = {}));


/***/ }),

/***/ 4189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   banner: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.vK),
/* harmony export */   "banner-placeholder": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.Rv),
/* harmony export */   "custom-parent": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.X$),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   stickyToBottom: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.w3),
/* harmony export */   stickyToTop: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.Ai),
/* harmony export */   wrapper: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.iE)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6114);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals : undefined);


/***/ }),

/***/ 4208:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Add data types to window.navigator ambiently for implicit use in the entire project. See https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types- for more info.
/// <reference types="user-agent-data-types" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Globals = void 0;
exports.Globals = {
    'version': "1.2.7",
    'namespace': "adjust_smart_banner",
    dataVersion: 'v1',
    _DEV_MODE_: false,
    _DEV_ENDPOINT_: undefined
};


/***/ }),

/***/ 4291:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
var logger_1 = __webpack_require__(1744);
var detect_platform_1 = __webpack_require__(7439);
Object.defineProperty(exports, "Platform", ({ enumerable: true, get: function () { return detect_platform_1.Platform; } }));
var smart_banner_1 = __webpack_require__(707);
function flattenAppToken(appToken, platform) {
    if (typeof appToken === 'string') {
        return appToken;
    }
    return appToken[platform];
}
/**
 * Main SDK class to access public methods
 * @public
 */
var AdjustSmartBanner = /** @class */ (function () {
    function AdjustSmartBanner() {
    }
    AdjustSmartBanner.init = function (_a) {
        var _b = _a.logLevel, logLevel = _b === void 0 ? 'error' : _b, restOptions = __rest(_a, ["logLevel"]);
        logger_1.Logger.setLogLevel(logLevel);
        if (!restOptions.appToken) {
            logger_1.Logger.error('Can not initialise Smart Banner SDK, you should provide appToken');
            return;
        }
        var platform = (0, detect_platform_1.getPlatform)();
        if (!platform) {
            logger_1.Logger.info('This platform is not one of the targeting ones, Smart banner will not be shown');
            return;
        }
        logger_1.Logger.log('Detected platform: ' + platform);
        var appToken = flattenAppToken(restOptions.appToken, platform);
        if (!appToken) {
            logger_1.Logger.info("No app token found for platform: ".concat(platform, ", Smart banner will not be shown"));
            return;
        }
        if (!this.smartBanner) {
            this.smartBanner = new smart_banner_1.SmartBanner(appToken, restOptions, platform);
        }
        else {
            logger_1.Logger.error('Smart Banner SDK is initialised already');
        }
    };
    AdjustSmartBanner.hide = function () {
        if (this.smartBanner) {
            this.smartBanner.hide();
        }
        else {
            logger_1.Logger.error('Can\'t hide banner, you should initialise Smart Banner SDK first');
        }
    };
    AdjustSmartBanner.show = function () {
        if (this.smartBanner) {
            this.smartBanner.show();
        }
        else {
            logger_1.Logger.error('Can\'t show banner, you should initialise Smart Banner SDK first');
        }
    };
    AdjustSmartBanner.setLanguage = function (lang) {
        if (!lang || typeof lang !== 'string') {
            logger_1.Logger.error('Can\'t set language, provided parameter should be a non-empty string');
            return;
        }
        if (this.smartBanner) {
            this.smartBanner.setLanguage(lang);
        }
        else {
            logger_1.Logger.error('Can\'t set language, you should initilise Smart Banner SDK first');
        }
    };
    AdjustSmartBanner.setIosDeepLinkPath = function (deeplinkPath) {
        if (!deeplinkPath || typeof deeplinkPath !== 'string') {
            logger_1.Logger.error('Can\'t set iOS deeplink path, provided parameter should be a non-empty string');
            return;
        }
        if (this.smartBanner) {
            this.smartBanner.setIosDeepLinkPath(deeplinkPath);
        }
        else {
            logger_1.Logger.error('Can\'t set iOS deeplink path, you should initilise Smart Banner SDK first');
        }
    };
    AdjustSmartBanner.setAndroidDeepLinkPath = function (deeplinkPath) {
        if (!deeplinkPath || typeof deeplinkPath !== 'string') {
            logger_1.Logger.error('Can\'t set Android deeplink path, provided parameter should be a non-empty string');
            return;
        }
        if (this.smartBanner) {
            this.smartBanner.setAndroidDeepLinkPath(deeplinkPath);
        }
        else {
            logger_1.Logger.error('Can\'t set Android deeplink path, you should initilise Smart Banner SDK first');
        }
    };
    AdjustSmartBanner.setContext = function (context) {
        // TODO: type check
        if (this.smartBanner) {
            this.smartBanner.setContext(context);
        }
        else {
            logger_1.Logger.error('Can\'t set deeplink context, you should initilise Smart Banner SDK first');
        }
    };
    return AdjustSmartBanner;
}());
exports["default"] = AdjustSmartBanner;


/***/ }),

/***/ 4579:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseGetParams = parseGetParams;
/**
 * Extracts GET parameters from passed url and splits them to `key: value` pairs.
 * If URL contains parameter without a value then this parameter considered as boolean and equals true.
 * @returns an object containing GET parameters
 */
function parseGetParams(pageUrl) {
    var startIndex = pageUrl.indexOf('?');
    if (startIndex < 0) {
        return {};
    }
    var pairs = pageUrl.substring(startIndex + 1).split('&');
    return pairs.reduce(function (acc, pair) {
        var _a;
        var _b = pair.split('='), key = _b[0], value = _b[1];
        if (!key) {
            return acc;
        }
        return __assign(__assign({}, acc), (_a = {}, _a[key] = value !== null && value !== void 0 ? value : true, _a));
    }, {});
}


/***/ }),

/***/ 4934:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisplayRules = void 0;
var logger_1 = __webpack_require__(1744);
var MatchType;
(function (MatchType) {
    MatchType[MatchType["default"] = 0] = "default";
    MatchType[MatchType["matching"] = 1] = "matching";
    MatchType[MatchType["notMatching"] = 2] = "notMatching";
})(MatchType || (MatchType = {}));
var DisplayRules = /** @class */ (function () {
    function DisplayRules(url) {
        this.url = url;
    }
    DisplayRules.prototype.and = function (rules) {
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (typeof rule === 'string') {
                if (!new RegExp(rule, 'i').test(this.url)) {
                    return false; // if at least one rule form rules array doesn't match then the entire condition doesn't match
                }
            }
            else {
                if (!this.checkRule(rule)) {
                    return false; // if at least one rule form rules array doesn't match then the entire condition doesn't match
                }
            }
        }
        return true; // if every rule form rules array does match then the entire condition does match
    };
    DisplayRules.prototype.or = function (rules) {
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            if (typeof rule === 'string') {
                if (new RegExp(rule, 'i').test(this.url)) {
                    return true; // if at least one rule form rules array does match then the entire condition does match
                }
            }
            else {
                if (this.checkRule(rule)) {
                    return true; // if at least one rule form rules array does match then the entire condition does match
                }
            }
        }
        return false; // if every rule form rules array doesn't match then the entire condition doesn't match
    };
    DisplayRules.prototype.checkRule = function (condition) {
        if (condition.operator === 'or') {
            return this.or(condition.rules);
        }
        else if (condition.operator === 'and') {
            return this.and(condition.rules);
        }
        logger_1.Logger.warn('Unknown operator ' + condition.operator + ', try to update the SDK.');
        return false;
    };
    DisplayRules.prototype.match = function (banner) {
        if (!banner.display_rules) {
            return MatchType.default;
        }
        if (this.checkRule(banner.display_rules)) {
            return MatchType.matching;
        }
        return MatchType.notMatching;
    };
    /**
     * Filters out banners those doesn't match current url. Returns default banners (with empty display_rules) if there
     * are no matching ones.
     */
    DisplayRules.prototype.filter = function (array) {
        var _this = this;
        var matchingNonDefault = [];
        var defaultBanners = [];
        array.forEach(function (it) {
            var match = _this.match(it);
            if (match === MatchType.matching) {
                matchingNonDefault.push(it);
            }
            else if (match === MatchType.default) {
                defaultBanners.push(it);
            }
        });
        if (matchingNonDefault.length > 0) {
            return matchingNonDefault;
        }
        // Nothing found, return default banners
        return defaultBanners;
    };
    return DisplayRules;
}());
exports.DisplayRules = DisplayRules;


/***/ }),

/***/ 5037:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageFactory = void 0;
var logger_1 = __webpack_require__(1744);
var local_storage_1 = __webpack_require__(5944);
var in_memory_storage_1 = __webpack_require__(6954);
var StorageFactory = /** @class */ (function () {
    function StorageFactory() {
    }
    StorageFactory.isLocalStorageSupported = function () {
        try {
            var uid = (new Date).toString();
            var storage = window.localStorage;
            storage.setItem(uid, uid);
            var result = storage.getItem(uid) === uid;
            storage.removeItem(uid);
            var support = !!(result && storage);
            return support;
        }
        catch (_a) {
            return false;
        }
    };
    StorageFactory.createStorage = function () {
        if (this.isLocalStorageSupported()) {
            return new local_storage_1.LocalStorage();
        }
        logger_1.Logger.info('Persistant storage is not available, using an in-memory storage instead');
        return new in_memory_storage_1.InMemoryStorage();
    };
    return StorageFactory;
}());
exports.StorageFactory = StorageFactory;


/***/ }),

/***/ 5130:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImpressionPixel = void 0;
var styles = __importStar(__webpack_require__(5280));
var ImpressionPixel = /** @class */ (function () {
    function ImpressionPixel(impressionUrl) {
        if (impressionUrl === void 0) { impressionUrl = ''; }
        this.impressionUrl = impressionUrl;
        this.image = document.createElement('img');
        this.image.className = styles.pixel;
        this.image.width = 0;
        this.image.height = 0;
        this.image.alt = '';
        this.applyUrl();
    }
    ImpressionPixel.prototype.applyUrl = function () {
        if (this.impressionUrl && this.impressionUrl !== '') {
            this.image.hidden = false;
            this.image.src = this.impressionUrl;
        }
        else {
            this.image.hidden = true;
            this.image.removeAttribute('src');
        }
    };
    ImpressionPixel.prototype.render = function (root) {
        root.appendChild(this.image);
    };
    ImpressionPixel.prototype.update = function (impressionUrl) {
        if (impressionUrl === void 0) { impressionUrl = ''; }
        this.impressionUrl = impressionUrl;
        this.applyUrl();
    };
    return ImpressionPixel;
}());
exports.ImpressionPixel = ImpressionPixel;


/***/ }),

/***/ 5215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "banner-body": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.oi),
/* harmony export */   container: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.kL),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "text-container": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.e)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2292);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals : undefined);


/***/ }),

/***/ 5242:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoConnectionError = void 0;
exports.NoConnectionError = {
    status: 0,
    message: 'No internet connectivity'
};


/***/ }),

/***/ 5280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   pixel: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.f)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2165);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 5292:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 5330:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   R: () => (/* binding */ _1)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_banner-text__P_JgX{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;overflow:hidden}h4.adjust-sb_banner-text__P_JgX{margin:0 0 4px 0;color:#191d2f;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-weight:500}.small h4.adjust-sb_banner-text__P_JgX{font-size:14px;line-height:20px;white-space:nowrap}.medium h4.adjust-sb_banner-text__P_JgX{font-size:16px;line-height:20px;max-height:40px}.large h4.adjust-sb_banner-text__P_JgX{font-size:16px;line-height:24px}p.adjust-sb_banner-text__P_JgX{margin:0;color:#565c78;font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}.small p.adjust-sb_banner-text__P_JgX{font-size:12px;line-height:14px;max-height:28px}.medium p.adjust-sb_banner-text__P_JgX{font-size:14px;line-height:20px;max-height:60px}.large p.adjust-sb_banner-text__P_JgX{font-size:14px;line-height:20px}`, ""]);
// Exports
var _1 = `adjust-sb_banner-text__P_JgX`;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5494:
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"Cross\"><path id=\"Union\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.29287 7.99998L3.64642 11.6464L4.35353 12.3535L7.99998 8.70708L11.6464 12.3535L12.3535 11.6464L8.70708 7.99998L12.3535 4.35353L11.6464 3.64642L7.99998 7.29287L4.35353 3.64642L3.64642 4.35353L7.29287 7.99998Z\"></path></g></svg>"

/***/ }),

/***/ 5939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "banner-text": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.R),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5330);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 5944:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStorage = void 0;
var json_1 = __webpack_require__(7606);
var LocalStorage = /** @class */ (function () {
    function LocalStorage(storageName) {
        if (storageName === void 0) { storageName = 'adjust-smart-banner'; }
        this.storageName = storageName;
    }
    LocalStorage.prototype.setItem = function (key, value) {
        localStorage.setItem("".concat(this.storageName, ".").concat(key), JSON.stringify(value));
    };
    LocalStorage.prototype.getItem = function (key) {
        var value = localStorage.getItem("".concat(this.storageName, ".").concat(key));
        return (0, json_1.parseJson)(value);
    };
    LocalStorage.prototype.removeItem = function (key) {
        localStorage.removeItem("".concat(this.storageName, ".").concat(key));
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;


/***/ }),

/***/ 6114:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ai: () => (/* binding */ stickyToTop),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Rv: () => (/* binding */ _1),
/* harmony export */   X$: () => (/* binding */ _2),
/* harmony export */   iE: () => (/* binding */ wrapper),
/* harmony export */   vK: () => (/* binding */ banner),
/* harmony export */   w3: () => (/* binding */ stickyToBottom)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.adjust-sb_banner-placeholder__UHO6A{height:80px}.adjust-sb_wrapper__tOFC5{display:flex;height:100%}.adjust-sb_banner__ttd2n{min-width:auto;min-height:auto;padding:0;margin:0;background-color:rgba(0,0,0,0);font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:normal;pointer-events:none;position:fixed;left:0;right:0;z-index:1;max-width:100%}.adjust-sb_banner__ttd2n.small{height:80px}.adjust-sb_banner__ttd2n.medium{height:280px}.adjust-sb_banner__ttd2n.large{height:100%}.adjust-sb_banner__ttd2n.adjust-sb_custom-parent__Mu_7j{position:static;flex:1;z-index:initial}.adjust-sb_banner__ttd2n.adjust-sb_stickyToTop__xJ_s6{top:0;align-self:flex-start}.adjust-sb_banner__ttd2n.adjust-sb_stickyToBottom__m3590{bottom:0;align-self:flex-end}`, ""]);
// Exports
var _1 = `adjust-sb_banner-placeholder__UHO6A`;

var wrapper = `adjust-sb_wrapper__tOFC5`;
var banner = `adjust-sb_banner__ttd2n`;
var _2 = `adjust-sb_custom-parent__Mu_7j`;

var stickyToTop = `adjust-sb_stickyToTop__xJ_s6`;
var stickyToBottom = `adjust-sb_stickyToBottom__m3590`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6374:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontLoader = void 0;
exports.loadFontsFromViewData = loadFontsFromViewData;
function loadFontsFromViewData(data) {
    if (data.titleFont) {
        FontLoader.addFontStylesheet(data.titleFont);
    }
    if (data.descriptionFont) {
        FontLoader.addFontStylesheet(data.descriptionFont);
    }
    if (data.buttonFont) {
        FontLoader.addFontStylesheet(data.buttonFont);
    }
}
var FontLoader = /** @class */ (function () {
    function FontLoader() {
    }
    FontLoader.addFontStylesheet = function (font, root) {
        if (this.cache.has(font.family)) {
            return;
        }
        var parent = root || document.head;
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = font.source;
        parent.appendChild(link);
        this.cache.add(font.family);
    };
    FontLoader.cache = new Set;
    return FontLoader;
}());
exports.FontLoader = FontLoader;


/***/ }),

/***/ 6884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 6954:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InMemoryStorage = void 0;
var InMemoryStorage = /** @class */ (function () {
    function InMemoryStorage() {
        this.items = {};
    }
    InMemoryStorage.prototype.setItem = function (key, value) {
        this.items[key] = value;
    };
    InMemoryStorage.prototype.getItem = function (key) {
        return Object.prototype.hasOwnProperty.call(this.items, key) ? this.items[key] : null;
    };
    InMemoryStorage.prototype.removeItem = function (key) {
        delete this.items[key];
    };
    return InMemoryStorage;
}());
exports.InMemoryStorage = InMemoryStorage;


/***/ }),

/***/ 7289:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertSmartBannerToTracker = convertSmartBannerToTracker;
exports.convertSmartBannerToImpression = convertSmartBannerToImpression;
/**
 * Converts SmartBannerData to TrackerData
 *
 * @returns A new object containing only tracker templates and localized Context
 */
function convertSmartBannerToTracker(data, locale) {
    return convertSmartBannerToLinkData('tracker', data, locale);
}
/**
 * Converts SmartBannerData to ImpressionData
 *
 * @returns A new object containing only impression templates and localized Context
 */
function convertSmartBannerToImpression(data, locale) {
    return convertSmartBannerToLinkData('impression', data, locale);
}
function convertSmartBannerToLinkData(type, data, locale) {
    var _a = data.tracker_url, template = _a.template, impression_url = _a.impression_url, context = _a.context, localizations = data.localizations;
    var localization = locale && localizations ? localizations[locale] : null;
    var localeContext = localization ? localization.context : {};
    if (type === 'tracker') {
        return {
            template: template,
            context: __assign(__assign({}, context), localeContext)
        };
    }
    else {
        return {
            impression_url: impression_url,
            context: __assign(__assign({}, context), localeContext)
        };
    }
}


/***/ }),

/***/ 7422:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertResponseToSmartBanners = convertResponseToSmartBanners;
var types_1 = __webpack_require__(676);
function convertResponseToSmartBanners(data) {
    if (!Array.isArray(data)) {
        return null;
    }
    var banners = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var bannerData = data_1[_i];
        var button_label = bannerData.button_label, rest = __rest(bannerData, ["button_label"]);
        // TODO: Maybe it's needed to ignore this banner if all this fields are missing?
        var banner = __assign(__assign({}, rest), { position: bannerData.position || types_1.Position.Top, size: bannerData.size || types_1.BannerSize.Small, app_name: bannerData.app_name || '', title: bannerData.title || '', button_text: bannerData.button_text || button_label || '', dismissal_period: (bannerData.dismissal_period !== null && bannerData.dismissal_period !== undefined) ? bannerData.dismissal_period : 86400 });
        banners.push(banner);
    }
    if (banners.length < 1) {
        return null;
    }
    return { banners: banners, dataVersion: data[0].data_version };
}


/***/ }),

/***/ 7439:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
exports.getPlatform = getPlatform;
/**
 * Device platforms
 * @public
 */
var Platform;
(function (Platform) {
    Platform["Android"] = "android";
    Platform["iOS"] = "ios";
})(Platform || (exports.Platform = Platform = {}));
/**
 * Detects if current platform is Android or iOS using window.navigator data and relying on touch and pointing device availablity.
 */
function getPlatform() {
    var _a;
    var platform = (((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || navigator.userAgent || '').toLowerCase();
    // Sometimes navigator.maxTouchPoints equals 256 instead of 0 when touch actually isn't supported
    var maxTouchPoints = navigator.maxTouchPoints & 0xFF;
    var isMultiTouch = maxTouchPoints > 0;
    var isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
    var supportsTouch = isMultiTouch || isTouchDevice;
    if (/iphone|ipad|ipod/.test(platform) || (platform.includes('macintosh') && supportsTouch)) {
        return Platform.iOS;
    }
    if (platform.includes('android') || (platform.includes('linux') && supportsTouch)) {
        return Platform.Android;
    }
    return undefined;
}


/***/ }),

/***/ 7446:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackerBuilder = void 0;
var parse_get_params_1 = __webpack_require__(4579);
var template_interpolation_1 = __webpack_require__(8325);
var object_1 = __webpack_require__(8487);
var detect_platform_1 = __webpack_require__(7439);
exports.TrackerBuilder = {
    build: function (data, pageUrl, customDeeplinkData) {
        var template = data.template;
        var _a = customDeeplinkData.context, customContext = _a === void 0 ? {} : _a, restCustomData = __rest(customDeeplinkData, ["context"]);
        var customDeeplinkPaths = (0, object_1.omitNotDefined)(restCustomData);
        var backwardCompatibleVariables = (0, object_1.omitNotDefined)({
            'androidAppScheme': data.context.android_app_scheme,
            'androidDeepLinkPath': data.context.android_deep_link_path,
            'iosDeepLinkPath': data.context.ios_deep_link_path
        });
        var combinedContext = __assign(__assign(__assign(__assign(__assign({}, data.context), backwardCompatibleVariables), customDeeplinkPaths), (0, parse_get_params_1.parseGetParams)(pageUrl)), customContext);
        var deeplinkPaths = buildDeeplink({ template: template, context: combinedContext }, customContext);
        combinedContext = __assign(__assign({}, combinedContext), deeplinkPaths);
        var fixedTemplate = adaptTemplate(template, deeplinkPaths);
        var tracker = (0, template_interpolation_1.interpolate)(fixedTemplate, combinedContext).result;
        return addNetworkClickIds(tracker, combinedContext);
    }
};
function buildDeeplink(data, customContext) {
    var deeplinkTemplate = data.context.deep_link_path || data.context.deep_link || '';
    var context = __assign(__assign({}, data.context), customContext);
    // The first iteration, interpolates a template received from the BE, i.e. 
    // "{androidAppScheme}://{androidDeepLinkPath}" => "schema://some/path/{screen}" or
    // "{iosDeepLinkPath}" => "some/path/{screen}"
    deeplinkTemplate = (0, template_interpolation_1.interpolate)(deeplinkTemplate, context).result;
    // The second iteration, replaces placeholders in the deeplink path template i.e. 
    // "schema://some/path/{screen}" => "schema://some/path/promo" or 
    // "some/path/{screen}" => "some/path/promo"
    var deeplink = (0, template_interpolation_1.interpolate)(deeplinkTemplate, context).result;
    return {
        'deep_link_path': deeplink, // for ios
        'deep_link': encodeURIComponent(deeplink) // for android
    };
}
function adaptTemplate(template, context) {
    if ((0, detect_platform_1.getPlatform)() === detect_platform_1.Platform.iOS && context.deep_link_path.includes('?')) { // if ios deeplink path contains '?'
        // then replace '?' in the template with '&' to avoid invalid URL creation
        return template.replace('?', '&');
    }
    // otherwise do nothing with the template
    return template;
}
var NETWORK_CLICK_IDS = [
    // Note: fbpid isn't present in GET params, only in cookies, but client could add it manually via contex
    'fbclid', 'fbpid', // meta,
    'gclid', 'gbraid', 'wbraid', // google_ads
    'ttclid', 'ttp', // tiktok_web
    'mytarget_click_id', // vk_ads
    'ScCid', // snapchat_web
    'twclid' // x_web
];
/**
 * Writes SAN click ids to tracker link
 * @param tracker
 * @param context object containing click ids read from GET parameters of current page URL
 * @returns
 */
function addNetworkClickIds(tracker, context) {
    var lowerCasedContext = Object.entries(context).reduce(function (acc, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return __assign(__assign({}, acc), (_b = {}, _b[key.toLowerCase()] = value, _b));
    }, {});
    var foundClickIds = '';
    for (var _i = 0, NETWORK_CLICK_IDS_1 = NETWORK_CLICK_IDS; _i < NETWORK_CLICK_IDS_1.length; _i++) {
        var clickId = NETWORK_CLICK_IDS_1[_i];
        var key = clickId.toLowerCase();
        if (lowerCasedContext[key]) {
            foundClickIds = "".concat(foundClickIds, "&").concat(clickId, "=").concat(lowerCasedContext[key]);
        }
    }
    return "".concat(tracker).concat(foundClickIds);
}


/***/ }),

/***/ 7606:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseJson = parseJson;
/**
 * Wraps JSON.parse() with try-catch.
 * Returns parsed object if successfully parsed and null otherwise.
 */
function parseJson(str) {
    if (!str) {
        return null;
    }
    try {
        return JSON.parse(str);
    }
    catch (_a) {
        return null;
    }
}


/***/ }),

/***/ 7675:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerBody = void 0;
var action_button_1 = __webpack_require__(1819);
var app_icon_1 = __webpack_require__(9273);
var dismiss_button_1 = __webpack_require__(1397);
var text_1 = __webpack_require__(3313);
var impression_pixel_1 = __webpack_require__(5130);
var styles = __importStar(__webpack_require__(5215));
var BannerBody = /** @class */ (function () {
    function BannerBody(banner, onDismiss, trackerUrl, impressionUrl) {
        if (trackerUrl === void 0) { trackerUrl = ''; }
        if (impressionUrl === void 0) { impressionUrl = ''; }
        var _a, _b;
        this.banner = banner;
        this.bannerBody = document.createElement('div');
        this.bannerBody.className = styles['banner-body'];
        this.dismissButton = new dismiss_button_1.DismissButton(onDismiss, banner.dismissalButtonColor);
        this.appIcon = new app_icon_1.AppIcon(banner.iconUrl, banner.appName, banner.size);
        this.actionButton = new action_button_1.ActionButton(banner, trackerUrl);
        this.title = new text_1.BannerText(text_1.TextType.Title, banner.title, {
            color: banner.titleColor,
            fontSize: banner.titleFontSize,
            fontFamily: (_a = banner.titleFont) === null || _a === void 0 ? void 0 : _a.family
        });
        this.description = new text_1.BannerText(text_1.TextType.Description, banner.description, {
            color: banner.descriptionColor,
            fontSize: banner.descriptionFontSize,
            fontFamily: (_b = banner.descriptionFont) === null || _b === void 0 ? void 0 : _b.family
        });
        this.pixel = new impression_pixel_1.ImpressionPixel(impressionUrl);
    }
    BannerBody.prototype.renderBackground = function (backgroundColor, backgroundImageUrl) {
        if (backgroundColor) {
            this.bannerBody.style.backgroundColor = backgroundColor;
        }
        if (!backgroundImageUrl) {
            this.bannerBody.style.removeProperty('backgroundImage');
        }
        else if (this.bannerBody.style.backgroundImage !== "url(".concat(backgroundImageUrl, ")")) {
            // TODO: preload image before show?
            this.bannerBody.style.backgroundImage = "url(".concat(backgroundImageUrl, ")");
        }
    };
    BannerBody.prototype.renderInnerElements = function () {
        var container = document.createElement('div');
        container.className = styles.container;
        this.appIcon.render(container);
        var textContainer = document.createElement('div');
        textContainer.className = styles['text-container'];
        this.title.render(textContainer);
        this.description.render(textContainer);
        container.appendChild(textContainer);
        this.actionButton.render(container);
        return container;
    };
    BannerBody.prototype.render = function (root) {
        this.renderBackground(this.banner.backgroundColor, this.banner.backgroundImageUrl);
        this.dismissButton.render(this.bannerBody);
        this.bannerBody.appendChild(this.renderInnerElements());
        this.pixel.render(this.bannerBody);
        root.appendChild(this.bannerBody);
    };
    BannerBody.prototype.update = function (banner, trackerUrl, impressionUrl) {
        var _a, _b;
        this.dismissButton.update(banner.dismissalButtonColor);
        this.appIcon.update(banner.iconUrl, banner.appName);
        this.actionButton.update(banner, trackerUrl);
        this.title.update(banner.title, {
            color: banner.titleColor,
            fontSize: banner.titleFontSize,
            fontFamily: (_a = banner.titleFont) === null || _a === void 0 ? void 0 : _a.family
        });
        this.description.update(banner.description, {
            color: banner.descriptionColor,
            fontSize: banner.descriptionFontSize,
            fontFamily: (_b = banner.descriptionFont) === null || _b === void 0 ? void 0 : _b.family
        });
        this.pixel.update(impressionUrl);
        this.renderBackground(banner.backgroundColor, banner.backgroundImageUrl);
        this.banner = banner;
    };
    BannerBody.prototype.destroy = function () {
        this.dismissButton.destroy();
    };
    return BannerBody;
}());
exports.BannerBody = BannerBody;


/***/ }),

/***/ 7997:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 8014:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImpressionLinkBuilder = void 0;
var parse_get_params_1 = __webpack_require__(4579);
var template_interpolation_1 = __webpack_require__(8325);
exports.ImpressionLinkBuilder = {
    build: function (impressionData, pageUrl) {
        var _a = impressionData.impression_url, template = _a === void 0 ? '' : _a, context = impressionData.context;
        var combinedContext = __assign(__assign({}, context), (0, parse_get_params_1.parseGetParams)(pageUrl));
        return (0, template_interpolation_1.interpolate)(template, combinedContext).result;
    }
};


/***/ }),

/***/ 8189:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBannerLayoutFactory = void 0;
var smart_banner_view_1 = __webpack_require__(437);
var font_loader_1 = __webpack_require__(6374);
// eslint-disable-next-line
var emptyHandler = function () { };
var emptyLink = '';
var SmartBannerLayoutFactory = /** @class */ (function () {
    function SmartBannerLayoutFactory() {
    }
    SmartBannerLayoutFactory.createPreview = function (data) {
        (0, font_loader_1.loadFontsFromViewData)(data);
        return new smart_banner_view_1.SmartBannerView(data, emptyLink, emptyLink, emptyHandler);
    };
    SmartBannerLayoutFactory.createViewForSdk = function (data, trackerUrl, impressionUrl, onDismiss) {
        (0, font_loader_1.loadFontsFromViewData)(data);
        return new smart_banner_view_1.SmartBannerView(data, trackerUrl, impressionUrl, onDismiss);
    };
    return SmartBannerLayoutFactory;
}());
exports.SmartBannerLayoutFactory = SmartBannerLayoutFactory;


/***/ }),

/***/ 8325:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.interpolate = interpolate;
var logger_1 = __webpack_require__(1744);
/**
 * Replaces in template all occurences of parameters in curly brackets by values founded by names in context.
 * Logs a warning if there is no value for a certain placeholder.
 *
 * @param template a string containing parameter names in curly brackets
 * @param context an object containing parameters for interpolation
 * @param emptyPlaceholder string to be inserted when no value for parameter found, default value is "none"
 * @returns an object containing interpolated template as a result and a list of placeholders which were not replaced
 *
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof', name: 'Smith' });
 * console.log(greet.result); // prints "Hello, Prof Smith!"
 *
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof' });
 * console.log(greet.result); // prints "Hello, Prof none!"
 *
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof' }, 'unknown');
 * console.log(greet.result); // prints "Hello, Prof unknown!"
 */
function interpolate(template, context, emptyPlaceholder) {
    if (emptyPlaceholder === void 0) { emptyPlaceholder = 'none'; }
    var notReplacedPlaceholders = [];
    var re = /{(\w+)}/g;
    var replacer = function (_, paramName) {
        if (context[paramName] === undefined || context[paramName] === null) {
            notReplacedPlaceholders.push(paramName);
            logger_1.Logger.warn("No value for placeholder: {".concat(paramName, "}"));
            return emptyPlaceholder;
        }
        return String(context[paramName]);
    };
    return {
        result: template.replace(re, replacer),
        notReplaced: notReplacedPlaceholders
    };
}


/***/ }),

/***/ 8487:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.omitNotDefined = omitNotDefined;
/**
 *
 * @param obj
 * @returns
 */
function omitNotDefined(obj) {
    var isDefined = function (item) {
        var keys = Object.keys(item);
        return item[keys[0]] !== undefined && item[keys[0]] !== null;
    };
    return Object.keys(obj)
        .map(function (key) {
        var _a;
        return _a = {}, _a[key] = obj[key], _a;
    })
        .filter(isDefined)
        .reduce(function (acc, current) {
        return __assign(__assign({}, acc), current);
    }, {});
}


/***/ }),

/***/ 8645:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 8845:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertSmartBannerDataForView = convertSmartBannerDataForView;
var snake_to_camel_case_1 = __webpack_require__(9874);
/**
 * Converts SmartBannerData to SmartBannerViewData
 *
 * @returns A new object containing render options and localized labels and images
 */
function convertSmartBannerDataForView(banner, locale) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var id = banner.id, is_previous_attribution_priority = banner.is_previous_attribution_priority, name = banner.name, dismissal_period = banner.dismissal_period, tracker_url = banner.tracker_url, localizations = banner.localizations, display_rule = banner.display_rule, rest = __rest(banner, ["id", "is_previous_attribution_priority", "name", "dismissal_period", "tracker_url", "localizations", "display_rule"]);
    var renderData = (0, snake_to_camel_case_1.snakeToCamelCase)(rest);
    var texts = {};
    if (locale && banner.localizations[locale]) {
        var _a = localizations[locale], _context = _a.context, localization = __rest(_a, ["context"]);
        texts = (0, snake_to_camel_case_1.snakeToCamelCase)(localization);
    }
    return __assign(__assign({}, renderData), texts);
}


/***/ }),

/***/ 8971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmartBannerRepository = void 0;
var in_memory_storage_1 = __webpack_require__(6954);
/**
 * Fetches smart banners using SmartBannerApi and caches them
 */
var SmartBannerRepository = /** @class */ (function () {
    function SmartBannerRepository(networkDataSource, cache) {
        if (cache === void 0) { cache = new in_memory_storage_1.InMemoryStorage(); }
        this.networkDataSource = networkDataSource;
        this.cache = cache;
    }
    /**
     * Returns cached smart banners if exists, loads data using networkDataSource otherwise
     * @param token app token to retrieve data from networkDataSource, used as key for cached data
     */
    SmartBannerRepository.prototype.fetch = function (token) {
        var _this = this;
        var cachedBanners = this.cache.getItem(token);
        if (cachedBanners) {
            return Promise.resolve(cachedBanners);
        }
        return this.networkDataSource.retrieve(token)
            .then(function (banners) {
            if (banners) {
                _this.cache.setItem(token, banners);
            }
            return banners;
        });
    };
    return SmartBannerRepository;
}());
exports.SmartBannerRepository = SmartBannerRepository;


/***/ }),

/***/ 9088:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 9273:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppIcon = void 0;
var data_types_1 = __webpack_require__(4153);
var styles = __importStar(__webpack_require__(9671));
var AppIcon = /** @class */ (function () {
    function AppIcon(iconUrl, appName, bannerSize) {
        this.iconUrl = iconUrl;
        this.appName = appName;
        this.placeholder = document.createElement('div');
        this.placeholder.className = styles.placeholder;
        this.image = document.createElement('img');
        this.image.className = styles.image;
        this.image.alt = 'Application icon';
        if (bannerSize === data_types_1.BannerSize.Large) {
            this.image.width = 64;
            this.image.height = 64;
        }
        else {
            this.image.width = 56;
            this.image.height = 56;
        }
    }
    AppIcon.prototype.render = function (root) {
        var appIcon = document.createElement('div');
        appIcon.className = styles['app-icon'];
        appIcon.append(this.placeholder, this.image);
        this.showImage();
        root.appendChild(appIcon);
    };
    AppIcon.prototype.update = function (iconUrl, appName) {
        if (!this.needUpdate({ iconUrl: iconUrl, appName: appName })) {
            return;
        }
        this.iconUrl = iconUrl;
        this.appName = appName;
        this.showImage();
    };
    AppIcon.prototype.needUpdate = function (nextData) {
        return this.iconUrl !== nextData.iconUrl
            || this.appName !== nextData.appName;
    };
    AppIcon.prototype.showImage = function () {
        var _this = this;
        return this.loadImage(this.iconUrl, this.image)
            .then(function () {
            _this.image.style.display = '';
            _this.placeholder.style.display = 'none';
        })
            .catch(function () {
            _this.image.style.display = 'none';
            _this.placeholder.style.display = '';
            _this.placeholder.innerText = _this.appName.length ? _this.appName[0].toUpperCase() : '';
        });
    };
    AppIcon.prototype.loadImage = function (url, image) {
        return new Promise(function (resolve, reject) {
            image.onload = resolve;
            image.onerror = reject;
            image.src = url;
        });
    };
    return AppIcon;
}());
exports.AppIcon = AppIcon;


/***/ }),

/***/ 9383:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 9655:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.random = random;
// Returns an integer number in range [min, max).
function random(min, max) {
    if (min === max) {
        return min;
    }
    if (min > max) { // then swapping
        var temp = max;
        max = min;
        min = temp;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}


/***/ }),

/***/ 9671:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "app-icon": () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.w4),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   image: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.Sl),
/* harmony export */   placeholder: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.qf)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(250);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.locals : undefined);


/***/ }),

/***/ 9684:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetworkFactory = void 0;
var xhr_network_1 = __webpack_require__(964);
var NetworkFactory = /** @class */ (function () {
    function NetworkFactory() {
    }
    NetworkFactory.create = function (config) {
        var dataEndpoint = config.dataEndpoint || this.DEFAULT_DATA_ENDPOINT;
        var network = new xhr_network_1.XhrNetwork(dataEndpoint);
        return network;
    };
    NetworkFactory.DEFAULT_DATA_ENDPOINT = 'https://app.adjust.com';
    return NetworkFactory;
}());
exports.NetworkFactory = NetworkFactory;


/***/ }),

/***/ 9874:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringToCamelCase = stringToCamelCase;
exports.snakeToCamelCase = snakeToCamelCase;
/**
 * Transforms a string from snake_case or kebab-case to camelCase.
 * @param text
 * @returns
 */
function stringToCamelCase(text) {
    var a = text.replace(/[-_]+(.)?/g, function (_, c) { return c ? c.toUpperCase() : ''; });
    return a.substring(0, 1).toLowerCase() + a.substring(1);
}
/**
 * Transfroms recursively object keys from snake_case or kebab-case to camelCase.
 * @param obj an object to be transformed
 * @returns a new object with keys in camelCase
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function snakeToCamelCase(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }
    var entries = Object.entries(obj);
    var mappedEntries = entries.map(function (_a) {
        var k = _a[0], v = _a[1];
        return ["".concat(stringToCamelCase(k)), snakeToCamelCase(v)];
    });
    return Object.fromEntries(mappedEntries);
}


/***/ }),

/***/ 9893:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 9911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dismiss: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__.X)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5292);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9893);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9383);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6884);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9088);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4070);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 9921:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerProvider = void 0;
/**
 * Fetches banners from Repository and selects a matching one with BannerSelector
 */
var BannerProvider = /** @class */ (function () {
    function BannerProvider(appToken, repository, selector) {
        this.appToken = appToken;
        this.repository = repository;
        this.selector = selector;
        this.gettingBannerPromise = null;
        this.selectedBanner = null;
    }
    /**
     * Fetches banners, selects one of suitable ones and returns it with a timestamp when the banner should be shown, if
     * timestamp is negative, then the banners should be shown immediately.
     * If there is no suitable banners then returns null.
     */
    BannerProvider.prototype.fetchBanner = function (url) {
        var _this = this;
        if (this.gettingBannerPromise) {
            return this.gettingBannerPromise;
        }
        this.gettingBannerPromise = this.repository.fetch(this.appToken)
            .then(function (bannersList) {
            if (!bannersList) {
                return null;
            }
            _this.selectedBanner = _this.selector.next(bannersList, url);
            return _this.selectedBanner;
        })
            .finally(function () {
            _this.gettingBannerPromise = null;
        });
        return this.gettingBannerPromise;
    };
    Object.defineProperty(BannerProvider.prototype, "isLoading", {
        get: function () {
            return this.gettingBannerPromise !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BannerProvider.prototype, "banner", {
        get: function () {
            return this.selectedBanner;
        },
        enumerable: false,
        configurable: true
    });
    return BannerProvider;
}());
exports.BannerProvider = BannerProvider;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(4291);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});