# XYZ VSP Web

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn start
```

### Compiles and minifies for production

```
yarn build
```

### Run your tests

```
yarn test
```

### Lints and fixes files

```
yarn lint
```

### Run fake BE

```
yarn run start:BE
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Local development with fake BE

By default there is no configured dev proxy for fake-be. To use it locally make a few steps:

1.  Create in root folder file .env.development.local with

```
VUE_APP_PROXY_URL=http://localhost:5000/ardas-xyz-vsp/us-central1/fakeBe
```

2.  Go to functions folder and install node_modules.
3.  Install firebase-tools globally.
4.  In terminal make `firebase login` command.
5.  Run `yarn start` in functions folder.
6.  In another terminal go to project root and run `yarn start`.

### Local development with local calls WS BE

By default dev server proxy for calls websocket is configured to proxy to localhost:3000.
To test app with it, please, copy repo https://github.com/ardas/xys-vsp-be-video, switch to branch
develop, install deps with npm install, and run npm run start:dev.

### Local development with remote calls WS BE

If you want to connect to real calls WS backend, create or update .env.development.local file with:

```
VUE_APP_OPERATOR_WS_NAMESPACE=wss://dev-demo.xyzies.ardas.biz/operators
```

It will be used as path for operators namespace instead of default

```
/operators
```

which is proxied to localhost:3000

### Local development with local calls REST BE

By default dev server proxy for /api/video/call-feedback-operator is configured to proxy to localhost:3000.
To test app with it, please, copy repo https://github.com/ardas/xys-vsp-be-video, switch to branch
develop, install deps with npm install, and run npm run start:dev.

### Local development with remote calls REST BE

If you want to connect to real calls, create or update .env.development.local file with:

```
VUE_APP_PROXY_CALLS_REST_URL=https://dev-demo.xyzies.ardas.biz
```
