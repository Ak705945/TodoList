const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);



app.get("/", function(req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options)
  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        Day: day,
        newListItem: foundItems
      });
    }
  })

});
app.post("/", function(req, res) {
  const item1 = new Item({
    name: req.body.item
  });
  Item.insertMany([item1], function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("No error");
    }
  });
  res.redirect("/");
  console.log();
});

app.listen(3000, function() {
  console.log("Sever Started");
});

app.post("/delete", function(req, res) {

  console.log("delete");
  Item.findByIdAndRemove(req.body.checkbox, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed");
      res.redirect("/")
    }
  });

});
