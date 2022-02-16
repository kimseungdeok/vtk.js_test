const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
devServer: {
    static: {
        directory: path.join(__dirname,  'dist'),
      },
    hot: false,
    compress: true,
    port: 3001, // 원하는 포트 번호
  },
};