const express = require('express')
const mongoose = require('mongoose')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => { console.log('Database connected.') }
)

const app = express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())

require('./src/api/v1/routes')(app)


app.listen(5000, () => {
    console.log('Server is running.')
})