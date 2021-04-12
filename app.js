var express = require("express"),
  app = express(),
  path = require("path"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  fs = require("fs"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  News = require("./JavaScriptFiles/news.js"),
  User = require("./JavaScriptFiles/admin.js"),
  Mobiles = require("./JavaScriptFiles/mobile.js"),
  Processors = require("./JavaScriptFiles/processor.js"),
  GraphicCards = require("./JavaScriptFiles/graphicCard.js"),
  Laptops = require("./JavaScriptFiles/laptop.js"),
  Headphones = require("./JavaScriptFiles/headphone.js"),
  Earphones = require("./JavaScriptFiles/earphone.js"),
  PreBuilt = require("./JavaScriptFiles/preBuilt.js"),
  Gadget = require("./JavaScriptFiles/gadget.js"),
  bodyParser = require("body-parser");

//setting up engines
app.set("views", "./views");
app.set("view engine", "ejs");

// connecting to MongoDB
mongoose.connect("mongodb://localhost/news_update");

//including various files
app.use(
  require("express-session")({
    secret: "just a try",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    User.authenticate()
  )
);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "news")));
app.use(express.static(path.join(__dirname, "cssFiles")));
app.use(express.static(path.join(__dirname, "JavaScriptFiles")));
app.use(express.static(path.join(__dirname, "images")));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//first display page

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/index", function (req, res) {
  res.render("index");
});

//home page

app.get("/home", function (req, res) {
  News.find({}, function (err, allNews) {
    if (err) {
      console.log(err);
    } else {
      // Gadgets.find({}, function (err, allGadgets) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      res.render("home", { news: allNews });
      //   } gadgets: allGadgets
      // });
    }
  });
});

//about page

app.get("/about", function (req, res) {
  res.render("about");
});

//contact page

app.get("/contact", function (req, res) {
  res.render("contact");
});

// news section

//main news page
app.get("/news", function (req, res) {
  News.find({}, function (err, allNews) {
    if (err) {
      console.log(err);
    } else {
      res.render("news", { news: allNews });
    }
  });
});

//post request
app.post("/news", function (req, res) {
  News.create(req.body.news, function (err, addedNews) {
    if (err) {
      console.log(err);
    } else {
      console.log("news added successfully");
      res.redirect("/news");
    }
  });
});

//new news page
app.get("/news/new", function (req, res) {
  res.render("new_news");
});

//redirecting to a specific news page
app.get("/news/:id", function (req, res) {
  News.findById(req.params.id, function (err, foundNews) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleNews", { news: foundNews });
    }
  });
});

//gadgets page

app.get("/Gadgets", function (req, res) {
  res.render("gadgets");
});

//processor section

//main processor page
app.get("/gadgets/processors", function (req, res) {
  Processors.find({}, function (err, allProcessors) {
    if (err) {
      console.log(err);
    } else {
      res.render("processors", { processors: allProcessors });
    }
  });
});

//post request
app.post("/gadgets/processors", function (req, res) {
  Processors.create(req.body.processor, function (err, addProcessor) {
    if (err) {
      console.log(err);
    } else {
      console.log("Processor added successfully");
      console.log(addProcessor);
      res.redirect("processors");
    }
  });
});

//new processor page
app.get("/gadgets/processors/new", function (req, res) {
  res.render("new_processor");
});

//redirecting to a specific processor page
app.get("/gadgets/processors/:id", function (req, res) {
  Processors.findById(req.params.id, function (err, foundProcessor) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleProcessor", { processor: foundProcessor });
    }
  });
});

//Graphic card section

//main render page
app.get("/gadgets/graphicCard", function (req, res) {
  GraphicCards.find({}, function (err, allGraphic) {
    if (err) {
      console.log(err);
    } else {
      res.render("graphicCard", { graphicCards: allGraphic });
    }
  });
});

//post request
app.post("/gadgets/graphicCard", function (req, res) {
  GraphicCards.create(req.body.graphic, function (err, addGraphic) {
    if (err) {
      console.log(err);
    } else {
      console.log("graphic card added successfully");
      console.log(addGraphic);
      res.redirect("graphicCard");
    }
  });
});

//adding new object
app.get("/gadgets/graphicCard/new", function (req, res) {
  res.render("new_graphicCard");
});

//redirecting to a specific graphic page
app.get("/gadgets/graphicCard/:id", function (req, res) {
  GraphicCards.findById(req.params.id, function (err, foundCard) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleGraphicCard", { card: foundCard });
    }
  });
});

//Laptop section

//main page
app.get("/gadgets/laptops", function (req, res) {
  Laptops.find({}, function (err, allLaptops) {
    if (err) {
      console.log(err);
    } else {
      res.render("Laptops", { Laptops: allLaptops });
    }
  });
});

//post request
app.post("/gadgets/laptops", function (req, res) {
  Laptops.create(req.body.laptop, function (err, addLaptop) {
    if (err) {
      console.log(err);
    } else {
      console.log("Laptop added successfully");
      console.log(addLaptop);
      // Gadget.laptops.push(addLaptop);
      // Gadget.save(done);
      res.redirect("Laptops");
    }
  });
});

//new laptop
app.get("/gadgets/laptops/new", function (req, res) {
  res.render("new_laptop");
});

//redirecting to a specific laptop page
app.get("/gadgets/laptops/:id", function (req, res) {
  Laptops.findById(req.params.id, function (err, foundLaptop) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleLaptop", { laptop: foundLaptop });
    }
  });
});

// Mobile section

//main render page
app.get("/gadgets/mobiles", function (req, res) {
  Mobiles.find({}, function (err, allMobiles) {
    if (err) {
      console.log(err);
    } else {
      res.render("mobiles", { mobiles: allMobiles });
    }
  });
});

//post request
app.post("/gadgets/mobiles", function (req, res) {
  Mobiles.create(req.body.mobile, function (err, addMobile) {
    if (err) {
      console.log(err);
    } else {
      console.log("mobile added successfully");
      console.log(addMobile);
      // Gadget.mobiles.push(addMobile);
      // Gadget.save();
      res.redirect("mobiles");
    }
  });
});

//adding new object
app.get("/gadgets/mobiles/new", function (req, res) {
  res.render("new_mobile");
});

//redirecting to a specific mobile page
app.get("/gadgets/mobiles/:id", function (req, res) {
  Mobiles.findById(req.params.id, function (err, foundMobile) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleMobile", { mobile: foundMobile });
    }
  });
});

// Headphones section

//main render page
app.get("/gadgets/headphones", function (req, res) {
  Headphones.find({}, function (err, allHeadphones) {
    if (err) {
      console.log(err);
    } else {
      res.render("headphones", { headphones: allHeadphones });
    }
  });
});

//post request
app.post("/gadgets/headphones", function (req, res) {
  Headphones.create(req.body.headp, function (err, addHeadphone) {
    if (err) {
      console.log(err);
    } else {
      console.log("headphone added successfully");
      console.log(addHeadphone);
      res.redirect("headphones");
    }
  });
});

//adding new object
app.get("/gadgets/headphones/new", function (req, res) {
  res.render("new_headphone");
});

//redirecting to a specific mobile page
app.get("/gadgets/headphones/:id", function (req, res) {
  Headphones.findById(req.params.id, function (err, foundHeadphone) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleHeadphone", { headphone: foundHeadphone });
    }
  });
});

//earphones section

//main render page
app.get("/gadgets/earphones", function (req, res) {
  Earphones.find({}, function (err, allEarphones) {
    if (err) {
      console.log(err);
    } else {
      res.render("earphones", { earphones: allEarphones });
    }
  });
});

//post request
app.post("/gadgets/earphones", function (req, res) {
  Earphones.create(req.body.ear, function (err, addEarphone) {
    if (err) {
      console.log(err);
    } else {
      console.log("Earphone added successfully");
      console.log(addEarphone);
      res.redirect("earphones");
    }
  });
});

//adding new object
app.get("/gadgets/earphones/new", function (req, res) {
  res.render("new_earphone");
});

//redirecting to a specific mobile page
app.get("/gadgets/earphones/:id", function (req, res) {
  Earphones.findById(req.params.id, function (err, foundEarphone) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleEarphone", { earphone: foundEarphone });
    }
  });
});
//pre-built sections
app.get("/preBuilt", function (req, res) {
  PreBuilt.find({}, function (err, allpreBuilt) {
    if (err) {
      console.log(err);
    } else {
      res.render("preBuilt", { preBuilts: allpreBuilt });
    }
  });
});

//post sections

app.post("/preBuilt", function (req, res) {
  PreBuilt.create(req.body.build, function (err, allBuilt) {
    if (err) {
      console.log(err);
    } else {
      console.log("Built added successfully");
      console.log(allBuilt);
      res.redirect("preBuilt");
    }
  });
});

//new addings
app.get("/preBuilt/new", function (req, res) {
  res.render("new_Built");
});

//redirecting to a specific mobile page
app.get("/preBuilt/:id", function (req, res) {
  PreBuilt.findById(req.params.id, function (err, foundpreBuilt) {
    if (err) {
      console.log(err);
    } else {
      res.render("singlePreBuilt", { preBuilt: foundpreBuilt });
    }
  });
});

//admin panel
app.get("/admin/signup", function (req, res) {
  res.render("admin_signup");
});

//admin signup handle
app.post("/admin/signup", function (req, res) {
  User.register(
    new User({ username: req.body.email }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("admin_signup");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  );
});

//show login form
app.get("/admin/login", function (req, res) {
  res.render("admin_login");
});

//Handling login logic
app.post(
  "/admin/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/admin/login",
    // successFlash: "Welcome!",
  }),
  function (req, res) {
    // res.send("welcome to login");
  }
);

//Authentication
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }
}
//server details
app.listen(8080);
