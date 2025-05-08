import express from 'express';
import { signup, login, getCurrentUser, logout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);


// Protected routes
router.get('/me', authenticate as express.RequestHandler, getCurrentUser as express.RequestHandler);

export default router;