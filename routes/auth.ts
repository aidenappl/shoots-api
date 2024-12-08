import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/localAuthController';
import { githubAuth } from '../controllers/githubAuthController';
import { googleAuth } from '../controllers/googleAuthController';
const router = express.Router();

// [POST] login/signup with Google
router.post('/google', googleAuth);

// [POST] login/signup with Github
router.post('/github', githubAuth);

// [POST] login with email and password
router.post('/login', loginUser);

// [POST] signup with email and password
router.post('/register', registerUser);

// [DELETE] logout
router.delete('/logout', logoutUser);

export default router;
