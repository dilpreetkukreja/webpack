var path = require('path');
//var webpack = require('webpack');//outdated
//https://stackoverflow.com/questions/49053215/webpack-4-how-to-configure-minimize
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use : [
						'style-loader',
						'css-loader'		
				]
			}
		]
	},
	optimization: {
	    minimizer: [
	      // we specify a custom UglifyJsPlugin here to get source maps in production
	      new UglifyJsPlugin({
	        cache: true,
	        parallel: true,
	        uglifyOptions: {
	          compress: false,
	          ecma: 6,
	          mangle: true
	        },
	        sourceMap: true
	      })
	    ]
  	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	//..
		// })
	]

};


