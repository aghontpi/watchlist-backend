import { Request, Response } from 'express';

/**
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  res.render('home');
};
