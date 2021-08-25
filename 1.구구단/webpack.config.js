const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.jsx','.js'],
	},

	entry: {
		app: './client'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			/** 
			 * preset : plugin들의 모음.
			 * preset-env : 설정할 수 있다. 
			 **/
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
			},
		}],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({ debug: true }),
	],
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'dist'),
	}
}