// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'src'; // the app root folder: src, src_users, etc
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

var webpack = require('webpack')
const pkg = require('./package.json');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');

const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: useHMR,
  presets: pkg.babel.presets.map(x => x === 'latest' ? ['latest', { es2015: { modules: false } }] : x),
});

module.exports = {
  app_root: app_root, // the app root folder, needed by the other webpack configs
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  output: {
    path: __dirname + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
    chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        options: babelConfig,
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },

    ],
  },
  devtool: isDebug ? 'source-map' : false,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: true,
    version: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true,
  },

  devServer: {
    contentBase: __dirname + '/public',
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false, // true for simulation
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../public/'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    
  ],
};
