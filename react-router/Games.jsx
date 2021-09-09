import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from '../react-router/GameMatcher';

const Games = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to="/game/number-baseball?name=sori">숫자야구</Link>&nbsp;
				<Link to="/game/rock-scissors-paper">가위바위보</Link>&nbsp; 
				<Link to="/game/lotto-generator">로또생성기</Link>&nbsp; 
				<Link to="/game/index">게임매쳐</Link>&nbsp; 
			</div>
			<div>
				{/* 먼저 있는 페이지만 보여진다(switch) */}
				{/* exact가 붙으면 정확한 url로만 이동하게 된다.  */}
				<Switch>
					<Route exact path="/" render={(props) => <GameMatcher {...props} />} />
					<Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
					{/* <Route path="/game/:name" component={() => <GameMatcher props='12345' />}></Route> */}
					{/* <Route path="/game/:name" component={GameMatcher}></Route> */}
				</Switch>
			</div>
		</BrowserRouter>
	)
};

export default Games;