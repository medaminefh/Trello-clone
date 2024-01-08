import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const columnSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		tasks: [
			{
				type: ObjectId,
				ref: "Task",
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Column", columnSchema);
