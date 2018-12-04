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
        // target: 'https://ardas-xyz-vsp.firebaseapp.com',
        target: 'http://localhost:5000/ardas-xyz-vsp/us-central1/fakeBe',
      },
    },
  },
};
