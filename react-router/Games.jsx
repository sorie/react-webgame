import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../3.숫자야구/NumberBaseball-class';
import RSP from '../5.가위바위보/RSPClass';
import Lotto from '../6.로또/LottoClass';
import GameMatcher from '../react-router/GameMatcher';

const Games = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to="/game/number-baseball">숫자야구</Link>&nbsp;
				<Link to="/game/rock-scissors-paper">가위바위보</Link>&nbsp; 
				<Link to="/game/lotto-generator">로또생성기</Link>&nbsp; 
				<Link to="/game/index">게임매쳐</Link>&nbsp; 
			</div>
			<div>
				<Route path="/game/:name" component={GameMatcher}></Route>
			</div>
		</BrowserRouter>
	)
};

export default Games;