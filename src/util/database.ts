import { MongoClient } from 'mongodb';

import { MONGODB_URI } from './secrets';

export const connect = () => new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
export const errConstruct = (err: string) => ({ status: -1, err: err });
export const successConstruct = (msg: string) => ({ status: 0, context: msg });
