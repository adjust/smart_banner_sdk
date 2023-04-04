const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const namespace = 'adjust_smart_banner';

const devPort = 8080;

module.exports = (env, args) => ({
  mode: 'production',
  entry: {
    'smart-banner-sdk': path.resolve(__dirname, './src/main.ts'),
    'smart-banner-sdk.min': path.resolve(__dirname, './src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'this',
    library: {
      name: 'AdjustSmartBanner',
      type: 'umd'
    },
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
      __ADJUST_SB__SDK_VERSION: JSON.stringify(packageJson.version),
      _DEV_MODE_: JSON.stringify(args.mode === 'development'),
      _DEV_ENDPOINT_: JSON.stringify(`http://${env.devEndpoint}:${env.devPort || devPort}`)
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss']
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
              localIdentName: 'adjust-sb_[name]__[hash:base64:5]',
            }
          },
        },
        { loader: 'sass-loader' }
      ]
    }]
  }
});
