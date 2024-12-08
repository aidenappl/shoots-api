import express from 'express';
const router = express.Router();
import { authenticate } from '../middleware/authMiddleware';
import { getSelf, getUserDetails, updateUser } from '../controllers/userController';

// [GET] Get current user
router.get('/', authenticate, getSelf);

// [GET] Get user by ID
router.get('/:id', authenticate, getUserDetails);

// [PUT] Update current user
router.put('/', authenticate, updateUser);

export default router;
