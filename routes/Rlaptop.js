var express = require("express"),
  app = express(),
  router = express.Router(),
  Laptops = require("../JavaScriptFiles/laptop.js"),
  auth = require("./auth");
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/admin", auth);
//Laptop section

//main page
router.get("/gadgets/laptops", function (req, res) {
  Laptops.find({}, function (err, allLaptops) {
    if (err) {
      console.log(err);
    } else {
      res.render("Laptops", { Laptops: allLaptops });
    }
  });
});

//post request
router.post("/gadgets/laptops", checkAuthentication, function (req, res) {
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
router.get("/gadgets/laptops/new", checkAuthentication, function (req, res) {
  res.render("new_laptop");
});

//redirecting to a specific laptop page
router.get("/gadgets/laptops/:id", function (req, res) {
  Laptops.findById(req.params.id, function (err, foundLaptop) {
    if (err) {
      console.log(err);
    } else {
      res.render("singleLaptop", { laptop: foundLaptop });
    }
  });
});

router.get(
  "/gadgets/laptops/:id/edit",
  checkAuthentication,
  function (req, res) {
    Laptops.findById(req.params.id, function (err, foundLaptop) {
      if (err) {
        res.redirect("/gadgets/laptops");
      } else {
        res.render("laptop_edit", { laptop: foundLaptop });
      }
    });
  }
);

//update the laptop
router.put("/gadgets/laptops/:id", checkAuthentication, function (req, res) {
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

router.delete("/gadgets/laptops/:id", checkAuthentication, function (req, res) {
  Laptops.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/gadgets/laptops/" + req.params.id);
    } else {
      res.redirect("/gadgets/laptops");
    }
  });
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/admin/login");
  }
}
module.exports = router;
