FROM node:gallium-alpine

ARG BASE_URL
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    LC_CTYPE="utf-8" \
    TERM=xterm \
    HOST=0.0.0.0 \
    BASE_URL=${BASE_URL}

RUN echo "BASE_URL is ${BASE_URL}"

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

# Create working directory
RUN mkdir -p /app
WORKDIR /app

# Deploy application files
COPY . .

# update npm yarn
RUN npm update npm && npm update yarn && yarn install

# build app
RUN yarn build

EXPOSE 4000
CMD /sbin/tini -- yarn start
