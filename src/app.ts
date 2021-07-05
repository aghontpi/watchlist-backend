import path from 'path';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import lusca from 'lusca';
import jwt from 'express-jwt';

import { JWT_SECRET, PORT } from './util/secrets';
import * as homeController from './controllers/home';
import * as apiController from './controllers/api';
import * as unmatchedController from './controllers/unmatched';
import { limitrequest } from './util/ratelimit';
import { unauthorizedErrorMiddleware } from './middleware/error.middleware';

const app = express();
app.set('views', path.join(__dirname, '../views'));

// because of proxying with nginx
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}
app.set('port', PORT);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(compression());
app.use('/top', limitrequest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  lusca({
    referrerPolicy: 'same-origin',
    nosniff: true,
    xframe: 'SAMEORIGIN',
  }),
);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// jwt for protected resources
app.use('/top', jwt({ secret: JWT_SECRET, algorithms: ['RS256'] }));

app.get('/', homeController.index);
app.get('/top', apiController.getTop);
app.get('*', unmatchedController.index);

//change default behaviour of express js to handle error, without stacktrace
//https://expressjs.com/en/guide/error-handling.html
app.use(unauthorizedErrorMiddleware);

export default app;
