import { ErrorRequestHandler } from 'express';
import { UnauthorizedError } from 'express-jwt';

const handle401: ErrorRequestHandler = (err, req, res, next) => {
  console.log('401 error');
  if (err.name === UnauthorizedError.name) {
    res.status(401).send('Invalid Token');
  }
  next(err);
};

export { handle401 as unauthorizedErrorMiddleware };
