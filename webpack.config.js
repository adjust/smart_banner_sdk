const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const namespace = 'adjust_smart_banner'

module.exports = () => ({
  mode: 'production',
  entry: {
    'adjust-sb-latest': path.resolve(__dirname, 'src/sdk/smart-banner.ts'),
    'adjust-sb-latest.min': path.resolve(__dirname, 'src/sdk/smart-banner.ts')
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
  }
})
