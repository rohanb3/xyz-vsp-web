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
