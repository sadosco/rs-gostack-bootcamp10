import { Router } from 'express';
import './database/index';
import authMiddlewares from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddlewares);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

export default routes;
