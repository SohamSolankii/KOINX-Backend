import axios from "axios"
import Crypto from "../models/crypto.model.js"

// Background job to fetch cryptocurrency data from CoinGecko API
const fetchCryptoData = async () => {
	try {
		// Fetch data from CoinGecko API for Bitcoin, Ethereum, and Matic
		const response = await axios.get(
			"https://api.coingecko.com/api/v3/coins/markets",
			{
				params: {
					vs_currency: "usd", // Fetch prices in USD
					ids: "bitcoin,ethereum,matic-network", // IDs for the cryptocurrencies
					x_cg_demo_api_key: process.env.COINGECKO_API_KEY, // Optional: Use API key if needed
				},
			}
		)

		const cryptoData = response.data

		// Iterate through fetched data and store it in the database
		for (const crypto of cryptoData) {
			console.log(`Fetched data for ${crypto.id}:`, {
				price: crypto.current_price,
				marketCap: crypto.market_cap,
				change24h: crypto.price_change_percentage_24h,
			})

			// Create a new document for the fetched cryptocurrency data
			const newEntry = new Crypto({
				coinId: crypto.id,
				price: crypto.current_price,
				marketCap: crypto.market_cap,
				change24h: crypto.price_change_percentage_24h,
			})

			// Save the document to the database
			await newEntry.save()
			console.log(`Saved data for ${crypto.id} successfully.`)
		}
	} catch (error) {
		console.error("Error fetching data from CoinGecko:", error.message)
	}
}

export default fetchCryptoData
