var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  Name: String,
  Phone: Number,
});

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin", adminSchema);
