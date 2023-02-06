const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const namespace = 'adjust_smart_banner';

module.exports = () => ({
  mode: 'production',
  entry: {
    'adjust-sb-latest': path.resolve(__dirname, 'src/main.ts'),
    'adjust-sb-latest.min': path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'AdjustSmartBanner',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/
    })]
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      __ADJUST_SB__NAMESPACE: JSON.stringify(namespace),
      __ADJUST_SB__SDK_VERSION: JSON.stringify(packageJson.version)
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{
      use: 'ts-loader',
      test: /\.(ts|js)$/,
      exclude: /node_modules/
    }, {
      test: /\.module\.s?css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: 'adjust-sb__[hash:base64]',
            }
          },
        },
        { loader: 'sass-loader' }
      ]
    }]
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.push({
        name: 'fake-data-provider',
        path: '/smart_banners/v1/',
        middleware: (req, res) => {

          if (req.query) {
            const app_token = req.query.app_token;
            if (!app_token) {
              res.send('You should provide app_token');
              return;
            }

            const platform = req.query.platform;
            if (!platform) {
              res.send('You should provide platform');
              return;
            }

            const fakeData = require('./fake-server/smart_banners.json');

            if (fakeData[platform]) {
              res.send(fakeData[platform]);
              return;
            }
          }

          res.send('No data found');
        },
      });

      return middlewares;
    },
  },
});
