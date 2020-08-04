/* eslint "import/no-extraneous-dependencies": ["error", {"optionalDependencies": false} ] */
const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    chunkFilename: './assets/js/[name].chunk.js'
  },
  devServer: {
    open: false,
    inline: true,
    host: '0.0.0.0',
    port: 8888,
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src/renderer'),
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.(js)$/,
        exclude: (file) => {
          const notSrc = !new RegExp(path.resolve(__dirname, '../src/renderer')).test(file);
          const notLitElement = !/node_modules\/(lit-element|lit-html|@webcomponents)\//.test(file);
          return notSrc && notLitElement;
        },
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap=true',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer()
              ]
            }
          },
          'sass-loader?sourceMap=true'
        ]
      }
    ]
  }
});
