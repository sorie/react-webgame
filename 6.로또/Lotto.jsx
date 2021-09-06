import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
	console.log('getWinNumbers');
	const candidate = Array(45).fill().map((v, i) => i + 1);
	const shuffle = [];
	while(candidate.length > 0) {
		shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
	}
	const bonusNumber = shuffle[shuffle.length -1];
	const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
	return [...winNumbers, bonusNumber];
}

const Lotto = () => {
	const [winBalls, setWinballs]  = useState([]);
	const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);//두번째 인자가 바뀌지 않는 한 다시 싱행되지 않는다. 매번 실행하는 hooks의 특성상 useMemo를 사용하여 캐시로 저장한다.
	const [winNumbers, setWinNumbers] = useState(lottoNumbers);
	const [bonus, setBonus] = useState(null);
	const [redo, setRedo] = useState(false);
	const timeouts = useRef([]);

	useEffect(() => {
		for(let i = 0; i < winNumbers.length - 1; i++){
			timeouts.current[i] = setTimeout(() => {
				setWinballs((prevBalls) => [...prevBalls, winNumbers[i]]);
			}, (i + 1) * 1000);
		}
		timeouts.current[6] = setTimeout(() => {
			setBonus(winNumbers[6]);
			setRedo(true);
		}, 7000);
		return () => {
			timeouts.current.forEach((v) => {
				clearTimeout(v);
			});
		}
	},[timeouts.current]);// 빈 배열이면 componentDidMount와 동일
	// 배열에 요소가 있으면 componentDidMount랑 compunentDidUpdate 둘다 수행

	const onClickRedo = useCallback(() => {
		console.log('onClickRedo');
		console.log(winNumbers);
		setWinNumbers(getWinNumbers());
		setWinballs([]);
		setBonus(null);
		setRedo(false);
		timeouts.current = [];
	},[winNumbers]);

	return (
			<>
				<div>당첨 숫자</div>
				<div id="결과창">
					{winBalls.map((v) => <Ball key={v} number={v} />)}
				</div>
				<div>보너스!</div>
				{bonus && <Ball number={bonus} />}
				{redo && <button onClick={onClickRedo}>한번 더!</button>}
			</>
	);
};

export default Lotto;