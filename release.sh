src='/Users/sjl/Documents/github/meteor-vscode-web/dist'
dist='/Users/sjl/Documents/github/meteor-vscode/media'
echo '开始操作'
yarn build
echo '编译完成，开始拷贝！'
rm -rf $dist
cp -rf $src $dist
echo '拷贝完成!'