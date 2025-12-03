import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...roles:string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({
          status: true,
          message: 'You are not valid user',
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      console.log(decoded);
      req.user = decoded as JwtPayload;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          success: false,
          message:"Unauthorized"
        })
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  };
};

export default auth;
