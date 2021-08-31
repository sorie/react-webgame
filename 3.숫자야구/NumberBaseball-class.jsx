import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { //숫자 네 개를 겹치지 않고 뽑는 함수
	const candidate = [1,2,3,4,5,6,7,8,9];
	const array = [];
	for(let i = 0; i < 4; i += 1) {
		const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		array.push(chosen);
	}
	return array;
};// this를 안 쓰는 경우 밖으로 빼 다른곳에서도 호출한다.

class NumberBaseball extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(), //ex : [1,3,5,7]
		tries: [],
	};

	onSubmitForm = (e) => {
		const { value, answer, tries } = this.state;
		e.preventDefault();
		if(value === answer.join('')){
			this.setState((prevState) => {
				return {
					result: '홈런!',
					// 주의 : push 쓰면 react에서 변한 값을 감지 못함. 아래 처럼 원래값을 넣어주고 나서 추가값을 넣어줘야 함.
					tries : [...prevState.tries, { try: value, result: '홈런!' }],	
				}
			});
			alert('게임을 다시 시작합니다!');
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
			this.inputRef.current.focus();
		} else { // 답 틀렸을때
			const answerArray = value.split('').map((v) => parseInt(v));
			let strike = 0;
			let ball = 0;
			if(tries.length >= 9) { //10번 이상 틀렸을때
				this.setState({
					result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
				});
				alert('게임을 다시 시작합니다!');
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
			}
			else { // 10번 이하 틀렸을때
				for(let i = 0; i < 4; i += 1) {
					if(answerArray[i] === answer[i]) {
						strike += 1;
					} else if(answer.includes(answerArray[i])){
						ball += 1;
					}
				}
				this.setState((prevState) => {
					return {
						tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼`}],
						value: '',
					}
				});
			}
			this.inputRef.current.focus();
		}
	};

	onChangeInput = (e) => {
		console.log(answer);
		this.setState({
			value: e.target.value,
		});
	};

	inputRef = createRef();

	render() {
		const { result, value, tries } = this.state;
		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
				</form>
				<div>시도: {tries.length}</div>
				<ul>
					{tries.map((v,i) => {
						return (
							//i를 키로 쓰는건 좋지 않다.
							<Try key={`${i + 1}차 시도 : `} tryInfo={v} />
						);
					})}
				</ul>
			</>
		);
	};
};

export default NumberBaseball;