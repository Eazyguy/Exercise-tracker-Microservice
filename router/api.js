const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Exercise = require('../models/Exercise')

router.post("/users",async(req,res)=>{
	try {
		
		const users = await User.findOne(req.body).select({__v:0})
		
		if(users){
			res.json(users)
		}else{
			
	const user = new User(req.body)

	res.json(user)
	await user.save()
			
		}
	} catch (err) {
		console.error(err)
	}
})

router.get('/users',async(req,res)=>{
	try {
		const users = await User.find()
		res.json(users)
	
	} catch (err) {
		res.json({error:"Server Error"})
		console.error(err)
	}
})

router.post("/users/:_id/exercises",async(req,res)=>{
	try {

		const exercises = await Exercise.findOne({user:req.params._id, description:req.body.description})
		
		const user = await User.findOne(req.params).select({__v:0})
		if(exercises){
			
			res.json({
				_id:user._id,
				username: user.username,
				date: exercises.date.toDateString(),
				duration: exercises.duration,
				description: exercises.description,
				
			})
		}else{

			let date = new Date(req.body.date)
			let redate = new Date()
			
			if(req.body.date == ''||!req.body.date){
				date = redate
			}
			
			const newExercise = new Exercise({
				user:req.params._id,
				description: req.body.description,
				duration: req.body.duration,
				date,
			})
			
			await newExercise.save()
		
		 res.json({
		 	_id:user._id,
			username: user.username,
			date: newExercise.date.toDateString(),
			duration: newExercise.duration,
		 	description: newExercise.description,
		 	
		 })
			
		}
		
	} catch (err) {
		console.error(err)
		res.status(500).json("error, Something went wrong ")
	}
})

router.get("/users/:_id/logs?", async(req,res)=>{
	
	let from = req.query.from
	let to = req.query.to
	let limit = req.query.limit
	
	
	let exercises = await Exercise.find({
		user:req.params._id
	}).select({user:0,__v:0})
	
	const user = await User.findOne({_id:req.params._id}).select({__v:0})
	const count = await Exercise.countDocuments({user:req.params._id})

let log = exercises.map((exer)=>{
	const date = exer.date.toDateString()
	return {
		description:exer.description,
		duration:exer.duration,
		date
	}
})
	console.log(req.query)
	if(from||to||limit){
		from = new Date(from)
		to = new Date(to)


		exercises = await Exercise.find({
			user:req.params._id,
			date:{
				$gte:from,
				$lte:to
			}
			
		})
		.limit(limit)
		.sort('asc')
		
		log = exercises.map((exer)=>{
	const date = exer.date.toDateString()
	return {
		description:exer.description,
		duration:exer.duration,
		date
	}
})

console.log(log)

res.json({
		user,
		count,
		log
	})
		
	} else {
		console.log(log)
	 res.json({
		user,
		count,
		log
	})
	}
	
})

module.exports = router