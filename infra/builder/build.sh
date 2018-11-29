#!/bin/bash -xe
cd /app
yarn install
yarn run check
yarn run build
