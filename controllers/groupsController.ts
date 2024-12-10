import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import { Group, ScreenTime, User, UserGroup } from '../models/model';
import sendDynamicEmail from '../utils/sendgrid';
import { Op } from 'sequelize';
import { getLastMonday } from '../utils/getMonday';

/**
 * List all groups or groups associated with the user
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups
 * @method GET
 * @example
 *     /groups?self=[boolean?]
 * @description
 * This controller is used to list all groups or groups associated with the user
 *   Steps:
 * 1. It checks if the user is requesting their associated groups
 * 2. If the user is requesting their associated groups, it fetches the associated groups
 * 3. If the user is not requesting their associated groups, it fetches all groups
 * 4. It sends a success response with the groups
 * 5. If an error occurs, it sends an error response
 */
const listGroups = async (req: Request, res: Response) => {
	try {
		const { user } = res.locals;
		if (req.query.self === 'true') {
			const assocGroups = await UserGroup.findAll({
				where: {
					user_id: user.id,
				},
			});
			if (!assocGroups) {
				return Responder.success(res, 'User is not in any groups yet', []);
			}
			const groupIds = assocGroups.map(group => group.group_id);
			if (groupIds.length === 0) {
				return Responder.success(res, 'User is not in any groups yet', []);
			}
			const groups = await Group.findAll({
				where: {
					id: groupIds,
				},
			});
			return Responder.success(res, 'associated groups fetched successfully', groups);
		} else {
			const groups = await Group.findAll();
			return Responder.success(res, 'Groups fetched successfully', groups);
		}
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching groups', err);
	}
};

/**
 * Get a group by id or code
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id
 * @method GET
 * @example
 *    /groups/1 or /groups/abcdef
 * @description
 * This controller is used to get a group by id or code
 *  Steps:
 * 1. It checks if the id is an integer
 * 2. If the id is not an integer, it attempts to find the group by code
 * 3. If the id is an integer, it looks up the group by id
 * 4. It sends a success response with the group
 * 5. If an error occurs, it sends an error response
 */
const getGroup = async (req: Request, res: Response) => {
	try {
		// check if id is an integer
		const idInt = parseInt(req.params.id);
		if (isNaN(idInt)) {
			// attempt to find group by code
			const group = await Group.findOne({ where: { code: req.params.id } });
			if (!group) {
				return Responder.error(res, 'Group not found', null, 404);
			}
			return Responder.success(res, 'Group fetched successfully', group);
		} else {
			// lookup group by id
			const group = await Group.findByPk(idInt);
			if (!group) {
				return Responder.error(res, 'Group not found', null, 404);
			}
			return Responder.success(res, 'Group fetched successfully', group);
		}
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching group', err);
	}
};

/**
 * Create a group
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups
 * @method POST
 * @example
 *    /groups
 *    {
 *      "name": "Group Name",
 *      "screen_time_goal": 120,
 *      "stake": 100
 *    }
 * @description
 * This controller is used to create a group
 * Steps:
 * 1. It checks if name, screen_time_goal and stake are provided
 * 2. It randomly generates a code for the group
 * 3. It creates the group
 * 4. It sends a success response with the group
 * 5. If an error occurs, it sends an error response
 */
const createGroup = async (req: Request, res: Response) => {
	try {
		//  check if name, screen_time_goal and stake are provided
		const { name, screen_time_goal, stake } = req.body;
		if (!name && !screen_time_goal && !stake) {
			return Responder.error(res, 'Name, screen_time_goal and stake are required', null, 422);
		}

		// randomly generate a code for the group
		const code = Math.random().toString(36).substring(2, 8).toUpperCase();

		// create the group
		const group = await Group.create({
			name,
			screen_time_goal,
			stake,
			code,
		});

		// add the user to the group
		await UserGroup.create({
			user_id: res.locals.user.id,
			group_id: group.id,
		});

		// send success response
		return Responder.success(res, 'Group created successfully', group);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while creating group', err);
	}
};

/**
 * Create an invite to a group
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:group_id/invite
 * @method PUT
 * @example
 *   /groups/1/invite
 *   {
 *      "user_id": 2
 *   }
 * @description
 * This controller is used to create an invite to a group
 * Steps:
 * 1. It checks if group_id and user_id are provided
 * 2. It checks if group_id is an integer
 * 3. It checks if user_id is an integer
 * 4. It checks if the user exists
 * 5. It checks if the group exists
 * 6. It checks if the user is already in the group
 * 7. It checks if the inviter is in the group
 * 8. It creates the invite
 * 9. It sends a success response
 * 10. If an error occurs, it sends an error response
 */
const createInvite = async (req: Request, res: Response) => {
	try {
		const { group_id } = req.params;
		const { user_id } = req.body;

		if (!group_id) {
			return Responder.error(res, 'Group ID is required', null, 422);
		}

		if (!user_id) {
			return Responder.error(res, 'User ID is required', null, 422);
		}

		const intID = parseInt(group_id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const userIntID = parseInt(user_id);
		if (isNaN(userIntID)) {
			return Responder.error(res, 'User ID must be an integer', null, 422);
		}

		// check if invitee exists
		const user = await User.findByPk(userIntID);
		if (!user) {
			return Responder.error(res, 'User not found', null, 404);
		}

		// get the inviter
		const inviter = await User.findByPk(res.locals.user.id);
		if (!inviter) {
			return Responder.error(res, 'Inviter not found', null, 404);
		}

		// check if group exists
		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		// check if user is already in group
		const userGroup = await UserGroup.findOne({
			where: {
				user_id: userIntID,
				group_id: intID,
			},
		});
		if (userGroup) {
			return Responder.error(res, 'User is already in group', null, 409);
		}

		// check if inviter is in the group
		const inviterGroup = await UserGroup.findOne({
			where: {
				user_id: res.locals.user.id,
				group_id: intID,
			},
		});
		if (!inviterGroup) {
			return Responder.error(res, 'You are not in the group', null, 403);
		}

		// create invite
		await UserGroup.create({
			user_id: userIntID,
			group_id: intID,
		});

		// send email to user
		sendDynamicEmail({
			email: user.email,
			subject: 'New Invitation - Shoots',
			title: 'New Invitation',
			body: `Hi ${user.name},\n\nYou've been invited to join: <b>${group.name}</b> by <i>${inviter.name}</i>. If you'd like to join this group click the join group button below!`,
			action_button_url: 'https://shoots.aplb.xyz/groups/join?code=' + group.code,
			action_button_text: 'View Invitation',
		});

		return Responder.success(res, 'Invite sent successfully', null);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while sending invite', err);
	}
};

/**
 * Join a group
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/join
 * @method PUT
 * @example
 *  /groups/join
 *  {
 *      "code": "abcdef"
 *  }
 * @description
 * This controller is used to join a group
 * Steps:
 * 1. It checks if code is provided
 * 2. It checks if the group exists
 * 3. It checks if the user is already in the group
 * 4. It adds the user to the group
 * 5. It sends a success response
 * 6. If an error occurs, it sends an error response
 */
const joinGroup = async (req: Request, res: Response) => {
	try {
		const { code } = req.body;
		if (!code) {
			return Responder.error(res, 'Code is required', null, 422);
		}

		const group = await Group.findOne({ where: { code } });
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		const userGroup = await UserGroup.findOne({
			where: {
				user_id: res.locals.user.id,
				group_id: group.id,
			},
		});
		if (userGroup) {
			return Responder.error(res, 'User is already in group', null, 409);
		}

		await UserGroup.create({
			user_id: res.locals.user.id,
			group_id: group.id,
		});

		return Responder.success(res, 'User joined group successfully', null);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while joining group', err);
	}
};

/**
 * Delete a group
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id
 * @method DELETE
 * @example
 * /groups/1
 * @description
 * This controller is used to delete a group
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It checks if the user is in the group
 * 4. It deletes the associated user groups
 * 5. It deletes the associated screen times
 * 6. It deletes the group
 * 7. It sends a success response
 * 8. If an error occurs, it sends an error response
 */
const deleteGroup = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const intID = parseInt(id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		// check if user is in the group
		const userGroup = await UserGroup.findOne({
			where: {
				user_id: res.locals.user.id,
				group_id: intID,
			},
		});
		if (!userGroup) {
			return Responder.error(res, 'You are not in the group', null, 403);
		}

		// delete the associated user groups
		await UserGroup.destroy({
			where: {
				group_id: intID,
			},
		});

		await group.destroy();

		return Responder.success(res, 'Group deleted successfully', null);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while deleting group', err);
	}
};

/**
 * Get group members
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id/members
 * @method GET
 * @example
 * /groups/1/members
 * @description
 * This controller is used to get group members
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It fetches the group members
 * 4. It sends a success response with the members
 * 5. If an error occurs, it sends an error response
 */
const getGroupMembers = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const intID = parseInt(id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		const userGroups = await UserGroup.findAll({
			where: {
				group_id: intID,
			},
			attributes: ['user_id'],
		});
		if (!userGroups) {
			return Responder.error(res, 'No members found', null, 404);
		}

		const userIds = userGroups.map(userGroup => userGroup.user_id);
		const members = await User.findAll({
			where: {
				id: userIds,
			},
			attributes: ['id', 'name', 'email', 'profile_picture', 'inserted_at'],
		});

		return Responder.success(res, 'Members fetched successfully', members);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching members', err);
	}
};

/**
 * Get group screen time
 * @param req Express request
 * @param res Express response
 * @returns void
 *
 * @route /groups/:id/time
 * @method GET
 * @example
 * /groups/1/time
 * @description
 * This controller is used to get group screen time
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It fetches the screen times for the group
 * 4. It sends a success response with the screen times
 * 5. If an error occurs, it sends an error response
 */
const getGroupScreenTime = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const intID = parseInt(id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		// fet users from group
		const users = await UserGroup.findAll({
			where: {
				group_id: intID,
			},
			attributes: ['user_id'],
		});
		if (!users) {
			return Responder.error(res, 'No users found', null, 404);
		}

		const userIds = users.map(user => user.user_id);

		const screenTimes = await ScreenTime.findAll({
			where: {
				user_id: userIds,
			},
			attributes: ['id', 'submitted_time', 'inserted_at'],
			include: {
				model: User,
				attributes: ['name'],
			},
		});
		if (!screenTimes) {
			return Responder.error(res, 'No screen times found', null, 404);
		}

		return Responder.success(res, 'Screen times fetched successfully', screenTimes);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching screen times', err);
	}
};

/**
 * Add screen time to a group
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id/time
 * @method POST
 * @example
 * /groups/1/time
 * {
 *   "time": 10.20 (IN HOURS)
 * }
 * @description
 * This controller is used to add screen time to a group
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It checks if time is provided
 * 4. It creates the screen time
 * 5. It sends a success response
 * 6. If an error occurs, it sends an error response
 */
const enterScreenTime = async (req: Request, res: Response) => {
	try {
		const { user } = res.locals;
		const { time } = req.body;
		if (!time) {
			return Responder.error(res, 'Time is required', null, 422);
		}
		const screenTimeAmount = parseInt(time);
		if (isNaN(screenTimeAmount)) {
			return Responder.error(res, 'Screen time must be an integer', null, 422);
		}

		// check that user hasn't submitted time for last 7 days
		const submittedTime = await ScreenTime.findOne({
			where: {
				user_id: user.id,
				inserted_at: {
					[Op.gte]: getLastMonday(),
				},
			},
		});
		if (submittedTime) {
			return Responder.error(res, 'You have already submitted time for this week', null, 409);
		}

		const screenTime = await ScreenTime.create({
			user_id: user.id,
			submitted_time: screenTimeAmount,
		});

		return Responder.success(res, 'Screen time added successfully', screenTime);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while adding screen time', err);
	}
};

/**
 * Get weekly rankings
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id/rankings
 * @method GET
 * @example
 * /groups/1/rankings
 * @description
 * This controller is used to get weekly rankings
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It fetches the screen times for the group
 * 4. It calculates the weekly rankings
 * 5. It sends a success response with the rankings
 * 6. If an error occurs, it sends an error response
 * @note
 * This controller uses the getLastMonday function from the getMonday.ts file
 * The getLastMonday function is used to get the date of the last Monday
 */
const getWeeklyRankings = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const intID = parseInt(id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		// get all users in the group
		const userGroups = await UserGroup.findAll({
			where: {
				group_id: group.id,
			},
			attributes: ['user_id'],
		});

		const userIds = userGroups.map(userGroup => userGroup.user_id);

		// get all users
		const users = await User.findAll({
			where: {
				id: userIds,
			},
			attributes: ['id', 'name', 'email', 'profile_picture'],
		});

		const screenTimes = await ScreenTime.findAll({
			where: {
				user_id: userIds,
				inserted_at: {
					[Op.gte]: getLastMonday(),
				},
			},
			attributes: ['user_id', 'submitted_time'],
		});
		if (!screenTimes) {
			return Responder.error(res, 'No screen times found', null, 404);
		}

		const userTimes: { [key: number]: number } = {};
		screenTimes.forEach(screenTime => {
			if (userTimes[screenTime.user_id]) {
				userTimes[screenTime.user_id] += screenTime.submitted_time;
			} else {
				userTimes[screenTime.user_id] = screenTime.submitted_time;
			}
		});

		const sortedTimes = Object.entries(userTimes).sort((a, b) => a[1] - b[1]);
		const rankings = sortedTimes.map(([userId, time], index) => {
			return {
				rank: index + 1,
				user: users.find(user => user.id === parseInt(userId)),
				time,
			};
		});

		return Responder.success(res, 'this weeks rankings fetched successfully', rankings);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching weekly rankings', err);
	}
};

/**
 * Get historical rankings
 * @param req Express request
 * @param res Express response
 * @returns void
 * @route /groups/:id/historical
 * @method GET
 * @example
 * /groups/1/historical
 * @description
 * This controller is used to get historical rankings
 * Steps:
 * 1. It checks if the id is an integer
 * 2. It checks if the group exists
 * 3. It fetches the screen times for the group
 * 4. It calculates the weekly rankings
 * 5. It sends a success response with the rankings
 * 6. If an error occurs, it sends an error response
 */
const getHistoricalRankings = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const intID = parseInt(id);
		if (isNaN(intID)) {
			return Responder.error(res, 'Group ID must be an integer', null, 422);
		}

		const group = await Group.findByPk(intID);
		if (!group) {
			return Responder.error(res, 'Group not found', null, 404);
		}

		// get all users in the group
		const userGroups = await UserGroup.findAll({
			where: {
				group_id: intID,
			},
			attributes: ['user_id'],
		});

		const userIds = userGroups.map(userGroup => userGroup.user_id);

		const screenTimes = await ScreenTime.findAll({
			where: {
				user_id: userIds,
			},
			attributes: ['user_id', 'submitted_time', 'inserted_at'],
		});
		if (!screenTimes) {
			return Responder.error(res, 'No screen times found', null, 404);
		}

		const userTimes: { [key: number]: { [key: string]: number } } = {};
		screenTimes.forEach(screenTime => {
			const week = getLastMonday(screenTime.inserted_at);
			const weekStr = week.toISOString();
			if (userTimes[screenTime.user_id]) {
				if (userTimes[screenTime.user_id][weekStr]) {
					userTimes[screenTime.user_id][weekStr] += screenTime.submitted_time;
				} else {
					userTimes[screenTime.user_id][weekStr] = screenTime.submitted_time;
				}
			} else {
				userTimes[screenTime.user_id] = { [weekStr]: screenTime.submitted_time };
			}
		});

		// get all users
		const users = await User.findAll({
			where: {
				id: userIds,
			},
			attributes: ['id', 'name', 'email', 'profile_picture'],
		});

		const rankings = Object.entries(userTimes).map(([userId, weeks]) => {
			const user = users.find(user => user.id === parseInt(userId));
			const weekRankings = Object.entries(weeks).sort((a, b) => a[1] - b[1]);
			return {
				user,
				weekRankings: weekRankings.map(([week, time], index) => {
					return {
						rank: index + 1,
						week,
						time,
					};
				}),
			};
		});

		return Responder.success(res, 'historical rankings fetched successfully', rankings);
	} catch (err) {
		console.log(err);
		Responder.error(res, 'An error occurred while fetching historical rankings', err);
	}
};

export {
	listGroups,
	getGroup,
	createGroup,
	createInvite,
	joinGroup,
	deleteGroup,
	getWeeklyRankings,
	getGroupMembers,
	getGroupScreenTime,
	enterScreenTime,
	getHistoricalRankings,
};
