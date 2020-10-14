const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))

    // 将 icons 目录排除在 svg 默认规则之外
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    // 用 svg-sprite-loader 处理 icons 下的 svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('svgo-loader') // 添加 svgo-loader
      .loader('svgo-loader')
      .options({
        plugins: [
          // { removeAttrs: { attrs: 'fill' } }, // 有些svg会存在fill颜色， 移除 svg 中的 fill 属性
          { removeTitle: true },
          { convertColors: { shorthex: false } },
          { convertPathData: false }
        ]
      })
      .end()
  },
  pluginOptions: {
    // 在每个组件内引入全局scss变量
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, './src/styles/var.scss')
      ]
    }
  },
  css: {
    loaderOptions: {
      // 可以设置全局共享的变量
      scss: {
        // prependData: `@import "~@/variables.scss";`
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
