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

exports.getbookInfo = function(){
 
  let bookList =[];

  axios.get(`${localhost}/Book/Books`)
  .then(function (response) {
    // handle success
    console.log('status: ',response.status);
 
     bookList = [
        {
          "title": "Islamic book of ABAIC 1",
          "price": "$35",
          "Author": "Bakr Alsideeq",
          "description": "The best Islamic book since slice bread"
        },
        {
          "title": "Islamic book of ABAIC 2",
          "price": "$76",
          "Author": "Alsideeq Bakr",
          "description": "The best Islamic book since the last best Islamic book"
        },
        {
          "title": "Islamic book of ABAIC 3",
          "price": "$100",
          "Author": "The Islamic center itself",
          "description": ""
        }
      ];

     console.log(bookList);

     return bookList;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  console.log('booklist is: ', bookList);


}

exports.getUserFirstName = function(){
    const myFirstName = "AhmedShangAbi";

    return myFirstName;
}
