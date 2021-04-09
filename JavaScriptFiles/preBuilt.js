var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var preBuiltSchema = new mongoose.Schema({
  ModelName: String,
  Description: String,
  Brief: String,
  Image: String,
  Memory: String,
  MotherBoard: String,
  Connectivity: String,
  Processor: String,
  PSU: String,
  Cabinet: String,
  HardDisk: String,
  GraphicCard: String,
  Price: String,
});
module.exports = mongoose.model("PreBuilt", preBuiltSchema);
