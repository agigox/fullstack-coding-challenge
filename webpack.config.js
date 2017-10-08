const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, 'static/components/src/Index.jsx'),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'static/components/dist')
	},
	devServer: {
		contentBase: './'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include : path.resolve(__dirname, 'static/components/src'),
				loader : 'babel-loader'
			}
		]
	}
}