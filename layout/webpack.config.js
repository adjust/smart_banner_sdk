const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const namespace = 'adj-sb-layout';

module.exports = (env, args) => ({
  mode: 'production',
  entry: [path.resolve(__dirname, './index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: "module",
    },
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      __ADJUST_SB__NAMESPACE: JSON.stringify(namespace)
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [{
      test: /\.(ts|js)$/,
      use: 'ts-loader',
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
    }]
  }
});
