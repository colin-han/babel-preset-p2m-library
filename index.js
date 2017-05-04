/**
 * Created by colinhan on 18/04/2017.
 */
const presetES2015 = require("babel-preset-es2015");
const presetES2016 = require("babel-preset-es2016");
const presetES2017 = require("babel-preset-es2017");
const presetFlow = require('babel-preset-flow');
const presetReact = require('babel-preset-react');

const pluginUmd = require('babel-plugin-transform-es2015-modules-umd');
const pluginDotenv = require('babel-plugin-dotenv');

const defaultOptions = {
  react: false,
  browser: false,
  env: 'development',
  globals: {},
};

function normalize(opts) {
  return Object.assign({}, defaultOptions, opts);
}
module.exports = function (context, opts = {}) {
  opts = normalize(opts);

  let env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  let DEBUG = (env === 'development');

  let globals = opts.globals, moduleId = opts.moduleId;
  if (opts.browser) {
    if (!moduleId) {
      throw new Error('"moduleId" option is required if your turn on "browser" option');
    }
    globals[moduleId] = moduleId.replace(/\//g, '.');
  }

  return {
    comments: DEBUG,
    minified: !DEBUG,
    presets: [
      presetES2015,
      presetES2016,
      presetES2017,
      presetFlow,
      opts.react && presetReact,
    ].filter(Boolean),
    plugins: [
      opts.browser && [pluginUmd, {
        "exactGlobals": true,
        globals,
      }],
      [pluginDotenv, {
        replacedModuleName: 'dotenv',
        //filename: '.build.env',
      }]
    ].filter(Boolean),
    moduleId,
  };
};