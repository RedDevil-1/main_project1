var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var earphonesSchema = new mongoose.Schema({
  ModelName: String,
  Description: String,
  Brief: String,
  Image: String,
  Mic: Boolean,
  ConnectorType: String,
  Connectivity: String,
  BatteryCapacity: String,
  Price: String,
});
module.exports = mongoose.model("Earphones", earphonesSchema);
