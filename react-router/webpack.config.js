const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'numberbaseball-setting',
	mode: 'development', //실서비스: production
	devtool: 'eval',
	resolve: {
    extensions: ['.js', '.jsx'],
  },//입력 확장자 생략 가능하도록 감지해주는 곳.

	entry: {
		app: ['./client'],
	},//입력

	module: {
		rules: [{
			test: /\.jsx?/,
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env',{
						targets: {
							browsers: ['> 1% in KR'],
						},
						debug: true,
					}],
					'@babel/preset-react'
				],
				plugins: [
					'@babel/plugin-proposal-class-properties',
					'react-refresh/babel',
				],
			},
      exclude: path.join(__dirname, 'node_modules'),
		}],
	},

	plugins: [
		new RefreshWebpackPlugin()
	],

	output: {
    path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist/',
	},//출력

	devServer: {
		publicPath: '/dist/', 
		hot: true,
		historyApiFallback: true,
	},
};
