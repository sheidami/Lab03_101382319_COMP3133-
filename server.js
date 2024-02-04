const express = require('express');
const mongoose = require("mongoose")
const restaurantRouter = require('./routes/RestaurantRoutes');

const app = express();
app.use(express.json())
const SERVER_PORT = 3000; 


const DB_CONNECTION_STRING = "mongodb+srv://admin:829682@cluster0.mznpgmx.mongodb.net/comp3133_restaurant?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log(`MongoDB connected ${success}`)
  }).catch(err => {
    console.log(`Error while MongoDB connection ${err}`)
});


app.use(restaurantRouter);


app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});