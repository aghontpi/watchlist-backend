import { Request, Response } from 'express';

import logger from '../util/logger';
import { connect } from '../util/database';
import { dateDiff, getCache, putCache } from '../util/cache';
import { putTop, getTop as _getTop } from '../models/top';
import { apirespone } from '../util/scrapper';
import { SYNC_DATE } from '../util/secrets';

/**
 * parse and return the top imdb list
 * @route GET /top
 */
export const getTop = async (_: Request, res: Response) => {
  const client = connect();
  client.connect(async (err) => {
    if (err) {
      logger.debug('error connecting to db');
      return;
    }
    // check if the data is present in local chache first
    const cache = getCache();
    if (cache) {
      logger.debug(`providing data from cache`);
      res.json(cache);
      return;
    }

    // fetch the date of the old reponse,
    const prevData = await _getTop(client);
    if (prevData.length === 0 || dateDiff(new Date(prevData[0].date), new Date()) >= SYNC_DATE) {
      logger.debug(`outdated data with days greater than ${SYNC_DATE}`);
      const topList = await apirespone();

      await putTop(client, JSON.stringify(topList));
      res.send(topList);
    } else {
      logger.debug(`data witin configured days ${SYNC_DATE}`);
      const response = await (await _getTop(client)).shift();
      putCache(JSON.stringify(response));
      res.json(response);
    }
    return;
  });
};
