module.exports = {
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
      '/api': {
        target: process.env.VUE_APP_PROXY_URL || 'https://ardas-xyz-vsp.firebaseapp.com',
      },
      '/operators': {
        target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
        ws: true,
        changeOrigin: true,
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
