# babel-preset-p2m-library

A babel preset used by Shanghai PTM company to build shared library.

# Usage
Include this preset into .babelrc as following:
``` javascript 
{
  "presets": [
    ["p2m-library",
       {
         "browser": false, // generator library for browser, otherwise, it is for node.js
         "moduleId": "your/module/id", 
         "react": false, // support react jsx syntax
       }
    ]]
}
```

# Features

## Support ES version
This preset include `ES2015`, `ES2016` and `ES2017` presets.

## Support Flow syntax
This preset include [babel-preset-flow](https://www.npmjs.com/package/babel-preset-flow) preset.
So you can use all flow syntex in your js file.

## Build environment
This preset use [babel-plugin-dotenv](https://www.npmjs.com/package/babel-plugin-dotenv) to
transform pre-define variable on build time. When you use this function, please ensure that
you had add `dotenv` as dependency of your project. 

You can add `.env` file in root folder of your project as following:

```bash
# .build.env
API_HOST=http://localhost:8080
```

then, you can import `API_HOST` from `dotenv` as following:
 
```javascript
import {API_HOST} from 'dotenv';

console.log(API_HOST);
```

Variable `API_HOST` will be replaced when build this project. the output could be like follow.

```javascript
console.log('http://localhost:8080');
```

In addition, this plugin support multiple env file for different environment. By default, it
load `.env.development` file if it existed. If you set `NODE_ENV` or `BABEL_ENV` to `production`
this plugin will load `.env.production` file.

## Production version
This preset use BABEL_ENV or NODE_ENV to determinate whether `production` version or not. by
default, it is `development` version, All js files are not minified. If you change the environment
to `production`, the babel engine will minified all js files.

In addition, you can use `.env.production` to do more control in code.
 
## Browser support
If you turn on `browser` option, this preset will build js file as an `UMD` module. In this case
you must specified `moduleId` option. This option should be a `/` separated string. For example:

```javascript
["p2m-library", {
  "browser": true,
  "moduleId": "p2m/message/client"
}]
```

Thus, the following javascript file

```javascript
export default 'abc';
```

will be compiled as fillowing:

```javascript
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("p2m/message/client", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.p2m = global.p2m || {};
    global.p2m.message = global.p2m.message || {};
    global.p2m.message.client = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = "abc";
});
```

If you use some external modules, you can use `globals` option to specified global variable for
these libraries. For example, if you want use jquery. You can add following options.

```javascript
["p2m-library", {
  "browser": true,
  "moduleId": "p2m/message/client",
  "globals": {
    "jquery": "$"
  }
}]
```

Result is just like following:

source:
```javascript
const jq = require('jquery');
export default jq('div');
```

output:
```javascript
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('p2m/message/client', ['exports', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.$);
    global.p2m = global.p2m || {};
    global.p2m.message = global.p2m.message || {};
    global.p2m.message.client = mod.exports;
  }
})(this, function (exports, jq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = jq('div');
});
```