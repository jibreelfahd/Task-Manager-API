const mongoose = require('mongoose');

// @desc setting up mongoDB connection
const mongoConnect = async (url) => {
   try {
      await mongoose.connect(url);
   } catch (err) {
      console.log(err.message);
   }
}

module.exports = mongoConnect;