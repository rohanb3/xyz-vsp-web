const packageFile = require('./package.json');

process.env.VUE_APP_BUILD_VERSION = packageFile.version;

module.exports = {
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
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
  devServer: {
    proxy: {
      '/api/v1': {
        target: process.env.VUE_APP_PROXY_URL || 'https://ardas-xyz-vsp.firebaseapp.com',
      },
      '/api/identity/api': {
        target: 'https://stage-portal.xyzvsp.com/',
        changeOrigin: true,
      },
      '/api/reviews/api': {
        target: 'https://stage-portal.xyzvsp.com/',
        changeOrigin: true,
      },
      '/api/device-management-api/devices': {
        target: 'https://stage-portal.xyzvsp.com/',
        changeOrigin: true,
      },
      '/api/public-api': {
        target: 'https://stage-portal.xyzreviews.com/',
        changeOrigin: true,
      },
      '/api/video/calls': {
        target: process.env.VUE_APP_PROXY_CALLS_REST_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/video/call-feedback-operator': {
        target: process.env.VUE_APP_PROXY_CALLS_REST_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/video/socket.io': {
        target: process.env.VUE_APP_PROXY_CALL_WS_URL || 'ws://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api/video/socket.io': '/socket.io',
        // },
      },
      '/api/device-management-api/operatorSocket': {
        target: 'https://stage-portal.xyzvsp.com/',
        ws: true,
        changeOrigin: true,
      },
      '/api/video/dashboard/durations': {
        target: process.env.VUE_APP_PROXY_CALLS_REST_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
