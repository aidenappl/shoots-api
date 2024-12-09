export const getLastMonday = (insToday?: Date): Date => {
	const today = insToday || new Date();
	const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
	const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Distance from today to last Monday
	const lastMonday = new Date(today);
	lastMonday.setDate(today.getDate() - diffToMonday);
	lastMonday.setHours(0, 0, 0, 0); // Set time to the start of the day
	return lastMonday;
};
