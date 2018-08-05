const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');
const postcssMergeRules = require('postcss-merge-rules');
const postcssMergeLonghands = require('postcss-merge-longhand');
const postcssMergeIdents = require('postcss-merge-idents');
const cssMqPacker = require('css-mqpacker');
const postcssSvgGo = require('postcss-svgo');
const discardComments = require('postcss-discard-comments');

const appEnv = process.env.NODE_ENV || 'development';
const envConfig = require(`./config/${appEnv}.js`);
const distPath = path.resolve(__dirname, 'dist');
const appPath = path.join(__dirname, 'src');

var config = {
  entry: [
    'index.js',
    'bootstrap/dist/js/bootstrap.min.js',
    'admin-lte/dist/js/app.min.js',
    'admin-lte/plugins/iCheck/icheck.min.js',
    'bootstrap/dist/css/bootstrap.min.css',
    'font-awesome/css/font-awesome.min.css',
    'ionicons/dist/css/ionicons.min.css',
    'admin-lte/dist/css/AdminLTE.min.css',
    'admin-lte/dist/css/skins/skin-blue.min.css',
    'admin-lte/plugins/iCheck/square/blue.css',
    'react-dropzone-component/styles/filepicker.css',
    'dropzone/dist/min/dropzone.min.css',
    'assets/css/site.css'
  ],

  output: {
    path: distPath,
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true,
    contentBase: '.',
    hot: true
  },

  resolve: {
    modules: [
      'node_modules',
      appPath
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      /*{
        test: /\.jsx?$/,
        enforce: 'pre',
        include: appPath,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc'
        }
      },*/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": [
            ["es2015", { "modules": false }],
            ["react"],
            ["stage-3"]
          ],
          "plugins": [
            "transform-flow-strip-types",
            ["transform-runtime", {
              "polyfill": false,
              "regenerator": true
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader?limit=5120&name=[path][name].[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url-loader?limit=5120&name=[path][name].[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENV: JSON.stringify(envConfig.__ENV),
      'process.env': { NODE_ENV: JSON.stringify(envConfig.__ENV) },
      CONFIG: JSON.stringify(envConfig)
    }),

    new CopyWebpackPlugin([{
      context: appPath,
      from: 'assets/**/*',
      to: distPath
    }]),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        output: { path: './' },
        /*eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
          failOnError: false,
          failOnWarning: false
        },*/
        htmlLoader: {
          root: appPath
        },
        sassLoader: {
          sourceMapContents: true
        },
        postcss: () => {
          return [
            discardComments,
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 10'
              ]
            }),
            postcssMergeRules,
            postcssMergeLonghands,
            postcssMergeIdents,
            cssMqPacker,
            postcssSvgGo,
          ]
        }
      }
    })
  ]
}

if (appEnv !== 'production' && appEnv !== 'staging') {
  config.output.publicPath = 'http://localhost:8080/';
}

if (appEnv === 'staging') {
  config.output.publicPath = 'http://localhost:63982/';
}

if (appEnv === 'production') {
  config.plugins.push(
    new CleanWebpackPlugin([distPath]),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );

  config.devtool = 'source-map';
}

module.exports = config;