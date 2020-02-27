import { Router } from 'express';
import User from './app/models/User';
import UserController from './app/controllers/UserController';

import './database/index';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Igor',
    email: 'sadoscolima@gmail.com',
    password_hash: '1234',
  });

  return res.json(user);
});

routes.post('/user', UserController.store);

export default routes;
