var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var newsSchema = new mongoose.Schema({
  header: String,
  description: String,
  brief: String,
  image: String,
});
module.exports = mongoose.model("News", newsSchema);
