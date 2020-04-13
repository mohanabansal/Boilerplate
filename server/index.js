const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
//------------ASK SOMEONE ABOUT THIS-----------------
const { db, User } = require("./db");

const app = express();

app.use(morgan("dev"));

//static middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure and create our database store
//------------ASK SOMEONE ABOUT THIS-----------------
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
//------------ASK SOMEONE ABOUT THIS-----------------
dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

//----------need user model for this
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser((id, done) => {
  try {
    let user = User.findById(id);
    done(null, user)
  } catch (error) {
    done(error)
  }
})

//include our routes
app.use("/", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

// const port = process.env.PORT || 3000;

// app.listen(port, function() {
//   console.log(`server in now listening to https://localhost:${port}`);
// });

module.exports = app;
