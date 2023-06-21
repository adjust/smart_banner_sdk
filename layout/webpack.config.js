const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => ({
  mode: 'production',
  entry: [path.resolve(__dirname, './index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'adj-sb-layout.js',
    library: 'AdjustSBLayout',
    libraryTarget: 'umd',
  },
  plugins: [
    new ESLintPlugin(),
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
