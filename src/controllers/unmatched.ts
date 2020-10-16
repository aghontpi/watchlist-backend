import { Request, Response } from 'express';

/**
 * @route GET /*
 */
export const index = (_: Request, res: Response) => {
  res.redirect('/');
};
