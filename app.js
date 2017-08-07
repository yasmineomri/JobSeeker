const express = require("express");
const path = require ("path");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require('./config/database');

 //connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () =>{
  console.log('connected to database' +config.database);
}) ;

// on error
mongoose.connection.on('connected', (err) =>{
  console.log('database error:' +err);
}) ;
const app = express();
const users = require('./routes/users');



// Port number
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);


//Index route
app.get('/', (req, res) =>{
  res.send('Invalid Endpoint');
});
app.get('*', (req,res) => {
  res.sendFile(path.join(_dirname, 'public/index.html'));
});

// start server
app.listen(port, () =>{
  console.log('Server started ib port' + port);
});
