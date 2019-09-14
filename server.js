require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var mysql = require("mysql");

var db = require("./models");

var app = express();

const TWO_HOURS = 1000 * 60 * 60 * 2;

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection.mysql.createConnection({
    username: "root",
    password: "%I_Met_The_Devil_In_Miami%",
    database: "tournamentBracket_db",
    host: "localhost"
  })
}

  const {
    PORT = 3000,

    SESS_NAME = 'sid',
    SESS_LIFTIME = TWO_HOURS,
    SESS_SECRET = 'leaguebestgame'
  } = process.env;



// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// ===========================================================================
// ===========================================================================

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESS_LIFTIME,
    sameSite: true,
    secure: false
  },
  secret: SESS_SECRET
}));

// ===========================================================================
// ===========================================================================

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
