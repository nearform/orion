(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const https = __webpack_require__(1)

module.exports = function(queryOrMutation) {
  const body = JSON.stringify({ query: queryOrMutation })

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: 'knowledgebase-hasura.herokuapp.com',
        path: '/v1alpha1/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-hasura-admin-secret': 'azPS7MbM5cHa',
        },
      },
      res => {
        res.setEncoding('utf8')

        const data = []

        res.on('error', err => reject(err))

        res.on('data', d => data.push(d))

        res.on('end', () =>
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data.join('')),
          })
        )
      }
    )

    request.on('error', err => reject(err))

    request.write(body)
    request.end()
  })
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
{
    version: '1',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_QeZSaIzBc',
    userName: 'simone3',
    callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-unknown',
        clientId: '2sdk5rf1kuk8ma9mn5e4mtklqf'
    },
    triggerSource: 'PostConfirmation_ConfirmSignUp',
    request: {
        userAttributes: {
            sub: '331fea42-48f4-4235-bd6f-70c7fdc46f27',
            'cognito:user_status': 'CONFIRMED',
            email_verified: 'true',
            phone_number_verified: 'false',
            phone_number: '+11132123234',
            email: 'simone.busoli+3@gmail.com'
        }
    },
    response: {}
}
*/

const graphql = __webpack_require__(0)

exports.handler = async event => {
  const queryRoles = `{
      role {
          id
          name
      }
  }`

  const {
    body: {
      data: { role },
    },
  } = await graphql(queryRoles)

  const createUser = `
    mutation createUser {
      insert_user(objects: {
          cognito_id: "${event.request.userAttributes.sub}"
          name: "${event.userName}"
          roles: {
              data: [{
                  role_id: ${role[0].id}
              }]
          }
      }) {
          returning {
              id
              cognito_id
          }
      }
  }
  `

  await graphql(createUser)

  return event
}


/***/ })
/******/ ]);
});