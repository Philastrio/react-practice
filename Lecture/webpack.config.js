const path = require('path');
const webpack = require('webpack');
module.exports = {
  name: 'wordrelay-setting', // 어떤 웹팩의 설정인지 말해준다
  mode: 'development', // 개발용 , 실서비스 할때는 : production
  devtool: 'eval', // 빠르게 하겠다는 의미임
  resolve: {
    extensions: ['.js', '.jsx'] // 확장자 지정해주면 알아서 찾는다
  },

  entry: {
    app: ['./client']
    /* 
        1.어떤 파일을 입력해서 웹팩만들 것인가를 지정해줌 , 
        여기서 client.jsx가 WordRelay.jsx를 불러오고 있다. 웹팩은 알아서 파악을 해주기에 1개만 적어도 된다.
        2.확장자는 안적어 줘도 된다 resolve에서 지정해줘서 그렇다
        */
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR'] //browserlist 에서 확인해보자
                },
                debug: true // 개발용으로 디버그 볼수 있게 해준다
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel'
          ]
        }
      }
    ]
    /* 
    rules: 룰을 적용하겠다는 의미
    /\.jsx?/ : / / 사이에 표현식을 적어준다. \.jsx? : js 파일 또는 jsx파일을 의미
    loader: loader로 babel-loader를 사용한다
    options: 옵션으로 설치해 놓은 preset 시리즈를 적용하겠다 @babel/preset-env, @babel/preset-react
    */
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // 여기의  plugins는 확장프로그램 같은 것임
  /* 
    위 플러그 인은 로더에 debug: true를 넣어주기 위한 것이다
  */
  output: {
    path: path.join(__dirname, 'dist'), // path.join(경로를 알아서 합쳐준다, __dirname: webpack.config.js가 들어있는 현재폴더를 의미)
    filename: 'app.js',
    publicPath: '/dist'
  } // 출력
};
