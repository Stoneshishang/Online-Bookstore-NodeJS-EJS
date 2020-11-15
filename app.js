const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const axios = require('axios');
const { localhost } = require('./config');
const { response } = require("express");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//create app using express
const app = express();

<<<<<<< HEAD
=======
const clientPath = `${__dirname}/client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
//set view engine using ejs
app.set('view engine', 'ejs');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//let express know that static files are held in the public folder
app.use(express.static("public"));

const messages = (req,res,next) =>{
  let message;
  res.locals.message = message;
  next()
}

app.get("/", function(req, res){

  axios.get(`${localhost}/Book/Books`)
  .then(function (response) {
    // handle success
    // console.log('status: ',response.status);
    // console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  axios.get(`${localhost}/Category/Category/Fiqh`)
  .then(function (response) {
    // handle success
    // console.log('status: ',response.status);
    // console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  res.render("home");
});

<<<<<<< HEAD
app.get("/signin", messages, function(req, res){
=======
app.get("/signin", function(req, res){
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c

  res.render("signin");
});

app.post("/signin", function(req, res){
<<<<<<< HEAD
 
 let logOnUserName_    = req.body.userName;
=======
  //username is in Postman POST request Login. it randomly generated in the Postman pre-request Script
  //password is aaldhahe
 let logOnUserName_ = req.body.userName;
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
 let logOnPassword_ = req.body.logOnPassword;


  const body1={ 
    username : logOnUserName_,
    password : logOnPassword_
  };

  axios.post( `${localhost}/Security/Login`,
  body1
  )
  .then(function (response) {
    console.log('login success');
    if(response.status == 200){
      res.redirect('/signedonalready')
    }
  })
  .catch(function (error) {
<<<<<<< HEAD
    console.log('signed in Fail');
    // if(response.status !== 200 && response.status !== null){
      let message = "Username or Password is incorrect, please retry."
      res.locals.message = message;
      res.render('signin')
    // }
=======
    console.log(error);
    if(response.status !== 200 && response.status !== null){
      res.redirect('/signin')
    }
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
  });

  
});

<<<<<<< HEAD
app.get("/register", messages,function(req, res){
=======
app.get("/register", function(req, res){
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
  res.render("register");

});

app.post("/register", function(req, res){
  let registerFirstName_    =       req.body.registerFirstName;
  let registerLastName_     =       req.body.registerLastName;
  let registerEmailAddress_ =       req.body.registerEmailAddress;
  let registerPhone_ = req.body.registerPhone;
  let registerUsername_     =       req.body.registerUsername;
  let registerPassword_     =       req.body.registerPassword;
  let registerAddress1_     =       req.body.registerAddress1;
  let registerAddress2_     =       req.body.registerAddress2;
  let registerInputCity_    =       req.body.registerInputCity;
  let registerInputState_   =       req.body.registerInputState;
  let registerInputZip_     =       req.body.registerInputZip;
  console.log(registerFirstName_);
  console.log(registerLastName_);
  console.log(registerEmailAddress_);
  console.log(registerPhone_);
  console.log(registerUsername_);
  console.log(registerPassword_);
  console.log(registerAddress1_);
  console.log(registerAddress2_);
  console.log(registerInputCity_);
  console.log(registerInputState_);
  console.log(registerInputZip_);

  const body={
    username : registerUsername_,
    firstname: registerFirstName_,
    lastname: registerLastName_,
    phone: registerPhone_,
    email: registerEmailAddress_,
    password: registerPassword_,
    address: {
        address: registerAddress1_,
        address2: registerAddress2_,
        city: registerInputCity_,
        zipCode: registerInputZip_,
        country: "USA",
        state: registerInputZip_
    }
  }

  const userNameVerify= {
    username : registerUsername_
  }

  axios.post( `${localhost}/Account/VerifyExist`,
  userNameVerify
  )
  .then(function (response) {
    console.log('User Name Verification Success');

    axios.post( `${localhost}/Account/CreateAccount`,
    body
    )
    .then(function (response) {
      console.log('createAccount Success');
<<<<<<< HEAD

      let message = "Account has been successfully Created!"
      res.locals.message = message;
  
=======
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
      res.redirect('/signin')
    })
    .catch(function (error) {
      console.log('Create Account Error');
<<<<<<< HEAD
      let message = "Account has existed, please change the username and try again!"
      res.locals.message = message;

      res.render('register')
=======
      res.redirect('/register')
>>>>>>> 9c99258f2660e3126fc3bd805ad854a6bb2a5b6c
    });

    
  })
  .catch(function (error) {
    console.log(error);
    
  });
 

});

app.get("/customerservice", function(req, res){
  res.render("customerservice");
});

app.post("/customerservice", function(req, res){
  let custServEmail_       = req.body.custServEmail;
  let custServOrderNumber_ = req.body.custServOrderNumber;
  let custServText_        = req.body.custServText;
});


app.get("/signedonalready", function(req, res){
  res.render("signedonalready");
});

app.post("/signedonhome", function(req, res){
});


app.listen(3030, function() {
  console.log("Server started on port 3030");
});
