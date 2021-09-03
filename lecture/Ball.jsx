import React, { memo } from 'react';

const Ball = memo(({ number }) =>  {//함수 컴포넌트
	let background;
	if (number <= 10) {
		background = 'red';
	} else if (number <= 20) {
		background = 'orange';
	} else if (number <= 30) {
		background = 'yellow';
	} else if (number <= 40) {
		background = 'blue';
	} else {
		background = 'green';
	}
	return (
		<div className="ball" style={{ background }}>{number}</div>
	);
});//HOC high order component 

export default Ball;