const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devPort = 8080;

module.exports = (env, args) => ({
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
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: './assets/index.html'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.svg'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: 'tsconfig.demo.json' }
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
                localIdentName: '[local]_[hash:base64:5]',
              }
            },
          },
          { loader: 'sass-loader' }
        ]
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: 'svg-inline-loader'
      }]
  },
  devServer: {
    port: env.devPort || devPort,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/demo' },
      ],
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.unshift({
        name: 'fake-data-provider',
        path: '/smart_banner',
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

            const fakeData = require('./../fake-data/smart_banners.json');

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
