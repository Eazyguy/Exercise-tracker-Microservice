const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./sample.env'})

const connectDB = async()=>{
	try{
		await mongoose.connect(process.env.DATABASE)
		
		console.log("Database Connected")
	}catch(err){
		console.error(err)
	}
}

module.exports = connectDB