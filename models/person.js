const { default: mongoose } = require("mongoose");
const { required } = require("nodemon/lib/config");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  age:{
    type: Number,
    required: true
  },
  work:{
    type: String,
    enum: ['chef', 'Chef', 'waiter', 'Waiter', 'manager' , 'Manager', 'Manager'],
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true
  }
})

//Crete Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person