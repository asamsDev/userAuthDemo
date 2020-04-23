const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const passport=require('passport');
const User = require('../models/User')

//Login Page
router.get('/login', (req,res)=>res.render('login'));

//Singup
router.get('/signup', (req,res)=>res.render('signup'));


router.post('/register',(req,res)=>{
    console.log(req.body)
    const {name,email,password,password2}=req.body;
    let errors=[];
    if(!name||!email||!password||!password2){
        errors.push({msg:'Fill all fields out'});
    }
    if(password != password2){
        errors.push({msg:'Passwords do not match!'});
    }
    if(errors.length >0){
        res.send('Please fill the form out correctly')
    }
    else{
        //Validated
        User.findOne({email:email})
        .then(user => {
            if(user){
                res.send('user exists')
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password

                });
                console.log(newUser);
                //Add Hash Password
                bcrypt.genSalt(10,(err, salt)=>
                bcrypt.hash(newUser.password, salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    //Save User
                    newUser.save()
                        .then(user=>{
                            res.redirect('/users/login');
                        })
                        .catch(err=>console.log(err));
                }))



            }

        });

    }
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/dash',
        failureRedirect:'/users/login'
    })(req,res,next);

});
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/users/login');
})

module.exports = router;