const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const detect = require('detect-port');
const portfinder = require('portfinder');

const DEFAULT_PORT = 3000;

const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const config = port => ({
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  devServer: {
    port,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    clientLogLevel: 'error'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_HOST: '"http://35.198.139.139/server/current/public/"'
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/favicon.ico', to: 'favicon.ico', toType: 'file' },
      { from: './src/lib/', to: 'lib/', toType: 'dir' },
      { from: './src/assets/', to: 'assets/', toType: 'dir' }
    ]),
    new ExtractTextPlugin({
      disable: false,
      filename: 'commons.css',
      allChunks: true
    }),
    new ScriptExtHtmlWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: 'dist/jquery.min.js',
          global: 'jQuery',
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]&mimetype=application/font-woff"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&name=assets/img/[name].[hash].[ext]&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|gif|jpe|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/img'
            }
          }
        ]
      }
    ]
  }
});

module.exports = detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    return config(DEFAULT_PORT);
  }

  return portfinder.getPortPromise().then(port => config(port));
});
