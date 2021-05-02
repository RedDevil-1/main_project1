var mongoose = require("mongoose");
var random = require("mongoose-simple-random");

mongoose.connect("mongodb://localhost/news_update");
const gadgetSchema = new mongoose.Schema({
  // common for all
  ModelName: String,
  LaunchedDate: String,
  Description: String,
  Brief: String,
  Image: String,
  ItemType: String,
  Price: String,

  // mobile and laptop
  CPU: String,
  GPU: String,
  RAM: String,
  Display: String,
  Memory: String, //for graphic card as well
  Camera: String,

  //processors
  PhysicalCores: String,
  Threads: String,
  Power: String,
  BitWidth: String,
  MaxMemory: String,
  ClockFrequency: String,
  TurboFrequency: String,

  //graphic card
  GPUChip: String,
  Bus: String,
  GPUClock: String,
  MemoryClock: String,
  Shaders: String,

  //earphone and headphone
  Mic: Boolean,
  ConnectorType: String,
  Connectivity: String,
  BatteryCapacity: String,

  //headphone
  HeadphoneType: String,
});
gadgetSchema.plugin(random);
module.exports = mongoose.model("Gadget", gadgetSchema);
