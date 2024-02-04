const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  city: String,
  restaurant_id: String,
  address: {
      building: String,
      street: String,
      zipcode: String
  }
});
const Restaurant = mongoose.model('restaurants', restaurantSchema);

module.exports = Restaurant;