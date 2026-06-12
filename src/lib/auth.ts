import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

function getSecretKey() {
  if (!process.env.APP_SECRET) {
    throw new Error('APP_SECRET environment variable is required');
  }
  return process.env.APP_SECRET;
}

export interface TokenPayload {
  userId: string;
  role: 'CLIENT' | 'ADMIN';
}

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, getSecretKey(), { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, getSecretKey(), { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, getSecretKey()) as TokenPayload;
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
