import express from 'express';
import { refreshToken } from '../controllers/refreshTokenController';

const router = express.Router();

// [POST] refresh to get a new access & refresh token
router.post('/refresh', refreshToken);

export default router;
