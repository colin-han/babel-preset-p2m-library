/**
 * Created by colinhan on 18/04/2017.
 */
const presetES2015 = require("babel-preset-es2015");
const presetES2016 = require("babel-preset-es2016");
const presetES2017 = require("babel-preset-es2017");
const presetFlow = require('babel-preset-flow');
const presetReact = require('babel-preset-react');

const pluginUmd = require('babel-plugin-transform-es2015-modules-umd');
const pluginDefine = require('babel-plugin-transform-define');
const pluginDotenv = require('babel-plugin-dotenv');

const defaultOptions = {
  react: false,
  browser: false,
  env: 'development',
};

function normalize(opts) {
  return Object.assign({}, defaultOptions, opts);
}
module.exports = function (context, opts = {}) {
  opts = normalize(opts);

  let DEBUG = (process.env.BABEL_ENV === 'development' || !process.env.BABEL_ENV);

  let base = {
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
        opts.browser && pluginUmd,
        [pluginDotenv, {
          replacedModuleName: 'dotenv',
          filename: '.build.env',
        }]
    ].filter(Boolean),
  };

  return base;
};