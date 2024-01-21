const mongoose = require('mongoose')

const connectDB = async()=>{
	try{
		await mongoose.connect("mongodb+srv://Eazyguy:johnsona@cluster0.gxzm5y2.mongodb.net/exercise")
		
		console.log("Database Connected")
	}catch(err){
		console.error(err)
	}
}

module.exports = connectDB