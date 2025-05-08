import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';
import { UserRole } from '@/types/user.types';

const COOKIE_EXPIRY =
  parseInt(process.env.COOKIE_EXPIRES_IN || '7') * 24 * 60 * 60 * 1000;

export const generateToken = (id: string, role: UserRole): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  const secret: jwt.Secret = JWT_SECRET;
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any,
  };
  
  return jwt.sign({ id, role }, secret, options);
};

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_EXPIRY,
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.cookie('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
  });
};