## 事前準備

使用した node のバージョン

node: 16.6.2
yarn

## パッケージインストール

```
$ cd ${project_home}
$ yarn install
```

必要なライブラリ一式がダウンロードされます。

## 起動

```
$ cd ${project_home}
$ yarn start
```

- dist 配下に build 済の資材を配置します
- http://localhost:8000 で browser-sync が起動します
- フォアグラウンドで実行され続けますが、そのまま起動して貰えれば src 配下のコードを修正したタイミングで自動 build＆reload が実行されます

## ディレクトリ構成

- dist
  - build 済の資材の置き場所
  - babel を通しており、自動で IE11 への対応などを行っています。
- src
  - 開発者が修正する資材
  - html は header などの資材を汎用化して使い回すため ejs を利用していますが、基本的には HTML と同様に読めるはずです
