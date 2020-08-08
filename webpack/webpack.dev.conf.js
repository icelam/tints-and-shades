const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const WebpackElectronReloadPlugin = require('./plugins/webpack-electron-reload-plugin.js');

const baseWebpackConfig = require('./webpack.base.conf');

const rendererWebpack = merge(baseWebpackConfig[0], {
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
    historyApiFallback: true,
    clientLogLevel: 'trace',
    // Webpack dev server seems to only accept the first devSever config in mulit-compiler mode
    // Allowing main.js to write to disk so that electron can start
    writeToDisk: (filePath) => {
      const filesToEmit = [/main\.js$/, /icon\.png$/];
      return filesToEmit.some((file) => file.test(filePath));
    }
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
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.(js)$/,
        exclude: (file) => {
          const notLitElement = !/node_modules\/(lit-element|lit-html|@webcomponents)\//.test(file);
          return notLitElement;
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

const mainWebpack = merge(baseWebpackConfig[1], {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new WebpackElectronReloadPlugin({
      startCommand: 'yarn start:electron'
    })
  ]
});

module.exports = [rendererWebpack, mainWebpack];
