'use strict';

let webpack = require('webpack');
let path = require('path');
let config = require('./webpack.config.base.js');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: path.join(__dirname, '/dist/'),
  filename: '[hash].[name].min.js'
};

config.plugins = config.plugins.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new ExtractTextPlugin('css/[name]-[hash].min.css'),
  new CommonsChunkPlugin({ name: 'common', filename: '[hash].common.min.js' })
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
  { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap', "postcss") },
  { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap') },
  { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['url?limit=10000&name=images/[hash].[name].[ext]'] },
  { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff',name: 'fonts/[hash].[name].[ext]' } },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/octet-stream',name: 'fonts/[hash].[name].[ext]' } },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file', query: { limit: 10000 },name: 'fonts/[hash].[name].[ext]' },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/image/svg+xml',name: 'fonts/[hash].[name].[ext]' } },
]);

module.exports = config;