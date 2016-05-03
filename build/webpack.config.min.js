const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('../webpack.config')

var config = Object.assign({}, base)

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new CopyWebpackPlugin([
    { from: './src/Avatar.vue' }
  ]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
])

module.exports = config