import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../util/secrets';

export const createToken = (req: Request, res: Response) => {
  console.log(req);
  const [id, hash] = [req.body.id, req.body.hash];
  //  res.json({ token: 'placeholder' });
  const user = testCaseUsers.filter((user) => user.id === id)[0];
  if ((user && user.id === id && user.uniqueHash === hash) || 1) {
    const token = jwt.sign({ user: 'testCaseUser' }, JWT_SECRET, { algorithm: 'HS512', expiresIn: '30m' });
    res.json(`{token: ${token}}`);
  } else {
    res.statusCode === 400;
    res.write('invalid request');
  }
};

// hash is just sha512 hash of id

const testCaseUsers: { id: string; uniqueHash: string }[] = [
  {
    id: 'testCaseUser',
    uniqueHash:
      '382cd78f2fcd04561940af9d9826c353fe75c80433287e757dc75c3d80b629caa65587496317d3de79' +
      '42721f71e85ea3bfa24e21543e6101c445c989254cdbd4',
  },
];
