const express = require('express');
const router = express.Router();
//Starter page
router.get('/', ( req ,res)=>res.render("home"));
//Add 
router.get('/dash',(req,res)=>res.render("dash"));
module.exports = router;