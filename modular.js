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

  //const data =  request.then((response)=> response.data);

  return request.data;
  //return data;
  //.catch(function (error) {
    // handle error
  // console.log(error);})
   // console.log('booklist is: ', bookList);

}


exports.getUserInformation = function(userInfoURL){

    return ( axios.post(userInfoURL)
  .then(function (response) {
    // handle success
    console.log('status: ',response.status);
 
      let userInfo = response.data;
     let userFname = response.data.firstname;
     
     console.log('userInfo is: ', userInfo);
     return userFname;
  })
  .catch(function (error) {
    // handle error
    console.log('error happened');
    console.log(error);
  })
  )

  // const myFirstName = "Shang Testing"
  //   return myFirstName;
}


exports.addToCartClick = function(){
  var i = 0;
  addToCartButtonNumber = ++i
  return addToCartButtonNumber;
};
