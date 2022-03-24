FROM node:gallium-alpine

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    LC_CTYPE="utf-8" \
    TERM=xterm

# install dependency package
RUN set -xe \
  && apk --no-cache --purge -uU add \
  less \
  bash \
  build-base \
  curl \
  git \
  tini \
  yarn \
  wget \
  && rm -rf /var/cache/apk/* /tmp/*

# CJK font
# ADD fonts/NotoSansCJKjp-hinted.tar.gz fonts/Ubuntu.tar.gz /usr/share/fonts/
# RUN fc-cache -fv

# Create working directory
RUN mkdir -p /app
WORKDIR /app

# Deploy application files
COPY . .

# update npm yarn
RUN npm update npm && npm update yarn && yarn install

EXPOSE 3003
CMD /sbin/tini -- node index.js
