var express = require('express');
var router = express.Router();
const db = require('../database/db')
const bodyParser = require('body-parser')
const personRoutes = require('../routes/personRoutes') //Import the personRoutes.js
const menuItemRoutes = require('../routes/menuItemRoutes')  //import the menuItemRoutes.js

router.use(bodyParser.json());   //it store all data in req.body

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
  

router.use('/person', personRoutes);

router.use('/menu' , menuItemRoutes)

module.exports = router;
