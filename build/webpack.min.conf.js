const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.conf')

var config = Object.assign({}, base)

config.devtool = '#source-map'
config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new CopyWebpackPlugin([
    { from: './src/Avatar.vue' }
  ])
])

module.exports = config