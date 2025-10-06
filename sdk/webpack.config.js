const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');
const packageJson = require('./package.json');

const namespace = 'adjust_smart_banner';

const devPort = 8080;

module.exports = (env, args) => ({
  mode: 'production',
  entry: {
    'adjust-smart-banner': path.resolve(__dirname, './src/main.ts'),
    'adjust-smart-banner.min': path.resolve(__dirname, './src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'AdjustSmartBanner',
      type: 'umd',
    },
  },
  target: ['web', 'es6'],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/
    }),
    new CssMinimizerPlugin()]
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      __ADJUST_SB__NAMESPACE: JSON.stringify(namespace),
      __ADJUST_SB__SDK_VERSION: JSON.stringify(packageJson.version),
      _DEV_MODE_: JSON.stringify(args.mode === 'development'),
      _DEV_ENDPOINT_: env.devEndpoint ? JSON.stringify(`http://${env.devEndpoint}:${env.devPort || devPort}`) : undefined
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.svg'],
    alias: {
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@layout': path.resolve(__dirname, '../layout/index.ts'),

      // inform webpack where to find assets when it builds layout not as a package but as a part of the sdk
      assets: path.resolve(__dirname, '../layout/assets')
    },
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
              localIdentName: 'adjust-sb_[local]__[hash:base64:5]',
            }
          },
        },
        { loader: 'sass-loader' }
      ]
    }, {
      test: /\.svg$/i,
      use: 'svg-inline-loader'
    }]
  }
});
