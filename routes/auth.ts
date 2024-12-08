import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/localAuthController';
import { githubAuth } from '../controllers/githubAuthController';
import { googleAuth } from '../controllers/googleAuthController';
const router = express.Router();

router.post('/google', googleAuth);
router.post('/github', githubAuth);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.delete('/logout', logoutUser);

export default router;
