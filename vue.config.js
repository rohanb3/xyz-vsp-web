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
        target: 'https://ardas-xyz-vsp.firebaseapp.com',
      },
    },
  },
};
