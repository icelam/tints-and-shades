const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseWebpackConfig = require('./webpack.base.conf');

const rendererWebpack = merge(baseWebpackConfig[0], {
  mode: 'production',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
    publicPath: './'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs'),
          from: '**/*.js',
          to: 'assets/js/vendors/webcomponents',
          globOptions: { ignore: ['**/.DS_Store'] }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkhash:8].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-report.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src/renderer'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'production'
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: (file) => {
          const notRendererSrc = !new RegExp(path.resolve(__dirname, '../src/renderer')).test(file);
          const notLitElement = !/node_modules\/(lit-element|lit-html|@webcomponents)\//.test(file);
          return notRendererSrc && notLitElement;
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'production'
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
                cssnano(
                  {
                    preset: ['default', {
                      discardComments: {
                        removeAll: true
                      }
                    }]
                  }
                )
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
});

const mainWebpack = merge(baseWebpackConfig[1], {
  mode: 'production',
  stats: 'errors-only',
  bail: true,
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin()
  ]
});

module.exports = [rendererWebpack, mainWebpack];
