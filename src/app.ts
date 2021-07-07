import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { logAllRequests } from './logger/logger';
import {
  handleErrors,
  handleUncaughtException,
  handleUnhandledRejection,
} from './custom-error/error-handler';
import { auth } from './resources/authentication/authentication.router';
import { checkToken } from './common/check-token';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logAllRequests);

app.use('/login', auth);

app.use(checkToken);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
console.log('task8');
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardID/tasks', taskRouter);
app.use(handleErrors);
process.on('uncaughtException', handleUncaughtException);

process.on('unhandledRejection', handleUnhandledRejection);

export default app;
