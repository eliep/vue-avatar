const path = require('path')
const webpack = require('webpack')

const projectRoot = path.resolve(__dirname, '..')

module.exports = {
  entry: './src/',
  output: {
    path: path.resolve(projectRoot, 'dist'),
    publicPath: '/gh-pages',
    filename: 'vue-avatar.min.js',
    library: 'Avatar',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      src: path.resolve(projectRoot, 'src'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
	rules: [
		{
		  enforce: 'pre',
		  test: /\.(js|vue)$/,
		  loader: 'eslint-loader',
		  include: projectRoot,
		  exclude: /node_modules/,
		  options: {
			  formatter: require('eslint-friendly-formatter')
		  }
	    },
		{
		  test: /\.vue$/,
		  loader: 'vue-loader'
		},
		{
		  test: /\.js$/,
		  loader: 'babel-loader',
		  exclude: /node_modules/
		},
		{
		  test: /\.json$/,
		  loader: 'json-loader'
		},
		{
		  test: /\.html$/,
		  loader: 'vue-html-loader'
		},
		{
		  test: /\.(png|jpg|gif|svg)$/,
		  loader: 'url',
		  query: {
			limit: 10000,
			name: '[name].[ext]?[hash]'
		  }
		}
	]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  devtool: '#eval-source-map'
}
