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
- class는 es6에서 지원하는 기능으로(그전에는 prototype이라는 번거로운 작업을 해야했다.) 상단에는 constructor()를 만들어 안에 생성자를 넣어준다.
- 생성자에는 react에서 사용하는 state값을 명시해준다. 호출시 this.state.{변경되는값}

#### 3. Hooks의 경우
- react hooks기능을 사용 할 경우 usestate useRef 등의 기능을 사용하여 this를 생략할 수 있다.

#### 4. import와 require 비교
- webpack.config는 node가 실행시키기 때문에 노드 모듈 문법(const...)를 써야하고 clent.jsx는 webpack이 babel로 호환시켜 주기 때문에 es2015문법(import...)를 사용해도 된다. 
- 노드 모듈 시스템에서 module.exports = {hello = 'a'}; 는 exports.hello = 'a'; 와 같다.
- 예시 
<pre>
<code>
// es2015 모듈문법
import React, {component} from 'react';

class NumberBaseball.extends component {
}

export const hello = 'hello'; // import {hello} = hello;
export default NumberBaseball; // import NumberBaseball from ...;

// 노드의 모듈 문법 => common.js
// const React = require('react');
// exports.hollo = 'hello';
// exports.default = NumberBaseball;
</code>
</pre>

#### 5. props와 리덕스
- props : 불러오는 컴포넌트에게 데어터를 전달할 때 사용. 
- 리덕스 : 데이터 상속과 위 컴포넌트에게 자유롭게 데이터 전달 가능.


#### 6. PureComponent(class)와 memo(hooks)
- 변경되는 데이터 외에 렌더링을 막기 위해서 쓰는 기능.
- 커스텀을 하기 위해선 shouldComponentUpdate를 사용.


#### 주의사항
1. render 안에서 setState 사용 하면 안됨. 
- render시 setState작동 되면서 무한반복됨.
2. props를 받은 곳에서 직접적으로 변경하면 안됨.
- props가 명시된 부모에서 변경해야 함. 
- 변경해줘야 할때는 state에 넣어서 변경.

