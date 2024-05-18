const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isDrink:{
    type: Boolean,
    default: false        
  },
  taste: {
    type: [String],
    required: true
  }
})

const menuItem = mongoose.model('menuItem', menuItemSchema)
module.exports = menuItem