var express         = require('express'),
    app             = express(),
    path            = require('path'),
    mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    fs              = require('fs'),
    news            = require('./JavaScriptFiles/news.js'),
    bodyParser      = require("body-parser");


app.set('views', './views');
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/news_update");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
app.use(express.static(path.join(__dirname, "news")));
app.use(express.static(path.join(__dirname, "cssFiles")));
app.use(express.static(path.join(__dirname, "JavaScriptFiles")));
app.use(express.static(path.join(__dirname, "images")));


var newsSchema=new mongoose.Schema({
    header: String,
    description: String, 
    brief: String,
    image: String

});

var News=mongoose.model("News",newsSchema);

// News.create(
//     { header: "afksajsfja  aj ajidjj  ", image:"https://i.gadgets360cdn.com/large/Samsung_m62_1616415136411.jpg?downsize=950:*&output-quality=80&output-format=webp", brief:"sakjdsahd sdks jis jdisjdia", description:"sakjdsahasdhsaud usah das9duhasdhaius dhamsiuhd uiahddiuas hmduisahui haifhasu ias hiuah "
//     },function(err,news)
//     {   if(err)
//         {
//         console.log(err);   
//         }
//         else
//         {
//             console.log("newly created news");
//             console.log(news);
//         }
//     });



app.get("/",function(req,res){
    res.render("index");
   
});
app.get("/index",function(req,res){
    res.render('index');
});
app.get("/home", function(req,res){
    News.find({},function(err,allNews){
        if(err){
            console.log(err);
        }
        else{
            res.render('home',{news:allNews});
        }
    })
    
});
app.get("/about", function(req,res){
    res.render('about')
});
app.get("/contact", function(req,res){
    res.render('contact')
});
app.get("/news",function(req, res){
    // removing all contents of db 
    // get data from the news database
    News.find({},function(err,allNews){
        if(err){
            console.log(err);
        }
        else{
            res.render('news',{news:allNews});
        }
    })
 
});
app.post('/news',function(req,res){
    var header=req.body.header;
    var brief=req.body.brief;
    var description=req.body.description;
    var image=req.body.image;
    var newNews ={header:header, brief:brief, description:description, image:image};
    // news.push(newNews);
    // adding new campground to the database
    News.create(newNews,function(err,addedNews){
        if (err){
            console.log(err);
        }
        else{
            console.log("news added successfully");
            res.redirect("/news");
        }
    })
    // res.render("/news");
});
app.get("/news/new",function(req,res){
    res.render("new_news")
});
app.get("/preBuilt",function(req,res){
    res.render('preBuilt')
});
app.get("/Gadgets",function(req,res){
    res.render('gadgets')
});
app.listen(8080);