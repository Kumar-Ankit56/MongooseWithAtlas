//The code is all about getting default item from the database and place in the to-dolist so that user easily look and catch

const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//To tell the express using ejs via view engin
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Conntect database with mongoose
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

//Creating New Schema for Item
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

//Creating document out of model
const item1 = new Item({
  name: "Well come to-Do list",
});

const item2 = new Item({
  name: "Buy Fruit",
});

const item3 = new Item({
  name: "Go-To-Gym",
});

//By this line of code if you will run then each time it will regenerate the same data.
//Insert many function
// Item.insertMany([item1,item2,item3], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Saved");
//   }
// });


// //Reading document from the database 
// app.get("/", (req, res) => {
//   Item.find(function (err, items) {
//     if (err) {
//       console.log("Error Occured");
//     } else {
//       res.render("list", { listTitle: "Today", newListItem: items});
//     }
//   });
// });

//2. Way of Reading document from the database with effectiveness
app.get("/", (req, res) => {
  Item.find(function (err, items) {
    if(items.length===0){
      Item.insertMany([item1,item2,item3], function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully Saved");
        }
      });
      res.redirect("/");
    }
    else {
      res.render("list", { listTitle: "Today", newListItem: items});
    }
  });
});

app.post("/", (req, res) => {
  item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "WorkList") {
    worklists.push(item);
    res.redirect("/work");
  }
  items.push(item);
  console.log(item);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "WorkList", newListItem: worklists });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  worklists.push(item);
  res.redirect("/work");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server has started at ${process.env.PORT}`);
});
