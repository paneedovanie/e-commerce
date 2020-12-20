const express = require('express')
const mongoose = require('mongoose')
const { json, urlencoded } = require('body-parser')

const cors = require('cors')
require('dotenv').config()

require('./src/config')

const app = express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())

require('./src/routes/api')(app)

if(process.env.NODE_ENV !== 'test') {
  // ADD THIS LINE
  // app.use(express.static(path.join(__dirname, './client/dist')));

  // // If no API routes are hit, send the React app
  // app.use('*', function(req, res) {
  //   res.sendFile(
  //     path.join(__dirname, './client/dist/index.html'), 
  //     function(err) { if (err) res.status(500).send(err) }
  //   );
  // });

  const PORT = process.env.PORT || 3000
  const DB_CONNECTION = process.env.DB_CONNECTION

  mongoose.connect(DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => { console.log('Database connected.') }
  )
  app.listen( PORT, () => console.log(`Server is running in port ${PORT}.`) )
}

module.exports = app