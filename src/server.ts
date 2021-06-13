import errorHandler from 'errorhandler';

import app from './app';
import { ENVIRONMENT } from './util/secrets';

/**
 * Error Handler. Provides full stack
 */
if (ENVIRONMENT === 'development') {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), 'localhost', () => {
  console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), ENVIRONMENT);
  console.log('  Press CTRL-C to stop\n');
});

export default server;
