import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import logger from '../util/logger';
import { ENVIRONMENT, JWT_SECRET } from '../util/secrets';

// hash is just sha512 hash of id
interface User {
  id: string;
  uniqueHash: string;
}

const testCaseUsers: User[] = [
  {
    id: 'testCaseUser',
    uniqueHash:
      '382cd78f2fcd04561940af9d9826c353fe75c80433287e757dc75c3d80b629caa65587496317d3de79' +
      '42721f71e85ea3bfa24e21543e6101c445c989254cdbd4',
  },
];

export const createToken = (req: Request, res: Response) => {
  try {
    // expecting the body to json
    const body = JSON.parse(JSON.stringify(req.body));
    const [id, hash] = [body.id, body.uniqueHash];

    // enable test case user only for development
    let users: User[] | undefined;
    if (ENVIRONMENT === 'development') {
      users = testCaseUsers;
    } else {
      // db connection logic or users defined from file from production
      users = undefined;
    }
    if (users) {
      const user = users.filter((user) => user.id === id)[0];
      if (user && user.id === id && user.uniqueHash === hash) {
        const token = {
          token: jwt.sign({ user: 'testCaseUser' }, JWT_SECRET, { algorithm: 'HS512', expiresIn: '30m' }),
        };
        res.json(token);
      } else {
        res.status(400).send('invalid request');
      }
    } else {
      res.status(503).send('Service Unavaiable');
    }
  } catch (e) {
    logger.debug('error parsing body', e);
    res.status(400).send('invalid request');
  }
};
