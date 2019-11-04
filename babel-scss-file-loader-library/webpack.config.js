//https://stackoverflow.com/questions/51383618/chunk-entrypoints-use-chunks-groupsiterable-and-filter-by-instanceof-entrypoint
//npm install extract-text-webpack-plugin@next
//npm install babel-loader@7 --se-dev
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve('__dirname','dist'),
		filename: 'bundle.js',
		//publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets:['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							publicPath: 'img/'
						} 
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						} 
					}
				],
				exclude: path.resolve(__dirname, 'src/index.html')
			}		
		]
	},
	plugins: [
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery'
				}),
				extractPlugin,
				new HtmlWebpackPlugin({
					//filename: 'index.html',
					template: 'src/index.html'
				}),
				new CleanWebpackPlugin({
				  cleanOnceBeforeBuildPatterns: ['dist']
				})
	]
};