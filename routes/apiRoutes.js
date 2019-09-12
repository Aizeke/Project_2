// apiRoutes.js - this file offers a set of routes for displaying and saving data to the db

var db = require("../models");

module.exports = function (app) {


  // =============================================================
  // Get Brackets / Get Bracket by ID / Create New Bracket
  // =============================================================
  app.get("/api/brackets/:id", function (req, res) {
    db.Bracket.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbResponse) {
      res.json(dbResponse);
    });
  });

  app.get("/api/brackets", function (req, res) {
    db.Bracket.findAll({
      // include: [db.User]
    }).then(function (dbResponse) {
      res.json(dbResponse);
    });
  });

  app.put("/api/brackets/:bracketId", function (req, res, next) {
    db.Bracket.update(
      {
        bracketName: req.body.bracketName,
        bracketType: req.body.bracketType,
        gameInfo: req.body.gameInfo
      },
      { where: req.params.bracketId }
    )
      .then(function (rowsUpdated) {
        res.json(rowsUpdated);
      })
      .catch(next)
  });

  // Create a new Bracket
  app.post("/api/brackets", function (req, res) {

    var userId = req.session.userId;

    var bracketType = req.body.bracketType;
    var gameInfo = req.body.gameInfo;
    var bracketName = req.body.bracketName;
    var teamNames = JSON.parse(req.body.teamNames);
    var scores = JSON.parse(req.body.scores);

    db.Bracket.create({
      bracketName: bracketName,
      bracketType: bracketType,
      gameInfo: gameInfo,
      teamNames: teamNames,
      scores: scores,
      // Send users sessions usingid
      UserId: userId
    }).then(function (dbResponse) {
      console.log(dbResponse);
      res.json(dbResponse.dataValues.id);
    });
  });

  // =============================================================
  // Get Users / Create New User From SignUp
  // =============================================================

  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [db.Bracket]
    }).then(function (dbResponse) {
      res.json(dbResponse);
    });
  });

  app.post("/api/users", (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    var displayName = req.body.displayName;

    db.User.create({
      email: email,
      displayName: displayName,
      password: pass
    })
      .then((dbResponse) => {
        console.log(dbResponse.id);

        req.session.initialized = true;
        req.session.userId = dbResponse.id;
        req.session.email = dbResponse.email;
        // redirect to user's dashboard
        res.redirect("/hosted-brackets");
      })
  });

  // =============================================================
  // Login Attempt / Logout
  // =============================================================

  app.post("/login", function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    // Find Users in the database
    db.User.findAll({
      where: {
        email: email,
        password: pass
      }
    }).then(function (dbResponse) {
      if (dbResponse.length === 0) {
        console.log("no user found");
        res.json(false);
      } else {
        console.log("User " + req.session.email + "Found");
        req.session.initialized = true;
        req.session.userId = dbResponse[0].id;
        req.session.email = dbResponse[0].email;

        res.redirect("/dashboard");
      }
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });


  // ====================
  // DEV ROUTE LOGIN USER YOUR OWN LOGIN
  // ====================
  
  app.get("/dev/login", function (req, res) {
    req.session.initialized = true;
    req.session.userId = 1;
    req.session.email = "Isaac";
    req.session.displayName = "Aizeke"
    res.redirect("/");
  });
};