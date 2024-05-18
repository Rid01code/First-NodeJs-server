var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const menuItem = require('../models/menuItem')

router.use(bodyParser.json())   //it store all data in req.body

//post method for menuItem
router.post('/', async (req, res) => {
  try {
    const menuData = req.body;
    const newMenuItem = new menuItem(menuData)
    const response = await newMenuItem.save()
    console.log("Data Saved")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "internal server error"})
  }
})

//get method for menu item
router.get('/', async (req, res) => {
  try {
    const menuData = await menuItem.find()
    console.log("Data Fetched")
    res.status(200).json(menuData)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "internal server error"})
  }
})
//get method using params for getting specific data from specific url
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType //extract the taste from the URL parameter
    if (tasteType == 'sour' || tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'salty' ) {
      const response = await menuItem.find({ taste: tasteType })
      console.log("Data Fetched")
      res.status(200).json(response)
    } else {
      res.status(404).json({error:"Invalid Taste Type"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
  }
})

//Update menu item by put or patch method
router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id  //Extract the id from the url parameter
    const updatedMenuData = req.body  //Updated data of the menu
    
    const response = await menuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, //Return the updated document 
      runValidators: true //Run mongoose validation
    })

    if (!response) {
      return res.status(404).json({error:"Taste not found"})
    }

    console.log("updated")
    res.status(200).json(response)
    
  } catch (error) {
      console.log(error)
      res.status(500).json({error:"internal server error"})
  }
})

//Delete Item
router.delete('/:id', async (req, res) => {
  try {
    const menuId = req.params.id //Extract the id from URL
    //Function for delete the item 
    const response = await menuItem.findByIdAndDelete(menuId)
    if (!response) {
      return res.status(404).json({error:"Taste not found"})
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
  }
})



module.exports = router;