const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const axios = require('axios');
const { localhost } = require('./config');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//create app using express
const app = express();
let accountCreatedMessage = "";
//set view engine using ejs
app.set('view engine', 'ejs');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//let express know that static files are held in the public folder
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/signin", function(req, res){

  res.render("signin",{createAccountSuccess: accountCreatedMessage});
});

app.post("/signin", function(req, res){
  //username is in Postman POST request Login. it randomly generated in the Postman pre-request Script
  //password is aaldhahe
 let logOnUserName_    = req.body.userName;
 let logOnPassword_ = req.body.logOnPassword;
 const body={ 
  username : logOnUserName_,
  password : logOnPassword_
};
  axios.post( `${localhost}/Security/Login`,
  body
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

});

app.get("/register", function(req, res){
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

  axios.post( `${localhost}/Account/CreateAccount`,
  body
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  accountCreatedMessage="Account has been created successfully, please sign in!"
  
  res.redirect('/signin')

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
