import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface User {
  id: string;
  iat: number;
  alias: string;
  username: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: User;
}

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { roomToken } = req.cookies;

  if (!roomToken) return res.status(401).json({ message: 'you need a valid token' });

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) return res.status(500).json({ message: 'Internal Server Error' });

  jwt.verify(roomToken, secretKey, (err: VerifyErrors | null, user: any) => {
    if (err) return res.status(403).json({ message: 'Token denied' });
    req.user = user as User;
    next();
  });
};