import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const createToken = (user: any) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
