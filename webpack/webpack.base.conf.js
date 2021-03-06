const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {
  '@components': path.resolve(__dirname, '../src/renderer/components'),
  '@fonts': path.resolve(__dirname, '../src/renderer/assets/fonts'),
  '@images': path.resolve(__dirname, '../src/renderer/assets/images'),
  '@pages': path.resolve(__dirname, '../src/renderer/pages'),
  '@styles': path.resolve(__dirname, '../src/renderer/assets/scss'),
  '@constants': path.resolve(__dirname, '../src/constants.ts'),
  '@menus': path.resolve(__dirname, '../src/menus'),
  '@storage': path.resolve(__dirname, '../src/storage'),
  '@translations': path.resolve(__dirname, '../src/translations'),
  '@types': path.resolve(__dirname, '../src/types.ts'),
  '@utils': path.resolve(__dirname, '../src/utils')
};

const rendererWebpack = {
  // target: 'electron-renderer',
  entry: {
    app: [path.resolve(__dirname, '../src/renderer/index.ts')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        webcomponets: {
          test: /\/node_modules\/@webcomponents\//,
          name: 'webcomponents'
        }
      }
    },
    concatenateModules: true
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(__dirname, '../dist/**/*')
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/renderer/index.pug'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.ts', '.json', '.scss', '.svg'],
    alias
  },
  module: {
    rules: [
      {
        test: /\.pug(\?.*)?$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.svg(\?.*)?$/,
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

const mainWebpack = {
  target: 'electron-main',
  entry: {
    main: [path.resolve(__dirname, '../src/main.ts')],
    preload: [path.resolve(__dirname, '../src/preload.ts')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
    alias
  },
  node: {
    __filename: false,
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../resources/icons/512x512.png'),
          to: './icon.png'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: (file) => /node_modules\//.test(file),
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.(js)$/,
        exclude: (file) => /node_modules\//.test(file),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  }
};

module.exports = [rendererWebpack, mainWebpack];
