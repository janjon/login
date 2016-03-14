/* eslint no-console: 0 */
"use strict";

const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const logger = require('morgan');

const config = require('./webpack.development.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3020 : process.env.PORT;
const app = express();
const apiURL = 'http://bjz.songniba.cc:1337/';

function proxy(target) {
  return httpProxy.createProxyServer({
    target
  }).on('error', (err) => {
    console.log(`proxy error: ${err}`);
  });
}

let apiProxy = proxy(apiURL);

app.use('/api',(req,res) =>{
  // req.url = `api/${req.url}`;
  apiProxy.web(req,res);
});

if (isDeveloping) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '192.168.0.141', function(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://192.168.0.141:%s/ in your browser.', port, port);
});
