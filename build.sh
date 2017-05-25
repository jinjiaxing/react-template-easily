echo '--------清空dist和product目录'
rm -rf ./dist/*
rm -rf product
echo '--------开始进行webpack打包,请稍后...'
webpack --config webpack.release.js --display-error-details --progress --colors
echo '--------webpack打包完成'

mkdir -p webroot/static/reactgenerator-jinjiaxing
mkdir product

cp -r ./dist/* ./webroot/static/reactgenerator-jinjiaxing/
echo '--------进行tar包压缩'
tar -cvzf ./reactgenerator-jinjiaxing.tar.gz webroot
rm -rf webroot
mv reactgenerator-jinjiaxing.tar.gz product
echo '--------完成'
