src='/Users/sjl/Documents/gitlab/zlst-vue/dist'
dist='/Users/sjl/Documents/gitlab/zlst/media'
echo '开始操作'
yarn build
echo '编译完成，开始拷贝！'
rm -rf $dist
cp -rf $src $dist
echo '拷贝完成!'