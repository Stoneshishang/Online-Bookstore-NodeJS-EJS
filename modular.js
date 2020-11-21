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
  const bookList = [
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
  ]
 return bookList;
}

exports.getUserFirstName = function(){
    const myFirstName = "AhmedShangAbi";

    return myFirstName;
}
