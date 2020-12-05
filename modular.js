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


exports.addToCartClick = function(){
  var i = 0;
  addToCartButtonNumber = ++i
  return addToCartButtonNumber;
};
