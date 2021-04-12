var mongoose = require("mongoose"),
  Mobiles = require("./mobile"),
  Processors = require("./processor"),
  GraphicCards = require("./graphicCard"),
  Laptops = require("./laptop"),
  Headphones = require("./headphone"),
  Earphones = require("./earphone");
mongoose.connect("mongodb://localhost/news_update");
const gadgetSchema = new mongoose.Schema({
  mobiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mobile",
    },
  ],
});
module.exports = mongoose.model("Gadget", gadgetSchema);
