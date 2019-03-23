# 使い方
## インストール
```bash:
$ npm install electron@1.6.1 --save-dev
```

## 起動
```bash:
$ ./node_modules/.bin/electron .
```

## パッケージ化
```bash:
# パッケージマネージャインストール
$ npm install electron-packager@8.5.2 --save-dev
# パッケージ化実行
$ ./node_modules/.bin/electron-packager . CodeGene --platform=darwin,win32 --arch=x64 --electronVersion=0.36.1
```
