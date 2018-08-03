echo '--------清空dist和product目录'
rm -rf ./dist/*
rm -rf product
rm -rf webroot
echo '--------开始进行webpack打包,请稍后...'
webpack --config webpack.release.config.js --display-error-details --progress --colors
echo '--------webpack打包完成'

mkdir -p webroot/static/react-template-easily
mkdir product

cp -r ./dist/* ./webroot/static/react-template-easily/
echo '--------进行tar包压缩'
tar -cvzf ./react-template-easily.tar.gz webroot
mv react-template-easily.tar.gz product
rm -rf ./dist/*
echo '--------完成'