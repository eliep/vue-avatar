const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.conf')

let config = Object.assign({}, base)

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
  new CopyWebpackPlugin([
    { from: path.resolve(__dirname, '../src', 'Avatar.vue') }
  ])
])

module.exports = config
