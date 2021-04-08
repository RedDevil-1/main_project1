var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var mobileSchema = new mongoose.Schema({
  ModelName: String,
  LaunchedDate: String,
  Price: String,
  CPU: String,
  GPU: String,
  RAM: String,
  Display: String,
  Memory: String,
  Camera: String,
  Description: String,
  Brief: String,
  Image: String,
});
module.exports = mongoose.model("Mobile", mobileSchema);
