module.exports = {
  configureWebpack: {
    devServer: {
      port: 8085,
      open: true,
      host:"0.0.0.0",
      proxy: {
        '/api': {
          target: 'http://localhost:8089',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/api': '/'
          }
        }
      }
    }
  }
};
