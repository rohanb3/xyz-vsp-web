#!/bin/bash -xe
cd /app

yarn global add firebase-tools
yarn install

yarn run check
yarn run build

firebase deploy --only hosting --token 1/PX_r7_X2tXqTr8U_GlKmbDrA4QYoYrewdxM_csAq-L4
