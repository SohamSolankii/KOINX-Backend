import { connect } from "mongoose"

const connectDB = async () => {
	try {
		await connect(process.env.MONGO_URL)
		console.log("MongoDB Connected...")
	} catch (error) {
		console.error("MongoDB connection error:", error.message) 
		process.exit(1)
	}
}

export default connectDB
