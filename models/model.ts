import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import * as Models from '../types/models';

class User extends Model implements Models.User {
	id!: number;
	email!: string;
	name!: string;
	inserted_at!: Date;
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
	user_id: number = 0;
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

class Group extends Model {}
Group.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'group', timestamps: false },
);

class UserGroup extends Model {}
UserGroup.init(
	{
		user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
		group_id: { type: DataTypes.INTEGER, references: { model: Group, key: 'id' } },
		screen_time_goal: { type: DataTypes.INTEGER },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'user_groups', timestamps: false },
);

class UserDetails extends Model {}
UserDetails.init(
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' } },
		bio: { type: DataTypes.TEXT },
	},
	{ sequelize, modelName: 'user_details', timestamps: false },
);

class ScreenTime extends Model {}
ScreenTime.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
		total_time: { type: DataTypes.INTEGER },
		inserted_at: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: 'screen_time', timestamps: false },
);

User.hasOne(Authentication, { foreignKey: 'user_id' });
Authentication.belongsTo(User, { foreignKey: 'user_id' });

export { User, Authentication, Group, UserGroup, UserDetails, ScreenTime };