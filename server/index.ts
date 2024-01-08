import type { Nitro } from "nitropack";
import mongoose from "mongoose";
const runtimeConfig = useRuntimeConfig();

export default async (_nitroApp: Nitro) => {
	try {
		//DB connection
		await mongoose.connect(runtimeConfig.MONGODB_URI as string);

		// when db connected
		mongoose.connection.on("connected", () => {
			console.log("We're connected");
		});

		// when there is an error while connecting to db
		mongoose.connection.on("error", (err) => {
			console.log("Something wrong");
		});
	} catch (error) {
		console.log("Some error occured!");
	}
};
