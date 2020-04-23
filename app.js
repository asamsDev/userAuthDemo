const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//Add Passport
const passport = require('passport');
//db
const db = require('./config/keys').MongoURI;
//connect to db
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('db connected'))
.catch(err=>console.log('Theres a error'+err))
const app = express();
//Add Passport config
require('./config/passport')(passport);
//AddPassport middleware
app.use(passport.initialize());
app.use(passport.session());
//view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
//bodyParser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/', require('./routes/index'))
app.use('/users',require('./routes/users'))


const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));