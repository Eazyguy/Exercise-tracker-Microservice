const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(process.cwd() +'/views/index.html')
  console.log(process.cwd())
});

module.exports = router