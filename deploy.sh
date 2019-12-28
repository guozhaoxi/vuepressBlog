#!/bin/bash

# 终止一个错误
# set -e

# 构建
yarn docs:build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:guozhaoxi/guozhaoxi.github.io.git master
