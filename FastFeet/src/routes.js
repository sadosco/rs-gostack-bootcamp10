import { Router } from 'express';
import './database/index';
import authMiddlewares from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddlewares);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);

export default routes;
