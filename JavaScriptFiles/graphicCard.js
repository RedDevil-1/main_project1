var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var graphicSchema = new mongoose.Schema({
  ModelName: String,
  LaunchedDate: String,
  Price: String,
  GPUChip: String,
  Bus: String,
  GPUClock: String,
  MemoryClock: String,
  Memory: String,
  Shaders: String,
  Description: String,
  Brief: String,
  Image: String,
});
module.exports = mongoose.model("Graphic", graphicSchema);
