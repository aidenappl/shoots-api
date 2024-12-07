declare namespace Models {
	// Common Timestamps
	interface Timestamps {
		inserted_at: Date;
		updated_at?: Date; // Optional for tables without `updated_at`
	}

	// User Model
	interface User extends Timestamps {
		id: number;
		email: string;
		name: string;
	}

	// Authentication Model
	interface Authentication {
		user_id: number;
		password?: string;
		google_id?: string;
		github_id?: string;
	}

	// Group Model
	interface Group extends Timestamps {
		id: number;
		name: string;
	}

	// UserGroup Model
	interface UserGroup extends Timestamps {
		user_id: number;
		group_id: number;
		screen_time_goal: number;
	}

	// UserDetails Model
	interface UserDetails {
		user_id: number;
		bio?: string;
	}

	// ScreenTime Model
	interface ScreenTime extends Timestamps {
		id: number;
		user_id: number;
		total_time: number;
	}
}

export = Models;
export as namespace Models;
