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
         "react": false, // support react jsx syntax
       }
    ]]
}
```

Notice: If you set `browser` to `true`, the output will follow `UMD` standard. In this 
case, please make sure you has `moduleId` setting in `.babelrc` file. By default,
output will follow `commonjs` standard.

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

You can add `.build.env` file in root folder of 
your project as following:

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
load `.build.env.development` file if it existed. If you set `NODE_ENV` or `BABEL_ENV` to `production`
this plugin will load `.build.env.production` file.

## Production version
This preset use BABEL_ENV or NODE_ENV to determinate whether `production` version or not. by
default it is `development` version, the js file is not minified. When you change the environment
to `production`, the babel engine will minified all js output.

In addition, you can use `.build.env.production` to do more control in code. 