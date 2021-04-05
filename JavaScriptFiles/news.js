var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/news_update");
var newsSchema=new mongoose.Schema({
    header: String,
    description: String, 
    brief: String,

});

// var News=mongoose.model("news",newsSchema);

// var news1=new News({
//     header: "ajdasjhd sadhasohd",
//     description: "sdkjsakdjajdd ajpdsam psaijfmsafho fmhmaof",
//     brief: "asdjsdkjajda"
// });
// news1.save(function(err,news){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(news);
//     }
// });