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
  MethodOverride = require("method-override"),
  nodemailer = require("nodemailer");
bodyParser = require("body-parser");

//setting up engines
app.set("views", "./views");
app.set("view engine", "ejs");

// connecting to MongoDB
mongoose.connect("mongodb://localhost/news_update", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//including various files
app.use(
  require("express-session")({
    secret: "just a try",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(MethodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

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
// app.get("/search", function (req, res) {
//   SearchQuery = req.body.search;
//   var fNews,
//     fMobile,
//     fEarphone,
//     fHeadphone,
//     fBuilt,
//     fProcessor,
//     fGraphic,
//     fLaptop;

//   News.find(
//     {
//       $text: {
//         $description: SearchQuery,
//       },
//     },
//     function (err, foundNews) {
//       if (err) {
//         console.log(err);
//       } else {
//         fNews = foundNews;
//       }
//     }
//   );
//   Processors.find(SearchQuery, function (err, foundProcessor) {
//     if (err) {
//       console.log(err);
//     } else {
//       fProcessor = foundProcessor;
//     }
//   });
//   Mobiles.find(SearchQuery, function (err, foundMobile) {
//     if (err) {
//       console.log(err);
//     } else {
//       fMobile = foundMobile;
//     }
//   });
//   PreBuilt.find(SearchQuery, function (err, foundBuilt) {
//     if (err) {
//       console.log(err);
//     } else {
//       fBuilt = foundBuilt;
//     }
//   });
//   Laptops.find(SearchQuery, function (err, foundLaptop) {
//     if (err) {
//       console.log(err);
//     } else {
//       fLaptop = foundLaptop;
//     }
//   });
//   Earphones.find(SearchQuery, function (err, foundEarphone) {
//     if (err) {
//       console.log(err);
//     } else {
//       fEarphone = foundEarphone;
//     }
//   });
//   Headphones.find(SearchQuery, function (err, foundHeadphone) {
//     if (err) {
//       console.log(err);
//     } else {
//       fHeadphone = foundHeadphone;
//     }
//   });
//   GraphicCards.find(SearchQuery, function (err, foundGraphic) {
//     if (err) {
//       console.log(err);
//     } else {
//       fGraphic = foundGraphic;
//     }
//   });

//   res.render("search", {
//     fMobile: fMobile,
//     fProcessor: fProcessor,
//     fBuilt: fBuilt,
//     fLaptop: fLaptop,
//     fNews: fNews,
//     fHeadphone: fHeadphone,
//     fEarphone: fEarphone,
//     fGraphic: fGraphic,
//   });
// });

app.get("/home", function (req, res) {
  News.find({}, function (err, allNews) {
    if (err) {
      console.log(err);
    } else {
      PreBuilt.find({}, function (err, allBuilts) {
        if (err) {
          console.log(err);
        } else {
          eval(require("error-stack-parser"));
          res.render("home", { news: allNews, builts: allBuilts });
        }
      });
    }
  });
});

//about page

app.get("/about", function (req, res) {
  res.render("about");
});

//contact page

app.get("/contact1", function (req, res) {
  res.render("contact1", { msg: "" });
});

//contact post
app.post("/contact1", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 587, false for other ports
    requireTLS: true,
    auth: {
      user: "ishan20015.s@gmail.com",
      pass: "",
    },
  });
  var display =
    "Hello this message is from " +
    req.body.name +
    ", you can revert back to " +
    req.body.email +
    " The message is: " +
    req.body.message;
  let mailOptions = {
    from: "ishan20015.s@gmail.com",
    to: "ishan2001.s@gmail.com",
    subject: "Sending Email using Node.js",
    text: display,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.render("contact1", { msg: " Message sent" });
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
app.post("/news", checkAuthentication, function (req, res) {
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
app.get("/news/new", checkAuthentication, function (req, res) {
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

//edit a news
app.get("/news/:id/edit", checkAuthentication, function (req, res) {
  News.findById(req.params.id, function (err, foundNews) {
    if (err) {
      res.redirect("/news");
    } else {
      res.render("news_edit", { news: foundNews });
    }
  });
});

//update the news
app.put("/news/:id", checkAuthentication, function (req, res) {
  News.findByIdAndUpdate(req.params.id, req.body.news, function (err, udNews) {
    if (err) {
      res.redirect("/news/" + req.params.id + "/edit");
    } else {
      res.redirect("/news/" + req.params.id);
    }
  });
});

//deleting news

app.delete("/news/:id", checkAuthentication, function (req, res) {
  News.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/news/" + req.params.id);
    } else {
      res.redirect("/news");
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
app.post("/gadgets/processors", checkAuthentication, function (req, res) {
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
app.get("/gadgets/processors/new", checkAuthentication, function (req, res) {
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

app.get(
  "/gadgets/processors/:id/edit",
  checkAuthentication,
  function (req, res) {
    Processors.findById(req.params.id, function (err, foundProcessor) {
      if (err) {
        res.redirect("/gadgets/processors");
      } else {
        res.render("processor_edit", { processor: foundProcessor });
      }
    });
  }
);

//update the processor
app.put("/gadgets/processors/:id", checkAuthentication, function (req, res) {
  Processors.findByIdAndUpdate(
    req.params.id,
    req.body.processor,
    function (err, udProcessor) {
      if (err) {
        res.redirect("/gadgets/processors/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/processors/" + req.params.id);
      }
    }
  );
});

//deleting Processor

app.delete("/gadgets/processors/:id", checkAuthentication, function (req, res) {
  Processors.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/processors/" + req.params.id);
    } else {
      res.redirect("/gadgets/processors");
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
app.post("/gadgets/graphicCard", checkAuthentication, function (req, res) {
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
app.get("/gadgets/graphicCard/new", checkAuthentication, function (req, res) {
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

app.get(
  "/gadgets/graphicCard/:id/edit",
  checkAuthentication,
  function (req, res) {
    GraphicCards.findById(req.params.id, function (err, foundGraphic) {
      if (err) {
        res.redirect("/gadgets/graphicCard");
      } else {
        res.render("graphic_edit", { graphic: foundGraphic });
      }
    });
  }
);

//update the GraphicCard
app.put("/gadgets/graphicCard/:id", checkAuthentication, function (req, res) {
  GraphicCards.findByIdAndUpdate(
    req.params.id,
    req.body.graphic,
    function (err, udGraphic) {
      if (err) {
        res.redirect("/gadgets/graphicCard/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/graphicCard/" + req.params.id);
      }
    }
  );
});

//deleting Graphic Card
app.delete(
  "/gadgets/graphicCard/:id",
  checkAuthentication,
  function (req, res) {
    GraphicCards.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.redirect("/gadgets/graphicCard/" + req.params.id);
      } else {
        res.redirect("/gadgets/graphicCard");
      }
    });
  }
);

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
app.post("/gadgets/laptops", checkAuthentication, function (req, res) {
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
app.get("/gadgets/laptops/new", checkAuthentication, function (req, res) {
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

app.get("/gadgets/laptops/:id/edit", checkAuthentication, function (req, res) {
  Laptops.findById(req.params.id, function (err, foundLaptop) {
    if (err) {
      res.redirect("/gadgets/laptops");
    } else {
      res.render("laptop_edit", { laptop: foundLaptop });
    }
  });
});

//update the laptop
app.put("/gadgets/laptops/:id", checkAuthentication, function (req, res) {
  Laptops.findByIdAndUpdate(
    req.params.id,
    req.body.laptop,
    function (err, udLaptop) {
      if (err) {
        res.redirect("/gadgets/laptops/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/laptops/" + req.params.id);
      }
    }
  );
});

//deleting laptops

app.delete("/gadgets/laptops/:id", checkAuthentication, function (req, res) {
  Laptops.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/laptops/" + req.params.id);
    } else {
      res.redirect("/gadgets/laptops");
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
app.post("/gadgets/mobiles", checkAuthentication, function (req, res) {
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
app.get("/gadgets/mobiles/new", checkAuthentication, function (req, res) {
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

app.get("/gadgets/mobiles/:id/edit", checkAuthentication, function (req, res) {
  Mobiles.findById(req.params.id, function (err, foundMobile) {
    if (err) {
      res.redirect("/gadgets/mobiles");
    } else {
      res.render("mobile_edit", { mobile: foundMobile });
    }
  });
});

//update the Mobile
app.put("/gadgets/mobiles/:id", checkAuthentication, function (req, res) {
  Mobiles.findByIdAndUpdate(
    req.params.id,
    req.body.mobile,
    function (err, udMobile) {
      if (err) {
        res.redirect("/gadgets/mobiles/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/mobiles/" + req.params.id);
      }
    }
  );
});

//deleting mobile

app.delete("/gadgets/mobiles/:id", checkAuthentication, function (req, res) {
  Mobiles.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/mobiles/" + req.params.id);
    } else {
      res.redirect("/gadgets/mobiles");
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
app.post("/gadgets/headphones", checkAuthentication, function (req, res) {
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
app.get("/gadgets/headphones/new", checkAuthentication, function (req, res) {
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

app.get(
  "/gadgets/headphones/:id/edit",
  checkAuthentication,
  function (req, res) {
    Headphones.findById(req.params.id, function (err, foundHead) {
      if (err) {
        res.redirect("/gadgets/headphones");
      } else {
        res.render("headphone_edit", { headp: foundHead });
      }
    });
  }
);

//update the Headphone
app.put("/gadgets/headphones/:id", checkAuthentication, function (req, res) {
  Headphones.findByIdAndUpdate(
    req.params.id,
    req.body.headp,
    function (err, udHead) {
      if (err) {
        res.redirect("/gadgets/headphones/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/headphones/" + req.params.id);
      }
    }
  );
});

//deleting Headphone

app.delete("/gadgets/headphones/:id", checkAuthentication, function (req, res) {
  Headphones.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/headphones/" + req.params.id);
    } else {
      res.redirect("/gadgets/headphones");
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
app.post("/gadgets/earphones", checkAuthentication, function (req, res) {
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
app.get("/gadgets/earphones/new", checkAuthentication, function (req, res) {
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

app.get(
  "/gadgets/earphones/:id/edit",
  checkAuthentication,
  function (req, res) {
    Earphones.findById(req.params.id, function (err, foundEar) {
      if (err) {
        res.redirect("/gadgets/earphones");
      } else {
        res.render("earphone_edit", { ear: foundEar });
      }
    });
  }
);

//update the earphone
app.put("/gadgets/earphones/:id", checkAuthentication, function (req, res) {
  Earphones.findByIdAndUpdate(
    req.params.id,
    req.body.ear,
    function (err, udEarphone) {
      if (err) {
        res.redirect("/gadgets/earphones/" + req.params.id + "/edit");
      } else {
        res.redirect("/gadgets/earphones/" + req.params.id);
      }
    }
  );
});

//deleting earphone

app.delete("/gadgets/earphones/:id", checkAuthentication, function (req, res) {
  Earphones.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/earphones/" + req.params.id);
    } else {
      res.redirect("/gadgets/earphones/");
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

app.post("/preBuilt", checkAuthentication, function (req, res) {
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
app.get("/preBuilt/new", checkAuthentication, function (req, res) {
  res.render("new_Built");
});

//redirecting to a specific PreBuilt page
app.get("/preBuilt/:id", function (req, res) {
  PreBuilt.findById(req.params.id, function (err, foundpreBuilt) {
    if (err) {
      console.log(err);
    } else {
      res.render("singlePreBuilt", { preBuilt: foundpreBuilt });
    }
  });
});

app.get("/preBuilt/:id/edit", checkAuthentication, function (req, res) {
  PreBuilt.findById(req.params.id, function (err, foundBuilt) {
    if (err) {
      res.redirect("/preBuilt");
    } else {
      res.render("built_edit", { built: foundBuilt });
    }
  });
});

//update the preBuilt
app.put("/preBuilt/:id", checkAuthentication, function (req, res) {
  PreBuilt.findByIdAndUpdate(
    req.params.id,
    req.body.build,
    function (err, udBuild) {
      if (err) {
        res.redirect("/preBuilt/" + req.params.id + "/edit");
      } else {
        res.redirect("/preBuilt/" + req.params.id);
      }
    }
  );
});

//deleting preBuilt

app.delete("/preBuilt/:id", checkAuthentication, function (req, res) {
  PreBuilt.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/preBuilt/" + req.params.id);
    } else {
      res.redirect("/preBuilt");
    }
  });
});

//admin panel
app.get("/admin/signup", checkAuthentication, function (req, res) {
  res.render("admin_signup");
});

//admin signup handle
app.post("/admin/signup", checkAuthentication, function (req, res) {
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

// //admin profile
// app.get("/admin/:id/profile", checkAuthentication, function (req, res) {
//   User.findById(req.params.id, function (err, foundUser) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("profile");
//     }
//   });
// });

//handling admin profile
// app.post("/admin/:id/profile",checkAuthentication,function(req,res){

// });

//Handling login logic
app.post(
  "/admin/login",
  passport.authenticate("local", {
    successRedirect: "/home", // redirect back to the previous page
    failureRedirect: "back", // redirect back to the previous page
    failureFlash: true,
    successFlash: true,
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
    res.redirect("/admin/login");
  }
}

//logout logic
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});

//server details
app.listen(8080);
