const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const axios = require('axios');
const { localhost } = require('./config');
const { response } = require("express");
const date = require(__dirname + "/date.js");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//create app using express
const app = express();

//set view engine using ejs
app.set('view engine', 'ejs');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
const modulate = require(__dirname + "/modular.js");
//let express know that static files are held in the public folder
app.use(express.static("public"));

const messages = (req,res,next) =>{
  let message;
  res.locals.message = message;
  next()
}



app.get("/", function(req, res){

    res.render("home");
});

app.get("/signin", messages, function(req, res){

  res.render("signin");
});

app.post("/signin", function(req, res){

 let logOnUserName_    = req.body.userName;
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
      res.redirect('/signedonhome')
    }
  })
  .catch(function (error) {
    console.log('signed in Fail');
    // if(response.status !== 200 && response.status !== null){
      let message = "Username or Password is incorrect, please retry."
      res.locals.message = message;
      res.render('signin')
    // }
  });


});

app.get("/register", messages,function(req, res){
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

      let message = "Account has been successfully Created!"
      res.locals.message = message;

      res.redirect('/signin')
    })
    .catch(function (error) {
      console.log('Create Account Error');
      console.log(error);
      let message = "Account has existed, please change the username and try again!"
      res.locals.message = message;

      res.render('register')
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
  console.log(custServEmail_);
  console.log(custServOrderNumber_);
  console.log(custServText_);
});


app.get("/signedonhome", function(req, res){

  let myUserFirstName =modulate.getUserFirstName();
  const day             = modulate.getDate();
  //access then value inside of the axios.get.then() from modular.js
  modulate.getbookInfo().then((response) =>{
    res.render("signedonhome", {userFirstName: myUserFirstName, todayDate: day, newListItems: response});
  }
  );

  console.log("myUserFirstName is: ", myUserFirstName);

});


app.post("/signedonhome", function(req, res){

  const bookAuthor= req.body.searchByName;
  console.log('bookAuthor Input is: ', bookAuthor);

});



app.listen(3030, function() {
  console.log("Server started on port 3030");
});
