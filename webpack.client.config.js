/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDebug = !!process.env.IS_OFFLINE;

module.exports = {
  entry: './src/client/index.js',
  target: 'web',
  mode: isDebug ? 'development' : 'production',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: isDebug ? 'index.css' : 'index.[contenthash:8].css',
    }),
    new StatsWriterPlugin({
      transform(data) {
        return JSON.stringify({
          main: _.find(data.assetsByChunkName.main, pth => _.endsWith(pth, '.js')),
          css: _.find(data.assetsByChunkName.main, pth => _.endsWith(pth, '.css')),
        }, null, 2);
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // we shouldn't need processing `node_modules`
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Don't use .babelrc here but web browser optimized settings
              presets: [
                ['@babel/preset-env', {
                  targets: { browsers: ['last 2 versions'] },
                  debug: isDebug,
                }],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: 'url-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDebug ? 'index.js' : 'index.[contenthash:8].js',
  },
};
