const path = require('path');

const autoprefixer = require('autoprefixer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const baseConfig = require('./webpack.base.config');

const nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig.mode = 'development';

baseConfig.entry = [
  'react-hot-loader/patch',
  'whatwg-fetch',
  'core-js/stable',
  './frontend/js/index.js',
];

baseConfig.optimization = {
  splitChunks: {
    chunks: 'all',
  },
};

baseConfig.output = {
  path: path.resolve('./frontend/bundles/'),
  publicPath: 'http://localhost:3000/frontend/bundles/',
  filename: '[name].js',
};

baseConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    ],
  }
);

baseConfig.plugins = [
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/,
  }),
  new BundleTracker({
    filename: './webpack-stats.json',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer],
    },
  }),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd(),
  }),
];

baseConfig.resolve.alias = {
  'react-dom': '@hot-loader/react-dom',
};

module.exports = baseConfig;
