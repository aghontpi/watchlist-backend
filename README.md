# watchlist - an express backend

> One of the api for [watchlist](https://github.com/aghontpi/watchlist)

<p align="center">
  <a href="https://github.com/aghontpi/watchlist-backend/actions"><img src="https://github.com/aghontpi/watchlist-backend/workflows/build%20&%20test-cases/badge.svg" alt="build & test-cases"/></a>

</p>

### Folder structure

| Name                | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **src**             | Source files of the server                                                                                                                |
| **src/public**      | Static files to be used on client side                                                                                                    |
| **src/models**      | Storing and retrieving datails from different schema, not using mongoose models                                                           |
| **src/controllers** | Controllers define functions that respond to various http requests                                                                        |
| **src**/server.ts   | Entry point for the app                                                                                                                   |
| **src/util/**       | helpers - logging, cache, ratelimit, database                                                                                             |
| **test**            | Test cases to perform before taking a new build, is also used in combination with github actions before merging the code to master branch |
| **views**           | Template files for rendering dynamic content to client side, since this is a api server, there is not much there in this folder.          |
| **.env.example**    | repos.                                                                                                                                    |
| **.github**         | CI - github actions - run test cases on pull request and report if it is safe to merge.                                                   |
| **cache**           | Cache folder for responses that do not need to connect to database all the time.                                                          

## Manual

### install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

### update node to latest version

```bash
nvm install node
```

### instal redis

```bash
yum install redis

systemctl enable redis

vim /etc/redis.conf
# change bind-address, password

systemctl start redis

redis-cli
```

### install nginx

```bash 
apt or yum install nginx
```

### install yarn

```bash
npm install yarn --g
```

### build

```bash
yarn build
```
### test

```bash
yarn test
```

### deploy to production

```bash
yarn add pm2 -G

yarn pm2 start build/server.js
```

### configure nginx

- location
- ssl
- proxy

### Built with

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
