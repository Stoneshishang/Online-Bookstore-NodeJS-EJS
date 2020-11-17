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

module.exports.getbookItemList = function(title, author, price){
  var instances = 0;
  this.title = title;
  this.author = author;
  this.price = price;
  instances++;
  this.counting = instances;
  return instances;
}
