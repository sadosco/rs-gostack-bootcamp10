import './database/index';

import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddlewares from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveredController from './app/controllers/DeliveredController';
import WithdrawnController from './app/controllers/WithdrawnController';
import DeliveriesController from './app/controllers/DeliveriesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id/delivery', DeliveriesController.index);
routes.put(
  '/deliveryman/:id/delivery/:delivery_id/withdrawn',
  WithdrawnController.update
);
routes.put(
  '/deliveryman/:id/delivery/:delivery_id/delivered',
  DeliveredController.update
);

routes.use(authMiddlewares);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.create);

export default routes;
