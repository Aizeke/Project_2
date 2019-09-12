var db = require("../models");

module.exports = function (app) {

  // ==========================================================
  //  LOGIN / SIGNUP ROUTES
  // ==========================================================
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  // ==========================================================

  // Load index in either logged in state
  // or non logged in state.
  app.get("/", function (req, res) {
    db.Bracket.findAll({
      include: [db.User]
    }).then(function (dbResponse) {

      if (req.session.initialized) {
        console.log(dbResponse);
        res.render("index", {
          initialized: req.session.initialized,
          User: req.session.userId,
          username: req.session.username,
          brackets: dbResponse
        });
      } else {
        res.render("index", {
          brackets: dbResponse
        });
      }
    });
  });


  app.get("/hosted-brackets", function (req, res) {
    console.log(req.session.initialized, req.session.userId);

    db.Bracket.findAll({
      where: { userId: req.session.userId }
    })
      .then(function (dbResponse) {
        res.render("hostedBrackets", {
          initialized: req.session.initialized,
          userId: req.session.userId,
          username: req.session.username,
          brackets: dbResponse
        });
      });
  });

  app.get("/bracket/:id", function (req, res) {
    db.Bracket.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbResponse) {
      console.log(dbResponse);
      if (req.session.initialized) {
        console.log(dbResponse.dataValues.teamNames[0])
        res.render("bracket", {
          initialized: req.session.initialized,
          userId: req.session.userId,
          username: req.session.username,
          id: dbResponse.dataValues.id,
          bracketName: dbResponse.dataValues.bracketName,
          bracketType: dbResponse.dataValues.bracketType,
          gameInfo: dbResponse.dataValues.gameInfo,
          teamNames: dbResponse.dataValues.teamNames,
          scores: dbResponse.dataValues.scores
        });
      } else {
        res.render("bracket", {
          id: dbResponse.dataValues.id,
          bracketName: dbResponse.dataValues.bracketName,
          bracketType: dbResponse.dataValues.bracketType,
          gameInfo: dbResponse.dataValues.gameInfo,
          teamNames: dbResponse.dataValues.teamNames,
          scores: dbResponse.dataValues.scores
        });
      }
    });
  });

  // Sends Create Bracket html
  app.get("/create-bracket", function (req, res) {

    if (req.session.initialized) {
      res.render("createNewBracket", {
        initialized: req.session.initialized,
        userId: req.session.userId,
        username: req.session.username
      });
    } else {
      //
      // ROUTE THE USER TO THE LOGIN
      //
      //
      res.render("login", {
        msg: "You Need To Be Logged In To Make A Bracket!"
      });
    };
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    if (req.session.initialized) {
      res.render("404", {
        initialized: req.session.initialized,
        userId: req.session.userId,
        username: req.session.username
      });
    } else {
      res.render("404", {
        msg: "You Hit The Wrong Route!"
      });
    };
  });
};
