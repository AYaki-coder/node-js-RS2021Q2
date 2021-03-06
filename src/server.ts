import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';
import app from './app';
import typeormConfig from './common/ormconfig';
import { logger } from './logger/logger';
import { handleUncaughtException } from './custom-error/error-handler';
import { create } from './resources/users/user.service';

createConnection(typeormConfig)
  .then(async (connection) => {
    if (connection.isConnected) {
      console.log('DB connection succeed');
      logger.info({ message: 'DB connection succeed' });
      create({
        name: 'AdminAdminych',
        login: 'admin',
        password: 'admin',
      });
      app.listen(config.PORT, () =>
        console.log(`App is running on http://localhost:${config.PORT}`)
      );
    } else {
      connection.connect();
    }
  })
  .catch((error) => handleUncaughtException(error, 'server.ts'));
