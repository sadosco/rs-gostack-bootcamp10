import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import './database/index';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
