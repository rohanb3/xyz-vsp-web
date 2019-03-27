module.exports = {
  publicPath: '/vsp',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  devServer: {
    proxy: {
      '/api/v1': {
        target: process.env.VUE_APP_PROXY_URL || 'https://ardas-xyz-vsp.firebaseapp.com',
      },
      '/api/video/call-feedback-operator': {
        target: process.env.VUE_APP_PROXY_CALLS || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/video/operators': {
        target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/video': '',
        },
      },
      '/api/video/socket.io': {
        target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/video': '',
        },
      },
      // '/token': {
      //   target: 'http://localhost:3000',
      //   ws: true,
      //   changeOrigin: true,
      // },
      '/socket.io': {
        target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
