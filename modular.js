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
        bookId: 'e2824ee6-030b-402d-b52d-587fa0cb5217',
        title: 'Tafseer Ibn Katheer5113',
        price: '75',
        description: 'Book under aqeedah and creed',
        photoPath: '/images/bookImage.jpg',
        stock: 15,
        author: {
          authorId: '0afea8b4-dd5e-4e94-b00a-f3c130ea0d0b',
          firstname: 'mohammed',
          lastname: 'abdulwahab'
        },
        category: {
          categoryId: '98f4e322-8d05-4d05-b60b-2942ff6cb292',
          title: 'Quranic Studies',
          description: 'The Tafsir And Commentary of Quran Books'
        }
      },
      {
        bookId: 'ea644f03-6ea4-4c91-8d02-e8b8dfc2c8a8',
        title: 'Tafseer Ibn Katheer9829',
        price: '56',
        description: 'Book under aqeedah and creed',
        photoPath: '/images/bookImage.jpg',
        stock: 61,
        author: {
          authorId: '0afea8b4-dd5e-4e94-b00a-f3c130ea0d0b',
          firstname: 'mohammed',
          lastname: 'abdulwahab'
        },
        category: {
          categoryId: '98f4e322-8d05-4d05-b60b-2942ff6cb292',
          title: 'Quranic Studies',
          description: 'The Tafsir And Commentary of Quran Books'
        }
      },
      {
        bookId: 'ea644f03-6ea4-4c91-8d02-e8b8dfc2c8a8',
        title: 'Tafseer Ibn Katheer9829',
        price: '56',
        description: 'Book under aqeedah and creed',
        photoPath: '/images/bookImage.jpg',
        stock: 61,
        author: {
          authorId: '0afea8b4-dd5e-4e94-b00a-f3c130ea0d0b',
          firstname: 'mohammed',
          lastname: 'abdulwahab'
        },
        category: {
          categoryId: '98f4e322-8d05-4d05-b60b-2942ff6cb292',
          title: 'Quranic Studies',
          description: 'The Tafsir And Commentary of Quran Books'
        }
      }
    ]
 return bookList;
};

exports.getUserFirstName = function(){
    const myFirstName = "AhmedShangAbi";

    return myFirstName;
};

exports.addToCartClick = function(){
  var i = 0;
  addToCartButtonNumber = ++i
  return addToCartButtonNumber;
};
