// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('../../build/webpack.base.conf.js')
// var utils = require('../../build/utils')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  /* module: {
    loaders: utils.styleLoaders()
  }, */
  devtool: '#inline-source-map'
})

// no need for app entry during tests
delete webpackConfig.entry

// make sure istanbul-instrumenter loader is applied before eslint
/* webpackConfig.module.rules.some(function (rule, i) {
  if (rule.enforce === 'pre') {
    rule.use.push({
      loader: 'istanbul-instrumenter-loader'
    })
    return true
  }
})
*/

// only apply babel for test files when using istanbul-instrumenter
webpackConfig.module.rules.some(function (rule, i) {
  if (rule.loader === 'babel-loader') {
    rule.include = [
      path.resolve('../unit/')
    ]
    return true
  }
})

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    logLevel: config.LOG_DEBUG,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
