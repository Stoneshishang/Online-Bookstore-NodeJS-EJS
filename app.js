const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Alsideeq bookstore is an online platform to sell available books provided by Abu Baker Alsideeq Isalmic Center (ABAIC) in Hamtramck, Michigan. ABAIC has a variety and large amounts of books in different Islamic topics and Arabic grammar in their bookstore."

//create app using express
const app = express();
//set view engine using ejs
app.set('view engine', 'ejs');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//let express know that static files are held in the public folder
app.use(express.static("public"));

let postsSignin = [];

app.get("/", function(req, res){
  res.render("home");
});

app.get("/signin", function(req, res){
  res.render("signin");
});

app.post("/signin", function(req, res){
  const postSignin = {
    title: req.body.postSigninUsername,
    content: req.body.postSigninPassword
  };
  postsSignin.push(postSignin);    //add an if statement to check that username and password is valid here

  //res.redirect("/welcome")   will create a signed-on page for redirect to the page once that is created
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/customerservice", function(req, res){
  res.render("customerservice");
});













app.listen(3030, function() {
  console.log("Server started on port 3030");
});
