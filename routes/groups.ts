import express from 'express';
import {
	createGroup,
	createInvite,
	deleteGroup,
	getGroup,
	joinGroup,
	listGroups,
} from '../controllers/groupsController';
import { authenticate } from '../middleware/authMiddleware';
const router = express.Router();

// [GET] all/associated groups
router.get('/', authenticate, listGroups);

// [GET] specific group
router.get('/:id', authenticate, getGroup);

// [POST] create group
router.post('/', authenticate, createGroup);

// [PUT] handle user invite to group
router.put('/:group_id/invite', authenticate, createInvite);

// [PUT] handle user joining group
router.put('/join', authenticate, joinGroup);

// [DELETE] deletes group
router.delete('/:id', authenticate, deleteGroup);

export default router;
