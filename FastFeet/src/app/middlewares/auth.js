import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authMiddleware = req.headers.authorization;

  if (!authMiddleware)
    return res.status(401).json({ Error: 'Token not provided!' });

  const [, token] = authMiddleware.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.id = decoded.id;
  } catch (err) {
    return res.status(401).json({ Error: 'Token invalid!' });
  }

  return next();
};
