import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import * as Models from '../types/models';

class User extends Model implements Models.User {
	id!: number;
	email!: string;
	name!: string;
	inserted_at!: Date;
	profile_picture!: string;
	updated_at?: Date | undefined;
}
User.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		email: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING },
		inserted_at: { type: DataTypes.DATE },
		updated_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'users', timestamps: false },
);

class Authentication extends Model implements Models.Authentication {
	user_id!: number;
	password?: string | undefined;
	google_id?: string | undefined;
	github_id?: string | undefined;
}
Authentication.init(
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' } },
		password: { type: DataTypes.STRING },
		google_id: { type: DataTypes.STRING },
		github_id: { type: DataTypes.STRING },
	},
	{ sequelize, modelName: 'authentications', timestamps: false },
);

class Group extends Model implements Models.Group {
	id!: number;
	name!: string;
	screen_time_goal!: number;
	code!: string;
	stake!: number;
	inserted_at!: Date;
}
Group.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		screen_time_goal: { type: DataTypes.INTEGER },
		code: { type: DataTypes.STRING },
		stake: { type: DataTypes.FLOAT },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'group', timestamps: false },
);

class UserGroup extends Model implements Models.UserGroup {
	user_id!: number;
	group_id!: number;
	inserted_at!: Date;
}
UserGroup.init(
	{
		user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
		group_id: { type: DataTypes.INTEGER, references: { model: Group, key: 'id' } },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'user_groups', timestamps: false },
);

class ScreenTime extends Model {}
ScreenTime.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
		group_id: { type: DataTypes.INTEGER, references: { model: Group, key: 'id' } },
		submitted_time: { type: DataTypes.INTEGER },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'screen_time', timestamps: false },
);

export { User, Authentication, Group, UserGroup, ScreenTime };
