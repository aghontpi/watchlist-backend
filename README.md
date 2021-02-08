# watchlist-backend
> One of the api for [watchlist](https://github.com/aghontpi/watchlist)

Backend source for [watchlist](https://github.com/aghontpi/watchlist) 

url: [https://dev.bluepie.in/watchlistapi](https://dev.bluepie.in/watchlistapi/)

[![build & test-cases](https://github.com/aghontpi/watchlist-backend/workflows/build%20&%20test-cases/badge.svg)](https://github.com/aghontpi/watchlist-backend/actions)
## install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
## update node to latest version

```bash
nvm install node 
```

## instal redis

```bash
yum install redis

systemctl enable redis

vim /etc/redis.conf
# change bind-address, password

systemctl start redis

redis-cli
```
## install nginx

`bash
apt or yum
`
## install yarn

```bash
npm install yarn --g
```
## build

```bash
yarn build
```
## test

```bash
yarn test
```

## deploy to production

```bash
yarn add pm2 -G

yarn pm2 start build/server.js
```
##  configure nginx

- location
- ssl
- proxy

## Built with

- typescript
- express
- jest
- supertest
- handlebars
- node
- pm2
- mongodb
- redis
- nginx
- github actions

preferred mongoclient-native-driver for perfomance over mongoose odm.