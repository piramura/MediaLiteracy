# モールス信号体験アプリ

シンプルなWebアプリケーションでモールス信号を学び、体験する。
ユーザーは以下の機能を利用できる。

* テキスト→モールス信号の変換
* モールス信号→テキストの変換
* モールス信号の再生／録音
* モールス信号表（PDF）の閲覧

## フォルダ構成

```
morse-app/
├─ assets/            # 静的アセット（PDF、画像、音声など）
│   └─ morse-chart.pdf
├─ css/               # スタイルシート
│   └─ style.css
├─ js/                # JavaScriptモジュール（共同開発者はここに追加していってください）
│   ├─ script.js       # メインアプリケーションのロジック
│   └─ morse.js        # テキスト↔モールス変換ロジック　等々追加していってください。
├─ index.html         # アプリのエントリーポイント
└─ README.md          # プロジェクト概要とガイドライン
```

## 命名規則／コーディングガイドライン

* **フォルダ & ファイル名**：英語・小文字・ハイフン区切り（例：`morse-app`、`style.css`）。
* **JavaScript**

  * 変数・関数：キャメルケース（例：`textToMorse`、`playMorseSound`）。
  * 定数：大文字＋アンダースコア（例：`MORSE_TABLE`）。
  * ファイル：機能がわかりやすい名前（例：`script.js`、`morse.js`）。
* **CSS クラス**：英語・小文字・ハイフン区切り（例：`.morse-input`、`.result-display`）。



## 使用方法

* テキストを入力して **→ モールス変換** をクリック
* モールス信号（`.` と `-`）を入力して **→ テキスト変換** をクリック
* **再生** ボタンで音を再生。
* まーるすの解説音声を入れる。
* モールス表PDFをスクロールして参照
* スマホの縦画面想定。
* test.htmlは適当に使ってください。最後には消します。