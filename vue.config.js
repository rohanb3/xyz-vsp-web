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
      '/api/v1/samples_1w72b820': {
        target: 'http://www.noiseaddicts.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1/': '',
        },
      },
      '/api': {
        target: process.env.VUE_APP_PROXY_URL || 'https://ardas-xyz-vsp.firebaseapp.com',
      },
      // http://www.noiseaddicts.com
      // '/socket.io': {
      //   target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
      //   ws: true,
      //   changeOrigin: true,
      //   secure: true,
      // },
    },
  },
};
