/* eslint "import/no-extraneous-dependencies": ["error", {"optionalDependencies": false} ] */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: [path.resolve(__dirname, '../src/renderer/index.ts')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist/**/*'), `!${path.join(__dirname, '../dist/main.js')}`]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/renderer/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.ts', '.json', '.scss', '.svg'],
    alias: {
      '@components': path.resolve(__dirname, '../src/renderer/components'),
      '@fonts': path.resolve(__dirname, '../src/renderer/assets/fonts'),
      '@images': path.resolve(__dirname, '../src/renderer/assets/images'),
      '@styles': path.resolve(__dirname, '../src/renderer/assets/scss'),
      '@utils': path.resolve(__dirname, '../src/renderer/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      { test: /\.svg$/,
        loader: 'svg-inline-loader',
        exclude: [
          path.resolve(__dirname, '../src/renderer/assets/fonts')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/renderer/assets/fonts')
        ],
        options: {
          limit: -1,
          name: 'assets/images/[ext]/[name].[hash:7].[ext]',
          esModule: false // to solve [object Module] url in html
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/renderer/assets/images')
        ],
        options: {
          limit: -1,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};
