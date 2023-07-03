/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getQR: () => (/* binding */ getQR)
/* harmony export */ });
var qrConfig;
function getQR(config) {
  qrConfig = config;
  getVCAuth("https://cdnjs.cloudflare.com/ajax/libs/oidc-client/1.11.5/oidc-client.js", scriptLoaded);
}
function getVCAuth(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}
function CreateSignIn(obj) {
  var REDIRECT_URI = window.origin + '/verification-callback.html';
  window.sessionStorage.setItem('connectionlessVCAuthUrl', obj.AUTH_BASE_URL);
  var Constants = {
    stsAuthority: "".concat(obj.AUTH_BASE_URL, "/"),
    clientId: "".concat(obj.VCAUTH_CLIENT_ID),
    clientRoot: "".concat(obj.WEBAPP_URL),
    clientScope: "openid profile vc_authn",
    apiRoot: "https://demo.identityserver.io/api/"
  };
  var settings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: "".concat(REDIRECT_URI),
    silent_redirect_uri: "".concat(Constants.clientRoot, "silent-callback.html"),
    post_logout_redirect_uri: "".concat(Constants.clientRoot),
    response_type: "code",
    scope: Constants.clientScope,
    loadUserInfo: false
  };
  var userManager = new window.Oidc.UserManager(settings);
  userManager.settings.metadata = {
    issuer: "".concat(obj.AUTH_BASE_URL, "/"),
    jwks_uri: "".concat(obj.AUTH_BASE_URL, "/.well-known/openid-configuration/jwks"),
    authorization_endpoint: "".concat(obj.AUTH_BASE_URL, "/vc/connect/authorize?pres_req_conf_id=").concat(obj.VCAUTH_CONFIG_ID),
    token_endpoint: "".concat(obj.AUTH_BASE_URL, "/vc/connect/token"),
    userinfo_endpoint: "".concat(obj.AUTH_BASE_URL, "/connect/userinfo"),
    //end_session_endpoint: `${obj.AUTH_BASE_URL}/vc/connect/endsession`,
    check_session_iframe: "".concat(obj.AUTH_BASE_URL, "/vc/connect/checksession"),
    revocation_endpoint: "".concat(obj.AUTH_BASE_URL, "/vc/connect/revocation")
  };
  userManager.createSigninRequest().then(function (response) {
    console.log("Response URl: " + response.url);
    window.postMessage({
      type: 'qrReceived',
      data: response.url
    });
  }, function (error) {
    console.log(error);
  });
  return "Hello";
}
function scriptLoaded(event) {
  CreateSignIn(qrConfig);
}
var WipVCAuth = {
  "getQR": getQR
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WipVCAuth);
window.WipVCAuth = __webpack_exports__["default"];
/******/ })()
;
