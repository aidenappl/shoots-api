import express from 'express';
import {
	addScreenTime,
	createGroup,
	createInvite,
	deleteGroup,
	getGroup,
	getGroupMembers,
	getGroupScreenTime,
	getHistoricalRankings,
	getWeeklyRankings,
	joinGroup,
	listGroups,
} from '../controllers/groupsController';
import { authenticate } from '../middleware/authMiddleware';
const router = express.Router();

// [GET] all/associated groups
router.get('/', authenticate, listGroups);

// [GET] specific group
router.get('/:id', authenticate, getGroup);

// [GET] specific group's members
router.get('/:id/members', authenticate, getGroupMembers);

// [GET] specific group's screen time
router.get('/:id/time', authenticate, getGroupScreenTime);

// [POST] add screen time to group
router.post('/:id/time', authenticate, addScreenTime);

// [GET] weekly rankings
router.get('/:id/rankings', authenticate, getWeeklyRankings);

// [GET] historical rankings
router.get('/:id/historical', authenticate, getHistoricalRankings);

// [POST] create group
router.post('/', authenticate, createGroup);

// [PUT] handle user invite to group
router.put('/:group_id/invite', authenticate, createInvite);

// [PUT] handle user joining group
router.put('/join', authenticate, joinGroup);

// [DELETE] deletes group
router.delete('/:id', authenticate, deleteGroup);

export default router;
