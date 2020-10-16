import fs from 'fs';

import dotenv from 'dotenv';

import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.error('.env file not provided');
  process.exit(1);
  //@TODO: create example sample file and include it
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

export const MONGODB_URI = process.env['DBURI'] || '';
export const MONGODB_USER = process.env['DBUSER'] || '';
export const MONGODB_DB = process.env['DBNAME'] || '';
export const MONGODB_PASS = process.env['DBPASSWORD'] || '';
export const SYNC_DATE = process.env['SYNC_DATE'] || 7;
export const MONGODB_COLLECTION = process.env['COLLECTION'] || '';
export const PORT = process.env['PORT'];
export const RATE_LIMIT_WINDOW_MS = <number>(process.env['RATE_LIMIT_WINDOW_MS'] || 30);
export const RATE_LIMIT_MAX = <number>(process.env['RATE_LIMIT_MAX'] || 2);

if (!MONGODB_URI) {
  if (prod) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
  }
  process.exit(1);
}
