var express = require("express"),
  app = express(),
  router = express.Router(),
  User = require("../JavaScriptFiles/admin.js"),
  passport = require("passport"),
  LocalStrategy = require("passport-local");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    User.authenticate()
  )
);
//admin panel
router.get("/admin/signup", checkAuthentication, function (req, res) {
  res.render("admin_signup");
});

//admin signup handle
router.post("/admin/signup", checkAuthentication, function (req, res) {
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
router.get("/admin/login", function (req, res) {
  res.render("admin_login");
});

//Handling login logic
router.post(
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

//logout logic
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});

//Authentication
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/admin/login");
  }
}

module.exports = router;
