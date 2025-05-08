import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { authenticate, isUser } from '../middlewares/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate as express.RequestHandler);

// Get user profile - accessible by the user and admin
router.get('/profile', isUser as express.RequestHandler, getProfile as express.RequestHandler);

// Update user profile - accessible by the user and admin
router.put('/profile', isUser as express.RequestHandler, updateProfile as express.RequestHandler);

export default router;