## react-webgame
### React lecture example
- 라이브러리로 react실행 해보기.
- class, consttrutor로 react실행.
- hooks로 react 실행.
- webpack으로 빌드하기.

#### 1. webpack.config 설정.
- entry : 입력
- output : 출력
- resolve - extensions : 생략할 파일 확장자 기입.
- preset : plugin들의 모음.
- path : node 기능.
##### * preset-env 설정
browser 설정: 플러그인들을 브라우저 설정에 맞는 버전으로 설치해준다.<br/>
`
{
  targets: {
    browsers: ['last 2 chrome version'],
  },
  debug: true,
}
`<br/>
https://github.com/browserslist/browserslist

#### 2. Class의 경우 
- es6에서 지원하는 기능으로 상단에는 constructor가 들어가 생성자가 들어간다.
- 생성자에는 react에서 사용하는 state값을 명시해준다.

#### 3. Hooks의 경우
- react hooks기능을 사용 할 경우 usestate useRef 등의 기능을 사용하여 this를 생략할 수 있다.

