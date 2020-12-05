const axios = require('axios');
const { localhost } = require('./config');


exports.getDate = function(){
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    return today.toLocaleDateString("en-US", options);
};

exports.getDay = function() {
  const today = new Date();
  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
};


exports.getbookInfo = async function(BookListURL){ 
   const request = await axios.get(BookListURL);

  return request.data;
}


exports.getUserFirstName = function(userInfoURL){

    return ( axios.post(userInfoURL)
  .then(function (response) {
    // handle success
    console.log('status: ',response.status);
 
     let userFname = response.data.firstname;

     console.log('User First Name is: ', userFname);
     return userFname;
  })
  .catch(function (error) {
    // handle error
    console.log('error happened');
    console.log(error);
  })
  )

}


exports.addToCartClick = function(){
  var i = 0;
  addToCartButtonNumber = ++i
  return addToCartButtonNumber;
};
