import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const COOKIE_EXPIRES_IN = process.env.COOKIE_EXPIRES_IN || '7';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

console.log('JWT_SECRET:', JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

export default {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_EXPIRES_IN,
  CLIENT_URL
};