const path = require('path');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const baseConfig = require('./webpack.base.config');

const nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig.mode = 'production';
baseConfig.devtool = 'source-map';

baseConfig.entry = ['whatwg-fetch', 'core-js/stable', './frontend/js/index.js'];

baseConfig.output = {
  path: path.resolve('./frontend/webpack_bundles/'),
  publicPath: '/static/webpack_bundles/',
  filename: '[name]-[hash].js',
};

baseConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
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
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  }
);

baseConfig.optimization = {
  minimize: true,
  splitChunks: {
    chunks: 'all',
  },
};

baseConfig.plugins = [
  new webpack.DefinePlugin({
    // removes React warnings
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
  new BundleTracker({
    filename: './webpack-stats.json',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer],
    },
  }),
];

module.exports = baseConfig;
