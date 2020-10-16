import { readFileSync, writeFile } from 'fs';

import logger from './logger';

export interface RCache {
  id: string;
  date: string;
  topList: string;
}

//todo install redis server and move this to that
const _path = `${__dirname}/../../cache/cache.txt`;
export const getCache = () => {
  try {
    const _p = <RCache>JSON.parse(readFileSync(_path, 'utf8').toString());

    const diff = dateDiff(new Date(_p.date), new Date());
    logger.debug(`cache aged ${Math.floor(diff)}`);
    if (diff < 7) {
      return _p;
    }
  } catch (e) {
    logger.debug(`exception while parsing : ${_path} -> ${e}`);
  }
};

export const putCache = (str: string) => {
  writeFile(_path, str, (err) => {
    if (err) {
      logger.debug(`error writing to path: ${_path}`);
      return false;
    }
  });
  return true;
};

export const dateDiff = (a: Date, b: Date): number => (b.valueOf() - a.valueOf()) / (1000 * 60 * 60 * 24);
