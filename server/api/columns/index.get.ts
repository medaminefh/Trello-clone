import Column from "~/types/db_schema/column.model";

export default defineEventHandler(async (event) => {
	const cols = await Column.find();
	return { cols };
});
