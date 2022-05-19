#!/bin/bash
#
# 開発環境 mongodb iine ユーザ作成処理
#   cf.mome/mongodb_環境構築メモ.txt
#
docker compose exec mongo sh -c '
  mongosh -u ${MONGO_INITDB_ROOT_USERNAME}      \
          -p ${MONGO_INITDB_ROOT_PASSWORD}      \
          --authenticationDatabase admin        \
          ${MONGO_INITDB_DATABASE}              \
          --eval "db.createUser({               \
            user: \"${MONGO_IINE_UERNAME}\",    \
            pwd: \"${MONGO_IINE_PASSWORD}\",    \
            roles: [{ role: \"readWrite\", db: \"${MONGO_INITDB_DATABASE}\"}]  \
          })"
  '
