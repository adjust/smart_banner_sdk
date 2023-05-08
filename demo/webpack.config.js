const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => ({
  mode: 'production',
  entry: ['./src/demo.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new ESLintPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: "tsconfig.demo.json" }
          }
        ]
      }, {
        test: /\.module\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
              }
            },
          },
          { loader: 'sass-loader' }
        ]
      }]
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/demo' },
      ],
    },
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

            const fakeData = require('./fake-data/smart_banners.json');

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
