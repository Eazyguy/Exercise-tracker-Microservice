const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const connectDB = require('./config/db')

app.use(cors())
app.use(express.static('public'))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Connect Database
connectDB()

// logger
app.use(morgan('dev'))

// router 
app.use('/',require('./router/index'))
app.use('/api',require('./router/api'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
