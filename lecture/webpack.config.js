const path = require('path');

module.exports = {
	name: 'word-relay-dev',
	mode: 'development', //실서비스: production
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['js', '.jsx'],
	},//입력 확장자 생략 가능하도록 감지해주는 곳.

	entry: {
		app: ['./client'],
	},//입력

	module: {
		rules: [{
			test: /\.jsx?/,
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env','@babel/preset-react'],
				plugins: ['@babel/plugin-proposal-class-properties'],
			},
      exclude: path.join(__dirname, 'node_modules'),
		}],
	},

	output: {
    path: path.join(__dirname, 'dist'),
		filename: 'app.js'
	},//출력
};
