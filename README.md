# watchlist-backend
> One of the api for [watchlist](https://github.com/aghontpi/watchlist)

Backend source for [watchlist](https://github.com/aghontpi/watchlist) 

## install nvm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

## instal redis

```sh
yum install redis

systemctl enable redis

vim /etc/redis.conf
# change bind-address, password

systemctl start redis

redis-cli
```

## update node to latest version

nvm install node 

## build

yarn build

## deploy to production

yarn install pm2

yarn pm2 start build/index.js

## Built with

- typescript
- express
- handlebars
- mongodb
- node
- redis
- pm2

preferred mongoclient native drive for perfomance over mongoose odm.