// @license Copyright (C) 2015 Erik Ringsmuth - MIT license
!function(t,e){function r(t,r,a){var i=e.createEvent("CustomEvent");return i.initCustomEvent(t,!1,!0,r),a.dispatchEvent(i)}function a(t){var e=t.parseUrl();if(e.hash!==m.hash&&e.path===m.path&&e.search===m.search&&e.isHashPath===m.isHashPath)return void p(e.hash);m=e;var a={path:e.path};if(r("state-change",a,t)){for(var n=t.firstElementChild;n;){if("APP-ROUTE"===n.tagName&&n.isMatchUrl(e.path))return void i(t,n,e);n=n.nextSibling}r("not-found",a,t)}}function i(e,a,i){if(e.activeRoute==a){var s=a.currentUrl;if(a.getUrlFullMatch(s.path)==a.getUrlFullMatch(i.path)&&s.search==i.search)return}var l={path:i.path,route:a,oldRoute:e.activeRoute};if(r("activate-route-start",l,e)&&r("activate-route-start",l,a)){if(a.hasAttribute("redirect"))return void e.go(a.getRedirectUrl(i.path),{replace:!0});var f=h(e,a,i,l);if(a.model=f,e.activeRoute&&e.activeRoute===a&&a.firstElementChild&&a.hasAttribute("element")){for(var p in f)f.hasOwnProperty(p)&&(a.firstElementChild[p]=f[p]);return void(e.activeRoute.currentUrl=i)}if(e.previousRoute&&e.previousRoute.transitionAnimationInProgress&&c(e.previousRoute),e.activeRoute&&e.activeRoute.removeAttribute("active"),e.previousRoute=e.activeRoute,e.activeRoute=a,e.activeRoute.setAttribute("active","active"),e.activeRoute.currentUrl=i,a.hasAttribute("import"))n(e,a.getAttribute("import"),a,i,l);else if(a.hasAttribute("element")){var g=a.getAttribute("element");t.mpWeb?t.mpWeb["import"](g,a.getAttribute("directory")).done(function(){u(e,g,a,i,l)}):u(e,a.getAttribute("element"),a,i,l)}else a.firstElementChild&&"TEMPLATE"===a.firstElementChild.tagName&&o(e,a.firstElementChild,a,i,l)}}function n(t,r,a,i,n){function u(){s(t,o,r,a,i,n)}var o;d.hasOwnProperty(r)?(o=e.querySelector('link[href="'+r+'"]'),o["import"]?u():o.addEventListener("load",u)):(d[r]=!0,o=e.createElement("link"),o.setAttribute("rel","import"),o.setAttribute("href",r),o.addEventListener("load",u),e.head.appendChild(o))}function s(t,e,r,a,i,n){a.hasAttribute("active")&&(a.hasAttribute("template")?o(t,e["import"].querySelector("template"),a,i,n):u(t,a.getAttribute("element")||r.split("/").slice(-1)[0].replace(".html",""),a,i,n))}function u(t,r,a,i,n){var s=e.createElement(r),u=h(t,a,i,n);for(var o in u)u.hasOwnProperty(o)&&(s[o]=u[o]);l(t,s,i,n)}function o(t,r,a,i,n){var s;if("createInstance"in r){var u=h(t,a,i,n);s=r.createInstance(u)}else s=e.importNode(r.content,!0);l(t,s,i,n)}function h(t,e,a,i){var n=v.routeArguments(e.getAttribute("path"),a.path,a.search,e.hasAttribute("regex"),"auto"===t.getAttribute("typecast"));return(e.hasAttribute("bindRouter")||t.hasAttribute("bindRouter"))&&(n.router=t),i.model=n,r("before-data-binding",i,t),r("before-data-binding",i,i.route),i.model}function l(t,e,a,i){t.hasAttribute("core-animated-pages")&&i.route!==i.oldRoute||f(t.previousRoute),t.activeRoute.appendChild(e),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path"),t.previousRoute&&(t.previousRoute.transitionAnimationInProgress=!0)),a.hash&&!t.hasAttribute("core-animated-pages")&&p(a.hash),r("activate-route-end",i,t),r("activate-route-end",i,i.route)}function c(t){t&&(t.transitionAnimationInProgress=!1,f(t))}function f(t){if(t)for(var e=t.firstChild;e;){var r=e;e=e.nextSibling,"TEMPLATE"!==r.tagName&&t.removeChild(r)}}function p(t){t&&setTimeout(function(){var r=e.querySelector("html /deep/ "+t)||e.querySelector('html /deep/ [name="'+t.substring(1)+'"]');r&&r.scrollIntoView&&r.scrollIntoView(!0)},0)}function g(t,e,r,a,i){var n=t[e],s=r[a];if("**"===n&&e===t.length-1)return!0;if("undefined"==typeof n||"undefined"==typeof s)return n===s;if(n===s||"*"===n||":"===n.charAt(0))return":"===n.charAt(0)&&"undefined"!=typeof i&&(i[n.substring(1)]=r[a]),g(t,e+1,r,a+1,i);if("**"===n)for(var u=a;u<r.length;u++)if(g(t,e+1,r,u,i))return!0;return!1}var v={},d={},b="ActiveXObject"in t,m={},R=Object.create(HTMLElement.prototype);R.util=v;var A=Object.create(HTMLElement.prototype),P=Object.create(HTMLElement.prototype);A.attachedCallback=function(){this._defineParentRouter()},A._defineParentRouter=function(){for(var t,e=v.getParents(this),r=0;r<e.length;r++){var a=e[r];if("APP-ROUTER"==a.tagName){t=a;break}}this.parentRouter=t},A.isMatchUrl=function(t){return null!=this.getUrlFullMatch(t)},A._isFromRoot=function(t){return t=t||this.getAttribute("path"),"/"===t.substr(0,1)},A.getUrlFullMatch=function(t){t=null!=t?t:this.parentRouter.parseUrl().path,t=v.normalizePath(t,!1);var e="";if(!this._isFromRoot()){if(this.parentRouter&&(e=this.parentRouter.getUrlFullMatch(t)),null==e)return null;e=v.normalizePath(e,!1)}t=t.substr(e.length);var r=this.getUrlMatch(t);return null==r?null:e+r},A.getUrlMatch=function(t){var e=this.getAttribute("path"),r=this.parentRouter.getAttribute("trailingSlash"),a=this.parentRouter.hasAttribute("regex");if(t=v.normalizePath(t,"ignore"===r),e=v.normalizePath(e,"ignore"===r&&!a),a)return v.testRegExString(e,t);if("*"===e)return t;for(var i=e.split("/"),n=t.split("/"),s=!0,u=[],o=0;o<i.length;o++){var h=i[o],l=n[o];if(h!=l)if(":"!==h.substr(0,1)){if("*"===h.substr(0,1))break;s=!1}else u.push(l);else u.push(l)}return s?u.join("/"):null},A.getRedirectUrl=function(t){var e=this.getAttribute("redirect"),r="";return this._isFromRoot(e)||(this.parentRouter&&(r=this.parentRouter.getUrlFullMatch(t)),r=v.normalizePath(r,!0)),r+e},A.getLinkHref=function(t){var e;if("/"===t.substr(0,1))e=this.getBaseRouter(),t=t.substr(1);else if("./"===t.substr(0,2)||"../"===t.substr(0,3)){var r=t.match(/^((\.\/|\.\.\/)*)(.*)$/);t=r[3];var a=r[1];e=this.getRouterByHref(a)}else t=v.normalizePath(this.getUrlFullMatch(),!0,!1)+t,e=this.parentRouter;return e.createHref(t)},A.getRouterByHref=function(t,e){if("./"===t.substr(0,2))e=e||this.parentRouter,t=t.substr(2);else{if("../"!==t.substr(0,3))return e;e=(e||this.parentRouter).getParentRouter()||e,t=t.substr(3)}return this.getRouterByHref(t,e)},A.getBaseRouter=function(){for(var t=this.parentRouter;;){var e=t.getParentRouter();if(!e)break;t=e}return t},R.attachedCallback=function(){this._defineParentRoute(),"manual"!==this.getAttribute("init")&&this.init()},R._defineParentRoute=function(){for(var t,e=v.getParents(this),r=0;r<e.length;r++){var a=e[r];if("APP-ROUTE"==a.tagName){t=a;break}}this._hostRoute=t},R.getParentRouter=function(){return this._hostRoute&&this._hostRoute.parentRouter},R.getUrlFullMatch=function(t){return t=null!=t?t:this.parseUrl().path,this._hostRoute?this._hostRoute.getUrlFullMatch(t):""},R.parseUrl=function(e){return e=null!=e?e:t.location.href,v.parseUrl(e,this.getAttribute("mode"))},R.createHref=function(t){var e=v.normalizePath(this.getUrlFullMatch(),!0,!0);return this.getGoPath(e+t)},R.init=function(){var r=this;r.isInitialized||(r.isInitialized=!0,r.hasAttribute("trailingSlash")||r.setAttribute("trailingSlash","strict"),r.hasAttribute("mode")||r.setAttribute("mode","auto"),r.hasAttribute("typecast")||r.setAttribute("typecast","auto"),r.hasAttribute("core-animated-pages")&&(r.createShadowRoot(),r.coreAnimatedPages=e.createElement("core-animated-pages"),r.coreAnimatedPages.appendChild(e.createElement("content")),r.coreAnimatedPages.style.position="static",r.coreAnimatedPages.setAttribute("valueattr","path"),r.coreAnimatedPages.setAttribute("transitions",r.getAttribute("transitions")),r.shadowRoot.appendChild(r.coreAnimatedPages),r.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){c(r.previousRoute)})),r.stateChangeHandler=a.bind(null,r),t.addEventListener("popstate",r.stateChangeHandler,!1),b&&t.addEventListener("hashchange",r.stateChangeHandler,!1),setTimeout(function(){a(r)},0))},R.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),b&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},R.go=function(r,a){if(r=this.getGoPath(r),location.hash!==r){a&&a.replace===!0?t.history.replaceState(null,null,r):t.history.pushState(null,null,r);try{var i=new PopStateEvent("popstate",{bubbles:!1,cancelable:!1,state:{}});"dispatchEvent_"in t?t.dispatchEvent_(i):t.dispatchEvent(i)}catch(n){var s=e.createEvent("CustomEvent");s.initCustomEvent("popstate",!1,!1,{state:{}}),t.dispatchEvent(s)}}},R.getGoPath=function(t){return"pushstate"!==this.getAttribute("mode")&&"#"!=t.substr(0,1)&&(t="#"+t),t},P.attachedCallback=function(){this._defineParentRoute(),this.recountHref()},P._defineParentRoute=function(){for(var t,e=v.getParents(this),r=0;r<e.length;r++){var a=e[r];if("APP-ROUTE"==a.tagName){t=a;break}}this._hostRoute=t},P.recountHref=function(){var t=this.getAttribute("href"),e=this._hostRoute.getUrlFullMatch();this.fullHref=e+t},P.go=function(){this._hostRoute.parentRouter.go(this.fullHref)},v.parseUrl=function(t,r){var a={isHashPath:"hash"===r};if("function"==typeof URL){var i=new URL(t);a.path=i.pathname,a.hash=i.hash,a.search=i.search}else{var n=e.createElement("a");n.href=t,a.path=n.pathname,"/"!==a.path.charAt(0)&&(a.path="/"+a.path),a.hash=n.hash,a.search=n.search}if("pushstate"!==r&&("#/"===a.hash.substring(0,2)?(a.isHashPath=!0,a.path=a.hash.substring(1)):"#!/"===a.hash.substring(0,3)?(a.isHashPath=!0,a.path=a.hash.substring(2)):a.isHashPath&&(a.path=0===a.hash.length?"/":a.hash.substring(1)),a.isHashPath)){a.hash="";var s=a.path.indexOf("#");-1!==s&&(a.hash=a.path.substring(s),a.path=a.path.substring(0,s));var u=a.path.indexOf("?");-1!==u&&(a.search=a.path.substring(u),a.path=a.path.substring(0,u))}return a},v.testRoute=function(t,e,r,a){return"ignore"===r&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||a||(t=t.slice(0,-1))),a?v.testRegExString(t,e):t===e||"*"===t?!0:("/"!==t.charAt(0)&&(t="/**/"+t),g(t.split("/"),1,e.split("/"),1))},v.routeArguments=function(t,e,r,a,i){var n={};a||("/"!==t.charAt(0)&&(t="/**/"+t),g(t.split("/"),1,e.split("/"),1,n));var s=r.substring(1).split("&");1===s.length&&""===s[0]&&(s=[]);for(var u=0;u<s.length;u++){var o=s[u],h=o.split("=");n[h[0]]=h.splice(1,h.length-1).join("=")}if(i)for(var l in n)n[l]=v.typecast(n[l]);return n},v.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},v.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var r="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),r="i"}return new RegExp(t,r).test(e)},v.getParents=function(t,e){e=e||[];var r;return r=11==t.nodeType?t.host:t.parentNode,r?(e.push(r),v.getParents(r,e)):e},v.getHostRoute=function(t){for(var e=v.getParents(t),r=0;r<e.length;r++){var a=e[r];if("APP-ROUTE"==a.tagName)return a}return null},v.getHostRouter=function(t){for(var e=v.getParents(t),r=0;r<e.length;r++){var a=e[r];if("APP-ROUTER"==a.tagName)return a}return null},v.normalizePath=function(t,e,r){return r=r!==!1,e=e===!0,"/"===t.substr(0,1)?r||(t=t.substr(1)):r&&(t="/"+t),"/"===t.slice(-1)?e||(t=t.slice(0,-1)):e&&(t+="/"),t},t.__AppRouterConstructors=[R,A,P]}(window,document);