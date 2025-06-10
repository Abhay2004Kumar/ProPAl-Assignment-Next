// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

interface TokenPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export const createToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id.toString() }, // Convert ObjectId to string
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};