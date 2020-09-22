const express = require('express')
const mongoose = require('mongoose')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())

// ADD THIS LINE
app.use(express.static('client/build'));

require('./src/api/v1/routes')(app)

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => { console.log('Database connected.') }
  )
  
  app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running.')
  })
}

module.exports = app