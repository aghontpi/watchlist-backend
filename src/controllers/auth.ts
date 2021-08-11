import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';

import logger from '../util/logger';
import { ENVIRONMENT, JWT_SECRET } from '../util/secrets';

// hash is just sha512 hash of id
interface User {
  id: string;
  uniqueHash: string;
}

export const testCaseUser: User = {
  id: 'testCaseUser',
  uniqueHash:
    '382cd78f2fcd04561940af9d9826c353fe75c80433287e757dc75c3d80b629caa65587496317d3de79' +
    '42721f71e85ea3bfa24e21543e6101c445c989254cdbd4',
};

export const createToken = (req: Request, res: Response) => {
  try {
    // expecting the body to json
    const body = JSON.parse(JSON.stringify(req.body));
    const [id, hash] = [body.id, body.uniqueHash];

    // enable test case user only for development
    let testUsers: User[] | undefined = undefined;
    let firebaseToken: string | undefined = undefined;

    if (ENVIRONMENT === 'development' || process.env.NODE_ENV == 'test') {
      testUsers = [testCaseUser];
    } else if (id) {
      firebaseToken = id; // verify user with firebase id token,
    }

    if (testUsers) {
      const user = testUsers.filter((user) => user.id === id)[0];
      if (user && user.id === id && user.uniqueHash === hash) {
        const token = {
          token: jwt.sign({ user: 'testCaseUser' }, JWT_SECRET, { algorithm: 'HS512', expiresIn: '30m' }),
        };
        return res.json(token);
      }
    } else if (firebaseToken) {
      // authen token generated by firebase on client,
      //  that token is verifiable in firebase admin console
      admin
        .auth()
        .verifyIdToken(firebaseToken)
        .then((decodedToken) => {
          if (decodedToken) {
            console.log('decodedtoken', decodedToken);
            const token = {
              token: jwt.sign({ user: decodedToken.uid }, JWT_SECRET, { algorithm: 'HS512', expiresIn: '30m' }),
            };
            return res.json(token);
          }
        })
        .catch((error) => {
          logger.debug('firebase admin lib error' + error);
        });
    }

    // if users empty or provided with invalid credentials
    return res.status(401).send('Unauthorized');
  } catch (e) {
    logger.debug('error parsing body', e);
    res.status(400).send('invalid request');
  }
};
