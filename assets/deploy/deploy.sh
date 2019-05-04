#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


rm gh-pages -rf; mkdir gh-pages; cp -r notes/* gh-pages/;
cd gh-pages;


# 将子目录的所有图片全部复制到文档根目录中，解决docsify图片索引不到的问题
rm assets/ -rf
mkdir assets

rm pics/ -rf
mkdir pics


for f in $(find ../notes/ -type f -print | grep assets)
  do
    cp $f ./assets
  done

for f in $(find ../notes/ -type f -print | grep pics)
  do
    cp $f ./pics
  done

# 进入生成的文件夹

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f "https://${GH_TOKEN}@github.com/frank-lam/fullstack-tutorial.git" master:gh-pages

cd -