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
    console.log("Successfull");
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

let defaultItems = [item1, item2, item3];

//2. Way of Reading document from the database with effectiveness
app.get("/", (req, res) => {
  Item.find(function (err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully Saved");
        }
      });
      res.redirect("/" + customListName);
    } else {
      res.render("list", { listTitle: "Today", newListItem: items });
    }
  });
});

//Adding new content to to-do list
app.post("/", (req, res) => {
  //Getting content from the body
  let itemName = req.body.newItem;

  //creating document from the model
  const item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect("/");
});

//delete content by checking checkbox
app.post("/delete", (req, res) => {
  //console.log(req.body.checkbox);
  let checkedItemId = req.body.checkbox;

  Item.findByIdAndDelete(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully delete the checked Item");
      res.redirect("/");
    }
  });
});

//New Schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

//Create Document
const List = mongoose.model("List", listSchema);

//Dynamic route
app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;
  //console.log(defaultItems);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();

        //redirect here it is require so that after saveing docuemnt it reflect to user as well
        res.redirect("/"+customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItem: foundList.items,
        });
      }
    }
  });
});
//Creating document base on model
//   const list =new List({
//     name:customListName,
//     items:defaultItems

//   })
//   list.save();
// })

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  worklists.push(item);
  res.redirect("/work");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server has started at ${process.env.PORT}`);
});
