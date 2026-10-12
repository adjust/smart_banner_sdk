const path = require('path');

module.exports = () => ({
  mode: 'production',
  entry: [path.resolve(__dirname, './index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'adj-sb-layout.js',
    library: 'AdjustSBLayout',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.svg'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    },
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
    }, {
      test: /\.svg$/i,
      use: 'svg-inline-loader'
    }]
  }
});
