var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var headphonesSchema = new mongoose.Schema({
  ModelName: String,
  Description: String,
  Brief: String,
  Image: String,
  HeadphoneType: String,
  Mic: Boolean,
  ConnectorType: String,
  Connectivity: String,
  BatteryCapacity: String,
  Price: String,
});
module.exports = mongoose.model("Headphones", headphonesSchema);
