"use strict";

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let context = path.resolve(process.cwd(), 'src');
let nodeModPath = path.resolve(process.cwd(), 'node_modules');

let NODE_ENV = process.env.NODE_ENV;

let env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  context: context,
  entry: [
    './index.jsx'
  ],

  output: undefined,

  resolve: {
    root: [context],
    alias:{
      images: path.join(context,"./images"),
      scss: path.join(context,"./scss"),
      stores: path.join(context,"./stores")
    },
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.tpl', '.png', '.jpg']
  },
  sassLoader: {
    includePaths: [path.resolve(context, "./scss"), path.resolve(nodeModPath, "compass-mixins/lib")]
  },
  postcss: function () {
    return [require('autoprefixer')];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  module: {
    loaders: [ ],
    noParse: /\.min\.js/
  }
};
