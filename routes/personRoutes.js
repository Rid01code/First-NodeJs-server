var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const Person = require('../models/person')
const menuItem = require('../models/menuItem')

router.use(bodyParser.json())   //it store all data in req.body

//Post Method for person
router.post('/', async(req, res) => {
  try {
    const data = req.body //Assuming the request body contains the person data
  
    //create a new Person document using the mongoose model
    const newPerson = new Person(data)

    //save the newPerson to the document
    const response = await newPerson.save()
    console.log('Data Saved')
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "internal server error"})
  }
})

//Get method for person
router.get('/', async(req , res) => {
  try {
    const data = await Person.find()
    console.log("Data Fetched")
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal error"})
  }
})

//get method using params for getting specific data from specific url
router.get('/:workType' , async (req, res) => {
  try {
    const workType = req.params.workType //Extract the work type from the URL parameter
    if (workType == 'chef', 'Chef' || workType == 'manager', 'Manager' || workType == 'Waiter', 'waiter') {
      const response = await Person.find({ work: workType })
      console.log("Response Fetched")
      res.status(200).json(response)
    } else {
      res.status(404).json({error:"Invalid Work Type"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal error"})
  }
})

//Update menu item by put or patch method
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id //Extract the id from the URL parameter
    const updatedPersonData = req.body //Updated data of the person
    //function for Find the data and Update
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true
    })

    if (!response) {
      return res.status(404).json({error:"Person not found"})
    }

    console.log("Updated")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
  }
})

//delete Item
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id //Extract the Id from URL
    //Function for delete the Item
    const response = await Person.findByIdAndDelete(personId)
    if (!response) {
      return res.status(404).json({error:"Person not found"})
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
  }
})

module.exports = router;
