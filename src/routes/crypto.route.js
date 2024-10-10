import express from "express"
import {
	getCryptoStats,
	getCryptoDeviation,
} from "../controllers/crypto.controller.js"

const router = express.Router()

// Route for fetching stats of a cryptocurrency
router.get("/stats", getCryptoStats)

// Route for calculating standard deviation of a cryptocurrency's price
router.get("/deviation", getCryptoDeviation)

export default router
