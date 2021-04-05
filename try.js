var mongoose= require( "mongoose");
 mongoose.connect("mongodb://localhost/cat_app");
 var catSchema= new mongoose.Schema({
     name: String,
     age:   Number,
     temperament: String
 });

 var Cat=mongoose.model("Cat", catSchema);

 var George= new Cat({
     name: "rusty",
     age: 15,
     temperament:"torrmtkst"
 });
 George.save(function(err, cat){
     if(err){
         console.log("something went wrong")
     }
     else{
         console.log("We added a new cat");
         console.log(cat);
     }
 });