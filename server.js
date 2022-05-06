// Webpack dev server
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.local.config';

const path = require('path');

new WebpackDevServer(webpack(config), {
  static: {
    directory: path.join(__dirname, 'frontend/bundles/'),
  },
  devMiddleware: {
    publicPath: config.output.publicPath,
  },
  hot: 'only',
  port: 3000,
  historyApiFallback: { index: `/index.html` },
  headers: { 'Access-Control-Allow-Origin': '*' },
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
