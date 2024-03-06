import { Request, Response, NextFunction } from 'express';

export default class ValidateMiddleware {
  static validateBody(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email) || password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    next();
  }
}
