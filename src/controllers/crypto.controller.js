import Crypto from "../models/crypto.model.js"

// Controller to fetch the latest cryptocurrency stats
export const getCryptoStats = async (req, res) => {
	const { coin } = req.query

	if (!coin) {
		return res
			.status(400)
			.json({
				error: "Please provide a coin name in the query parameter.",
			})
	}

	const sanitizedCoin = coin.trim().toLowerCase()
	console.log(`Query received for coin: ${sanitizedCoin}`)

	try {
		const latestData = await Crypto.findOne({ coinId: sanitizedCoin }).sort(
			{ timestamp: -1 }
		)

		if (!latestData) {
			console.log(`No data found for coinId: ${sanitizedCoin}`)
			return res
				.status(404)
				.json({ error: `No data found for the coin: ${sanitizedCoin}` })
		}

		console.log(`Found data for ${sanitizedCoin}:`, latestData)

		res.json({
			price: latestData.price,
			marketCap: latestData.marketCap,
			"24hChange": latestData.change24h,
		})
	} catch (error) {
		console.error("Error fetching data:", error.message)
		res.status(500).send("Server error while fetching crypto stats")
	}
}

// Controller to calculate the standard deviation of prices
export const getCryptoDeviation = async (req, res) => {
	const { coin } = req.query

	if (!coin) {
		return res
			.status(400)
			.json({
				error: "Please provide a coin name in the query parameter.",
			})
	}

	const sanitizedCoin = coin.trim().toLowerCase()
	console.log(
		`Query received for deviation calculation for coin: ${sanitizedCoin}`
	)

	try {
		const records = await Crypto.find({ coinId: sanitizedCoin })
			.sort({ timestamp: -1 })
			.limit(100)

		if (records.length === 0) {
			console.log(`No data found for coinId: ${sanitizedCoin}`)
			
			return res
				.status(404)
				.json({ error: `No data found for the coin: ${sanitizedCoin}` })
		}

		const prices = records.map((record) => record.price)

		console.log(`Prices for ${sanitizedCoin}:`, prices)

		const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length
		const variance = ( prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length )
		const standardDeviation = Math.sqrt(variance)

		res.json({ 
			deviation: parseFloat(standardDeviation.toFixed(2)) 
		})

	} catch (error) {
		console.error("Error calculating standard deviation:", error.message)
		res.status(500).send(
			"Server error while calculating standard deviation"
		)
	}
}
