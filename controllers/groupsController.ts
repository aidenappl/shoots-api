import { Request, Response } from 'express';
import Responder from '../middleware/responder';
import { Group, ScreenTime, User, UserGroup } from '../models/model';

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
				return Responder.error(res, 'No associated groups found', null, 404);
			}
			const groupIds = assocGroups.map(group => group.group_id);
			if (groupIds.length === 0) {
				return Responder.error(res, 'No associated groups found', null, 404);
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

		// check if user exists
		const user = await User.findByPk(userIntID);
		if (!user) {
			return Responder.error(res, 'User not found', null, 404);
		}

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

		// delete the associated screen times
		await ScreenTime.destroy({
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

export { listGroups, getGroup, createGroup, createInvite, joinGroup, deleteGroup };