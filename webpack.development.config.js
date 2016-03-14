'use strict';

let webpack = require('webpack');
let path = require('path');
let config = require('./webpack.config.base.js');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/dev-server'
  ].concat(config.entry);
}

config.devtool = 'cheap-module-eval-source-map';

config.output = {
  path: path.join(process.cwd(), '/dist/'),
  pathInfo: true,
  publicPath: '/',
  chunkFilename: '[id].chunk.js',
  filename: '[name].js'
};

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('[name].css'),
  new CommonsChunkPlugin({ name: 'common', filename: 'common.js' })
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
  { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap', "postcss") },
  { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap') },
  { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['url?limit=10000'] },
  { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff' } },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/octet-stream' } },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file', query: { limit: 10000 } },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/image/svg+xml' } },
]);

module.exports = config;
