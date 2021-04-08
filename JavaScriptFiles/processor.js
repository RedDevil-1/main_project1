var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var processorSchema = new mongoose.Schema({
  ModelName: String,
  LaunchedDate: String,
  Price: String,
  ClockFrequency: String,
  TurboFrequency: String,
  PhysicalCores: String,
  Threads: String,
  Power: String,
  BitWidth: String,
  MaxMemory: String,
  Image: String,
  Description: String,
  Brief: String,
});
module.exports = mongoose.model("Processor", processorSchema);
