var express= require('express');
var app= express();
var path = require('path');
var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var fs= require('fs');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.static(path.join(__dirname, "cssFiles")));
app.use(express.static(path.join(__dirname, "JavaScriptFiles")));
app.use(express.static(path.join(__dirname, "images")));


app.get("/",function(req,res){
    res.render("index");
   
});
app.get("/index",function(req,res){
    res.render('index');
});
app.get("/home", function(req,res){
    res.render('home')
});
app.get("/about", function(req,res){
    res.render('about')
});
app.get("/contact", function(req,res){
    res.render('contact')
});
app.listen(8080);