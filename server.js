const express = require("express");
require("dotenv").config();
const errorhandler = require("./middleware/errorhandler");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

// var bodyParser = require('body-parser');

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(errorhandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => console.log("We are connected to DB"))
  .catch(() => console.log("ERROR!"));

//This is Schema - STEP-1
// const carsSchema = new mongoose.Schema({
//     name: String,
//     brand: String,
//     price: Number,
//     isElectric: Boolean,
//   });

//   // Create the model - STEP-2
//   const Car = mongoose.model("Car", carsSchema);

//   // Add data STEP-3
//   // Insertion - Create
//   Car.insertMany([
//     { name: "E4", brand: "BMW", price: 60000, isElectric: true },
//     { name: "Seltos", brand: "Kia", price: 40000, isElectric: false },
//     { name: "GEN-7", brand: "Suzuki", price: 70000, isElectric: true },
//     { name: "Thar", brand: "Mahindra", price: 89000, isElectric: false },
//   ])
//     .then((data) => console.log("Operation was successful", data))
//     .catch((err) => console.log(err));

app.use("/contact", require("./Routes/Routes"));
app.use("/users", require("./Routes/userRoutes"));

app.listen(3000, () => {
  console.log(`listening or live at ${port}`);
});
