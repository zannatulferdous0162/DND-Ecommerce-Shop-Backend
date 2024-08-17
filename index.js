const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const app = express()
const port =process.env.PORT || 3000

app.use(express.json())
app.use(cors())



mongoose.connect(process.env.dB).then(()=>{
    console.log('mongoDB Connected');
})



// router

const productRouter=require('./Route/productRoute')


// inital router

app.use('/api/v1/products',productRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})