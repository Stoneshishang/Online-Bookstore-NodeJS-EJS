const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


//create app using express
const app = express();
//set view engine using ejs
app.set('view engine', 'ejs');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
const modulate = require(__dirname + "/modular.js");
//let express know that static files are held in the public folder
app.use(express.static("public"));



let cartItems      = [];
let cartItemNumber = cartItems.length;
function funcClick(){
  cartItemNumber++
  return  cartItemNumber;
}


function removecartItemsClick(arr, attr, value){
  var i = arr.length;
  while(i--){
     if( arr[i]
         && arr[i].hasOwnProperty(attr)
         && (arguments.length > 2 && arr[i][attr] === value ) ){
         arr.splice(i,1);
     }
  }
  return arr;
}

function priceTotal(){
  var pTotal = 0;
  for(var i in cartItems){
    p = parseInt(cartItems[i].price);
    pTotal += p;
  }
  return pTotal;
}

function getASpecificBook(givenID)
{
  const allBook = modulate.getbookInfo();
  for(var i = 0; i < allBook.length; i++){
    var thisBook = allBook[i];
    if(givenID == thisBook.bookId){
      theBook = thisBook
   }
  }
 return theBook;
}

function getBookByCategory(categoryID)
{
  bookCategory = [];
  const allBook = modulate.getbookInfo();
  for(var i = 0; i < allBook.length; i++){
    var thisBook = allBook[i];
    if(categoryID == thisBook.categoryId){
      theBook = thisBook
      bookCategory.push(theBook)
   }
  }
 return bookCategory;
}

function getBookByAuthor(authorID)
{
  bookAuthor = [];
  const allBook = modulate.getbookInfo();
  for(var i = 0; i < allBook.length; i++){
    var thisBook = allBook[i];
    if(authorID == thisBook.authorId){
      theBook = thisBook
      bookAuthor.push(theBook)
   }
  }
 return bookAuthor;
}

app.get("/", function(req, res){
  res.render("home");
});

app.get("/signin", function(req, res){
  res.render("signin");
});

app.post("/signin", function(req, res){
 let logOnEmail_    = req.body.logOnEmail;
 let logOnPassword_ = req.body.logOnPassword;
 console.log(logOnEmail_);
 console.log(logOnPassword_);
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  let registerFirstName_    =       req.body.registerFirstName;
  let registerLastName_     =       req.body.registerLastName;
  let registerEmailAddress_ =       req.body.registerEmailAddress;
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
  console.log(registerUsername_);
  console.log(registerPassword_);
  console.log(registerAddress1_);
  console.log(registerAddress2_);
  console.log(registerInputCity_);
  console.log(registerInputState_);
  console.log(registerInputZip_);
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
  const myUserFirstName = modulate.getUserFirstName();
  const day             = modulate.getDate();
  const Books           = modulate.getbookInfo();
  res.render("signedonhome", {addToCartButtonNumber:cartItemNumber, userFirstName: myUserFirstName, todayDate: day, newListItems: Books});
});

app.post("/signedonhome", function(req, res){
  bookID                  = req.body.userAddToCartButton;
  const myBook            = getASpecificBook(bookID);
  cartItems.push(myBook);
  funcClick();
  res.redirect("/signedonhome");
});

app.get("/checkout", function(req, res){
  let storeTotalPrice = priceTotal();
  res.render("checkout", {itemCartNumber:cartItemNumber, cartItemList: cartItems, itemsTotalPrice: storeTotalPrice});
});


app.post("/checkout", function(req, res){
  const bookID                  = req.body.removeItembutton;
  removecartItemsClick(cartItems, 'bookId', bookID);
  cartItemNumber                = cartItems.length;
  res.redirect("/checkout");
});









app.listen(3030, function() {
  console.log("Server started on port 3030");

});
