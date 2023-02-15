const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/db");
const Rest = require("./models/restModel");
const authRoute = require("./routes/authRoute");
const reviewRoute = require("./routes/reviewRoute");
const filterRoute = require("./routes/filterRoute");
const addRestRoute = require("./routes/addRestRoute");
const User = require("./models/userModel");
const { getRests } = require("./controllers/restController");

connectDB();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "This is our secret.",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/auth", authRoute);
app.use("/reviews", reviewRoute);
app.use("/filters", filterRoute);
app.use("/addrest", addRestRoute);

app.get("/", getRests);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
