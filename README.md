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
- 함수형 컴포넌트에서 상태를 관리하기 위해서 클래스 컴포넌트를 작성해야 했다.
- Hooks를 통해 함수형 컴포넌트에서도 상태를 관리할 수 있다.

#### 3-1. useState : 상태 유지 값과 그 값을 갱신하는 함수를 반환.
- useState는 두개의 요소가 담긴 배열을 반환.
- 첫번째 요소는 컴포넌트의 현재 상태이고 두 번째 요소는 상태를 설정할 수 있는 함수.
- useState가 배열을 반환하기 때문에 Array Destructuring으로 배열의 요소들을 지역 변수로 바로 할당.

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
- 자식을 메모 사용하면 위 부모도 메모 사용가능.


#### <주의사항>
1. render 안에서 setState 사용 하면 안됨. 
- render시 setState작동 되면서 무한반복됨.
2. props를 받은 곳에서 직접적으로 변경하면 안됨.
- props가 명시된 부모에서 변경해야 함. 
- 변경해줘야 할때는 state에 넣어서 변경.

#### 7. 라이프사이클
클레스의 경우 
-> constructor -> render -> ref -> componentDidMount 
-> (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

<pre>
<code>
componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 리렌더링 될때는 수행되지 않는다 }
componentDidUpdate(prevProps, prevState) {// 리렌더링 후
  if(this.state.winBalls.length === 0){ //해당 값이 초기화 되었을 때 실행.
    this.runTimeouts();
  }
};
componentWillUnMount() { // 컴포넌트가 제거되기 직전 }co
</code>
</pre>

#### 8. useEffect
- hooks 사용 시 라이프사이클 역할 (componentDidMount, componentDidUpdate, componentWillUnMount)
- class에서는 라이프 사이클 별로 나눌 수 있지만 hooks는 그렇지 않다.
- 사이드 이펙트를 일으킬 수 있는 함수를 전달 받음.
- 기본적으로 동작은 모든 렌더링이 완료된 후에 수행, 화면에서 제거 될때 정리해야 하는 리소스
- 예시
<pre>
<code>
useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  console.log('다시 실행');//componentDidMount
  interval.current = setInterval(changeHand, 100);
  return () => { // componentWillUnMount 역할
    console.log('종료');
    clearInterval(interval.current);
  }
}, [imgCoord]);
//두번째 인수 배열에 넣은 값(imgCoord)들이 바뀔 때 useEffect가 실행.(componentDidUpdate)
</code>
</pre>

#### 9. useMemo
- hooks는 전체 component가 실행되기 때문에 따로 뺀 복잡한 함수 결과값은 useMemo를 사용하여 캐시로 저장해 사용한다.
- 예시
<pre>
<code>
const lottoNumbers = useMemo(() => getWinNumbers(), []);
OR
const [winBalls, setWinballs]  = useState([]);
const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);//winBalls값이 변경될 때마다 저장된다.
</code>
</pre>

#### 10. useCallback
- useMemo는 결과값을 기억한다면, useCallback은 함수를 기억한다.
- 부모가 자식에게 함수를 전달하는 경우 useCallback를 사용해야 자식도 매번 렌더링 되는것을 막을 수 있다.
- 함수가 props로 들어가 있을 경우 useCallbak을 사용하여 재호출을 막을 수 있다.
- 예시

<pre>
<code>
const Lotto = () => {
... 생략
  const onClickRedo = useCallback(() => {
		setWinNumbers(getWinNumbers());
		setWinballs([]);
		setBonus(null);
		setRedo(false);
		timeouts.current = [];
	});
... 생략
}
</code>
</pre>

<주의사항>
- usecallback 안에서 사용하는 state값은 두번째 인자값에 넣어야 바뀐다.
- 예시
<pre><code>
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinballs([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = [];
},[winNumbers]);
</code></pre>


<Hooks 주의사항>
- useState순서가 엄격하여 조건문으로 감싸면 안된다.
- useEffect같은 함수 안에서 useState를 넣으면 안된다.
- componentDidUpdate에서만 실행하고 싶은 경우

<pre><code>
const mounted = useRef(false);
useEffect(() => {
  if(!mounted.current) {
    mounted.current = true;
  } else {
    //실행기능
  }
}, [변경값]);
</code></pre>

<렌더 발생 원인 찾는 코드>
<pre>
<code>
const ref = useRef([]);
useEffect(() => {
	console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3],)
	ref.current = [rowIndex, cellIndex, dispatch, cellData];
}, [rowIndex, cellIndex, dispatch, cellData]);	
</code>
</pre>
