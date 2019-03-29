module.exports = {
  publicPath: '/vsp',
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  // pwa: {
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: 'src/service-worker.js',
  //   },
  // },
  devServer: {
    proxy: {
      '/api/v1': {
        target: process.env.VUE_APP_PROXY_URL || 'https://ardas-xyz-vsp.firebaseapp.com',
      },
      '/api/identity/api': {
        target: 'https://dev-demo.xyzies.ardas.biz/',
        changeOrigin: true,
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
      '/socket.io': {
        target: process.env.VUE_APP_PROXY_WS_URL || 'https://vue-socket.herokuapp.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
