import { MongoClient } from 'mongodb';

import logger from '../util/logger';
import { RCache } from '../util/cache';
import { errConstruct, successConstruct } from '../util/database';
import { apirespone } from '../util/scrapper';
import { MONGODB_COLLECTION, MONGODB_DB } from '../util/secrets';

export const get = async (client: MongoClient) => {
  const response = <Array<RCache>>(
    await client.db(MONGODB_DB).collection(MONGODB_COLLECTION).find().limit(2).sort({ date: -1 }).toArray()
  );
  return response;
};

type RemovePromise<T> = T extends PromiseLike<infer U> ? U : T;

export const push = (client: MongoClient, data: RemovePromise<ReturnType<typeof apirespone>>) => {
  const response = client
    .db(MONGODB_DB)
    .collection(MONGODB_COLLECTION)
    .insertOne({ date: new Date(), topList: data }, (err, result) => {
      // TODO: send notification via discord for error
      if (err) {
        logger.debug(err);
        return errConstruct('error performing action');
      }
      client.close();
      const { insertedCount, insertedId, ops } = result;
      logger.debug(`inserted ${insertedCount}, with id ${insertedId}`);
      return successConstruct(JSON.stringify({ id: insertedId, schema: ops }));
    });
  return response;
};

export { get as getTop, push as putTop };
