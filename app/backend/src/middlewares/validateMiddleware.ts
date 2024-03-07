import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class ValidateMiddleware {
  static validateBody(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email) || password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token1 = req.headers.authorization;
    if (!token1) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = token1.split(' ')[1];
    try {
      const secret = process.env.SECRET ?? 'secret';
      const decoded = jwt.verify(token, secret);
      res.locals.authorization = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
