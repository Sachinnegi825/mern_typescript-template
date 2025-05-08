import express, { Request, Response, NextFunction } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from '../controllers/admin.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate as express.RequestHandler);
router.use(isAdmin as express.RequestHandler);

// User management routes
router.get('/users', getAllUsers as express.RequestHandler);
router.get('/users/:id', getUserById as express.RequestHandler);
router.put('/users/:id/role', updateUserRole as express.RequestHandler);
router.delete('/users/:id', deleteUser as express.RequestHandler);

export default router;