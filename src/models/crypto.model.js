import { Schema, model } from "mongoose"

const cryptoSchema = new Schema({
	coinId: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	}, 
	marketCap: {
		type: Number,
		required: true,
	}, 
	change24h: {
		type: Number,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
})

export default Crypto = model("Crypto", cryptoSchema)

