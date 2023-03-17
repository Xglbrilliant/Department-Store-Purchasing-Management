const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: '0.0.0.0',
    // // https:true,
    // port: 6103,
    // client: {
    //   webSocketURL: 'ws://0.0.0.0:6103/ws',
    // },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:7788/',//目标地址 请求的后台接口 
        ws: false,
        changeOrigin: true,
        pathRewrite:{//路径重写 
          "^/api":''
        }
      },
    
    }
  }
})
