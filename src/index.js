import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { schedule } from "node-cron"
import fetchCryptoData from "./controllers/jobs.controller.js"
import cryptoRoutes from "./routes/crypto.route.js"

dotenv.config()

const app = express()

app.use(express.json())
	.use(express.urlencoded({ extended: true }))
	


// Schedule background job to run every 2 hours
schedule("0 */2 * * *", () => {
	console.log("Running scheduled job: Fetching crypto data...")
	fetchCryptoData()
})

// Routes
app.use("/api/v1/", cryptoRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
	connectDB()
})
