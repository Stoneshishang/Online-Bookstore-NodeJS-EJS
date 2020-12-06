const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const { localhost } = require('./config');
const e = require("express");
const { resolveInclude } = require("ejs");


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


const categoryURL = `${localhost}/Category/Categories`;
const initialRenderBookList =`${localhost}/Book/Books`
let userFname = '';
let userInformation ='';
const day = modulate.getDate();

const messages = (req,res,next) =>{
  let message;
  res.locals.message = message;
  next()
}

const renderSignedOnHome = (bookDisplayURL, categoryURL, res) =>{
  modulate.getbookInfo(bookDisplayURL).then((bookList) =>{
    modulate.getbookInfo(categoryURL).then((bookCategoryList) =>{
    res.render("signedonhome", {addToCartButtonNumber:cartItemNumber, userFirstName: userFname, todayDate: day, newListItems: bookList, categoryList: bookCategoryList});
  }).catch(e=>{console.log(e);});
  }).catch(e=>{console.log(e);});
}

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
    // console.log("cartItems[i] is: ", cartItems[i]);
    pTotal += p;
  }
  return pTotal;
}

function getASpecificBook(givenID)
{
  const booklist = modulate.getbookInfo(initialRenderBookList);
  const mybook =  booklist.then((allBook) =>
     allBook.filter(element=>element.bookId==givenID)[0]
     )

  return mybook;
}

function getBookByCategory(categoryID)
{
  bookCategory = [];
  modulate.getbookInfo(initialRenderBookList).then((allBook)=>{

    // console.log("allBook in getBookByCategory is: ", allBook);
    for(var i = 0; i < allBook.length; i++){
      var thisBook = allBook[i];
      if(categoryID == thisBook.categoryId){
        theBook = thisBook
        bookCategory.push(theBook)
     }
    }
   return bookCategory;
  });

}

function getBookByAuthor(authorID)
{
  bookAuthor = [];
  modulate.getbookInfo(initialRenderBookList).then((allBook)=>{
    // console.log("allBook in getBookByAuthor is: ", allBook);
    for(var i = 0; i < allBook.length; i++){
      var thisBook = allBook[i];
      if(authorID == thisBook.authorId){
        theBook = thisBook
        bookAuthor.push(theBook)
     }
    }
   return bookAuthor;
  });

}

app.get("/", function(req, res){

    res.render("home");
});

app.get("/signin", messages, function(req, res){

  res.render("signin");
});

app.post("/signin", messages, function(req, res){

 let logOnUserName_    = req.body.userName;
 let logOnPassword_ = req.body.logOnPassword;

  const body1={
    username : logOnUserName_,
    password : logOnPassword_
  };

   axios.post( `${localhost}/Security/Login`, body1)
  .then(function (response) {
    console.log('login success');
    if(response.status == 200){
      userFname = response.data.firstname;
      userInformation = response.data;
      // console.log('signin userInformation: ', userInformation);
      res.redirect('/signedonhome')
    }
  })
  .catch(function (error) {
    console.log(error);
      message = "Username or Password is incorrect, please retry."
      res.locals.message = message;
      res.render('signin')
  });
});

app.get("/register", messages,function(req, res){
  res.render("register");
});

app.post("/register", messages, function(req, res){
  let registerFirstName_    =       req.body.registerFirstName;
  let registerLastName_     =       req.body.registerLastName;
  let registerEmailAddress_ =       req.body.registerEmailAddress;
  let registerPhone_        =       req.body.registerPhone;
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
      message = "Account has been successfully Created!"
      res.locals.message = message;

      res.redirect('signin')
    })
    .catch(function (error) {
      console.log('Create Account Error');
      console.log(error);
      message = "Account has existed, please change the username and try again!"
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
});

app.get("/signedonhome", messages, function(req, res){
    //access then value inside of the axios.get.then() from modular.js
    renderSignedOnHome(initialRenderBookList, categoryURL, res);

});

app.post("/signedonhome", messages, function(req, res){

  let Category = req.body.category;
  let Author =  req.body.author;
  bookID = req.body.userAddToCartButton;

  //when user only filtering, the cartItems array won't be increased。
  if(Category == undefined || Author == undefined){
    getASpecificBook(bookID).then((response)=>{

      const myBook = response;
      cartItems.push(myBook);
      funcClick();
    })
  }

  //when user add books to cart, the selection page would still render.
  if(Category !== undefined || Author !== undefined){
    const filterURL = `${initialRenderBookList}?Category=${Category}&Author=${Author}`;
    renderSignedOnHome(filterURL,categoryURL, res);
  }

  renderSignedOnHome(initialRenderBookList, categoryURL, res);


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

app.get("/myaccount", messages,function(req, res){

  res.render("myaccount", {user: userInformation});
});

app.post("/myaccount", messages, function(req, res){

const updateAccountURL = `${localhost}/Account/UpdateAccount`
const content = userInformation  
  console.log('/myaccount req.body is: ', content);
axios.put(
  updateAccountURL,
  'PUT',
  content,
).then((response) =>{
  resolve(response.data.content)
  console.log("myaccount axiso PUT is: ", response.data);
}).catch(e=>console.log(e));

message = "Customer Information change failed, please try again."
res.locals.message = message;

    res.redirect("/myaccount");
});


app.listen(process.env.PORT || 3030, function() {
  console.log("Server started on port 3030");

});
