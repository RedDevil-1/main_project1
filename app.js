var express = require("express"),
  app = express(),
  path = require("path"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  fs = require("fs"),
  News = require("./JavaScriptFiles/news.js"),
  Admins = require("./JavaScriptFiles/admin.js"),
  Mobiles = require("./JavaScriptFiles/mobile.js"),
  Processors = require("./JavaScriptFiles/processor.js"),
  GraphicCards = require("./JavaScriptFiles/graphicCard.js"),
  Laptops = require("./JavaScriptFiles/laptop.js"),
  Headphones = require("./JavaScriptFiles/headphone.js"),
  Earphones = require("./JavaScriptFiles/earphone.js"),
  bodyParser = require("body-parser");

//setting up engines
app.set("views", "./views");
app.set("view engine", "ejs");

// connecting to MongoDB
mongoose.connect("mongodb://localhost/news_update");

//including various files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "news")));
app.use(express.static(path.join(__dirname, "cssFiles")));
app.use(express.static(path.join(__dirname, "JavaScriptFiles")));
app.use(express.static(path.join(__dirname, "images")));

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
  var header = req.body.header;
  var brief = req.body.brief;
  var description = req.body.description;
  var image = req.body.image;
  var newNews = {
    header: header,
    brief: brief,
    description: description,
    image: image,
  };

  News.create(newNews, function (err, addedNews) {
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

//pre-built page

app.get("/preBuilt", function (req, res) {
  res.render("preBuilt");
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
  var ModelName = req.body.ModelName;
  var LaunchedDate = req.body.LaunchedDate;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var ClockFrequency = req.body.ClockFrequency;
  var TurboFrequency = req.body.TurboFrequency;
  var PhysicalCores = req.body.PhysicalCores;
  var Threads = req.body.Threads;
  var Power = req.body.Power;
  var BitWidth = req.body.BitWidth;
  var MaxMemory = req.body.MaxMemory;
  var Brief = req.body.Brief;

  var newProcessor = {
    ModelName: ModelName,
    LaunchedDate: LaunchedDate,
    Price: Price,
    ClockFrequency: ClockFrequency,
    TurboFrequency: TurboFrequency,
    PhysicalCores: PhysicalCores,
    Threads: Threads,
    Power: Power,
    BitWidth: BitWidth,
    MaxMemory: MaxMemory,
    Image: Image,
    Description: Description,
    Brief: Brief,
  };
  Processors.create(newProcessor, function (err, addProcessor) {
    if (err) {
      console.log(err);
    } else {
      console.log("Processor added successfully");
      res.redirect("processors");
    }
  });
});

//new processor page
app.get("/processors/new", function (req, res) {
  res.render("new_processor");
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
  var ModelName = req.body.ModelName;
  var LaunchedDate = req.body.LaunchedDate;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var GPUClock = req.body.GPUClock;
  var GPUChip = req.body.GPUChip;
  var MemoryClock = req.body.MemoryClock;
  var Bus = req.body.Bus;
  var Memory = req.body.Memory;
  var Shaders = req.body.Shaders;
  var Brief = req.body.Brief;
  var newGraphic = {
    ModelName: ModelName,
    LaunchedDate: LaunchedDate,
    Price: Price,
    GPUClock: GPUClock,
    GPUChip: GPUChip,
    MemoryClock: MemoryClock,
    Bus: Bus,
    Memory: Memory,
    Shaders: Shaders,
    Description: Description,
    Brief: Brief,
    Image: Image,
  };
  GraphicCards.create(newGraphic, function (err, addGraphic) {
    if (err) {
      console.log(err);
    } else {
      console.log("graphic card added successfully");
      res.redirect("graphicCard");
    }
  });
});

//adding new object
app.get("/gadgets/graphicCard/new", function (req, res) {
  res.render("new_graphicCard");
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
  var ModelName = req.body.ModelName;
  var LaunchedDate = req.body.LaunchedDate;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var CPU = req.body.CPU;
  var GPU = req.body.GPU;
  var RAM = req.body.RAM;
  var Display = req.body.Display;
  var Memory = req.body.Memory;
  var Camera = req.body.Camera;
  var Brief = req.body.Brief;
  var newLaptop = {
    ModelName: ModelName,
    LaunchedDate: LaunchedDate,
    Price: Price,
    CPU: CPU,
    GPU: GPU,
    RAM: RAM,
    Display: Display,
    Memory: Memory,
    Camera: Camera,
    Description: Description,
    Brief: Brief,
    Image: Image,
  };
  Laptops.create(newLaptop, function (err, addLaptop) {
    if (err) {
      console.log(err);
    } else {
      console.log("Laptop added successfully");
      res.redirect("Laptops");
    }
  });
});

//new laptop
app.get("/gadgets/laptops/new", function (req, res) {
  res.render("new_laptop");
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
app.post("/mobiles", function (req, res) {
  var ModelName = req.body.ModelName;
  var LaunchedDate = req.body.LaunchedDate;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var CPU = req.body.CPU;
  var GPU = req.body.GPU;
  var RAM = req.body.RAM;
  var Display = req.body.Display;
  var Memory = req.body.Memory;
  var Camera = req.body.Camera;
  var Brief = req.body.Brief;
  var newMobile = {
    ModelName: ModelName,
    LaunchedDate: LaunchedDate,
    Price: Price,
    CPU: CPU,
    GPU: GPU,
    RAM: RAM,
    Display: Display,
    Memory: Memory,
    Camera: Camera,
    Description: Description,
    Brief: Brief,
    Image: Image,
  };
  Mobiles.create(newMobile, function (err, addMobile) {
    if (err) {
      console.log(err);
    } else {
      console.log("mobile added successfully");
      res.redirect("mobiles");
    }
  });
});

//adding new object
app.get("/mobiles/new", function (req, res) {
  res.render("new_mobile");
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
  var ModelName = req.body.ModelName;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var HeadphoneType = req.body.HeadphoneType;
  var Mic = req.body.Mic;
  var ConnectorType = req.body.ConnectorType;
  var Brief = req.body.Brief;
  var Connectivity = req.body.Connectivity;
  var BatteryCapacity = req.body.BatteryCapacity;
  var newHeadphone = {
    ModelName: ModelName,
    Price: Price,
    Description: Description,
    Brief: Brief,
    Image: Image,
    HeadphoneType: HeadphoneType,
    Mic: Mic,
    ConnectorType: ConnectorType,
    Connectivity: Connectivity,
    BatteryCapacity: BatteryCapacity,
  };
  Headphones.create(newHeadphone, function (err, addHeadphone) {
    if (err) {
      console.log(err);
    } else {
      console.log("headphone added successfully");
      res.redirect("headphones");
    }
  });
});

//adding new object
app.get("/gadgets/headphones/new", function (req, res) {
  res.render("new_headphone");
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
  var ModelName = req.body.ModelName;
  var Description = req.body.Description;
  var Image = req.body.Image;
  var Price = req.body.Price;
  var Mic = req.body.Mic;
  var ConnectorType = req.body.ConnectorType;
  var Brief = req.body.Brief;
  var Connectivity = req.body.Connectivity;
  var BatteryCapacity = req.body.BatteryCapacity;
  var newEarphone = {
    ModelName: ModelName,
    Price: Price,
    Description: Description,
    Brief: Brief,
    Image: Image,
    Mic: Mic,
    ConnectorType: ConnectorType,
    Connectivity: Connectivity,
    BatteryCapacity: BatteryCapacity,
  };
  Earphones.create(newEarphone, function (err, addEarphone) {
    if (err) {
      console.log(err);
    } else {
      console.log("Earphone added successfully");
      res.redirect("earphones");
    }
  });
});

//adding new object
app.get("/gadgets/earphones/new", function (req, res) {
  res.render("new_earphone");
});

//server details
app.listen(8080);
