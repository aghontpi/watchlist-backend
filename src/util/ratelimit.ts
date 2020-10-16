import rateLimit from 'express-rate-limit';

import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from './secrets';

export const limitrequest = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS * 60 * 1000,
  max: RATE_LIMIT_MAX,
  message: `You are making requests frequently, slow down!`,
});
