const devServer = {
  port: 8081,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '/',
      // },
    },
  },
};

module.exports = {
  devServer,
};
