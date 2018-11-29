#!/bin/bash -xe
cd /app

yarn global add firebase-tools
yarn install

yarn run check
yarn run build

cd dist/
ls -l

cd ..

firebase deploy --only hosting --token 1/BEHNF6mlLWzcqw46yzqP76IVsJVNw_3Yo3HL04XY9d4
