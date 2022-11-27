const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Mongoose connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("Successull");
  })
  .catch((e) => {
    console.log("not connected");
  });

//Normal Schema
// const fruitSchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   review: String,
// });

//Schema with Validation mongoose
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name field can't be empty"],
  },
  rating: {
    type: Number,
    max: [5, `Value can't be more than 5`],
  },
  review: String,
});

//Model out of schema
const Fruit = mongoose.model("Fruit", fruitSchema);


//Creating document out of model
const Lichi = new Fruit({
  name: "Lichi White",
  rating: 3.5,
  review: "Toward health concern",
});

//Creating document out of model
const Lichi2 = new Fruit({
  name: "Lichi White2",
  rating: 5,
  review: "Toward health concern",
});


//Insert many function
// Fruit.insertMany([Lichi], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Saved");
//   }
// });

// const kiwi = new Fruit({
//   name: "Kiwi blue",
//   rating: 2.5,
//   review: "usa fruit",
// });
// const orange = new Fruit({
//   name: "Oragne yello",
//   rating: 5.5,
//   review: "Citric acid",
// });

// const banana = new Fruit({
//   name: "Banana",
//   rating: 4.5,
//   review: "Heavy diet",
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully Saved");
//   }
// })



//Reading document from the database/
// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log("Error Occured");
//   } else {
//     fruits.forEach((el) => console.log(el.name));
//   }
// });


//Updating the document from database

// Fruit.updateOne({_id:"63830ae61acdbcb637ca5948"},{rating:3.5},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfuly update");
//   }

// })


//Delete the document from database
// Fruit.deleteOne({_id:"63830ae61acdbcb637ca5948"},function(err){
//   if(err){
//         console.log(err);
//       }
//       else{
//         console.log("Successfuly deleted");
//       }
// });

//Creating Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name field can't be empty"],
  },
  age: Number,
  favoriteFruit:fruitSchema
});

//Creating model from person Schema
const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 37,
// });

//person.save();


//Reading document from the database/
// Person.find(function (err, people) {
//   if (err) {
//     console.log("Error Occured");
//   } else {
//     people.forEach((el) => console.log(el.name));
//   }
// });


//Relationship between frutits and people
// const pineapple = new Fruit({
//   name: "PineApple",
//   rating: 4.8,
//   review: "Sweet and tasty",
// });

// pineapple.save()

// const person = new Person({
//   name: "Amy",
//   age: 35,
//   favoriteFruit:pineapple
// });

// person.save();

////Relationship between frutits and 2 people
const mango = new Fruit({
  name: "Mango",
  rating: 3.8,
  review: "Sweet and tasty",
});

mango.save()

Person.updateOne({_id:"63830961210951ae1f2ca0f5"},{favoriteFruit:mango},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfuly update");
  }

})


//Sending Get request to the server
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});

//creating a sever that is listen to the port 3000
const port = 8000;
app.listen(port, () => {
  console.log(`App running on the port ${port}...`);
});
