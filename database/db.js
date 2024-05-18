const mongoose = require('mongoose')
require('dotenv').config();

//Define the schema

//Define the mongoDb connection url
const mongoURL = process.env.MONGODB_URL


//set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//Get the Default Connection
//Mongoose maintains a default connection object representing the MOngoDB connection
const db = mongoose.connection;

//Define the Event Listeners for data base connection
db.on('connected', () => {
  console.log("Connected")
})

db.on('error', (err) => {
  console.log('Error' , err)
})

db.on('disconnected', () => {
  console.log('Disconnected')
})

//Export the Data Base connection 
module.exports = db