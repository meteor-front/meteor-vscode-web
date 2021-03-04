const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
