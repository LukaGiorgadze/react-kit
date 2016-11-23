'use strict';

// Include all required modules
const Webpack 				= require('webpack');
const Path 					= require('path');
const ExtractTextPlugin		= require('extract-text-webpack-plugin');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');
const WebpackCleanupPlugin 	= require('webpack-cleanup-plugin');
const loaders 				= require('./webpack.loaders');

// Global Config
const config = require('./server/config.jsx');

// Add Loaders
loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
});

// Export Webpack Config
module.exports = {
	devtool: config.environment === 'development' ? 'eval' : 'hidden-source-map',
	entry: [
		'webpack-hot-middleware/client',
		Path.join(__dirname, 'client', config.clientMain)
	],
	output: {
		path: Path.join(__dirname, config.publicHtml),
		publicPath: '/',
		filename: '[hash].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	plugins: [
		new Webpack.optimize.OccurenceOrderPlugin(),
		new Webpack.HotModuleReplacementPlugin(),
		new Webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(config.environment)
			}
		}),
		new Webpack.NoErrorsPlugin(),
		// Remove old Assets
		new WebpackCleanupPlugin(),
		// Uglify Scripts
		new Webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: config.environment === 'development' ? false : true,
				drop_debugger: config.environment === 'development' ? false : true,
			}
		}),
		// Minimize CSS
		new ExtractTextPlugin('[contenthash].css', {
			allChunks: true
		}),
		// Create Main Template
		new HtmlWebpackPlugin({
			template: Path.join(__dirname, 'client', 'template.html'),
			filename: Path.join(__dirname, config.publicHtml, 'index.html'),
			inject: 'body',
			hash: false,
			minify: false,
			//favicon: 'favicon.ico'
		}),
		new Webpack.optimize.DedupePlugin()
	]
};