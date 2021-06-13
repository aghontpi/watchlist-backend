import path from 'path';

import log from 'morgan';
import winston from 'winston';
import { createStream } from 'rotating-file-stream';

import { ENVIRONMENT } from './secrets';

const MODE = ENVIRONMENT;
const LOG_PATH = '../logs/';
const accesslog = () => {
  log(MODE !== 'production' ? 'common' : 'combined', {
    stream: createStream('access.log', {
      interval: '1d',
      path: path.join(__dirname, LOG_PATH),
      encoding: 'utf-8',
    }),
  });
};

const config: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: MODE === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(config);

if (MODE !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
export { accesslog };
