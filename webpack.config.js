const path = require('path');
process.env.NODE_ENV = 'production'; // 실서비스를 위해서는 이것을 일단 추가해야 한다.

module.exports = {
  name: 'number-baseball-dev',
  mode: 'development', // 실서비스 production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: './client'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: true
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties'
          ]
        },
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist'
  }
};
