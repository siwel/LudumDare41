const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/app.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.js$/, use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: {
									browsers: ['last 2 versions']
								}
							}]
						],
						//plugins: ['transform-object-rest-spread'],
						cacheDirectory: true
					}
				}, include: path.join(__dirname, 'src')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({ __DEV__: JSON.stringify(__DEV__) }),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 8080
	},
	devtool: __DEV__ ? 'eval' : false
};
