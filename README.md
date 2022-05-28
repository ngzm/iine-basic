# iine

## 開発環境インフラ、Backend API セットアップ方法

開発インフラは node (API), mongodb (DB), minio (BUCKET) の3つのインスタンスで構成

#### (1) /.env_sample から /.env ファイルを作成する

.env は (2) で起動する docker compose で参照されるインフラ環境変数を定義するもの

#### (2) docker-compose up で開発インフラを起動


次の感じでOK
```
$ docker compose up -d
```

#### (3) 初回起動時 mongodb のアプリケーション用 db と ユーザ作成

初回起動時はアプリケーションが使用する mongodb のユーザやDBが作成されていない

create-iine-user.sh でこれらを作成する

```
$ sh create-iine-user.sh
```

mongodb 上に次のDBとユーザを作成する
- user: iine
- db: inedb

## Frontend クライアントアプリの起動
これはNuxtなので普通に以下の感じ

```
$ cd frontend
$ yarn dev
```
