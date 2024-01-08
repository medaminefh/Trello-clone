import User from "~/types/db_schema/user.model";

export default defineEventHandler(async (event) => {
	const users = await User.find();
	return { users };
});
