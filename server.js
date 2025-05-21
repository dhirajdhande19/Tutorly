if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const {isLoggedIn} = require("./middlewares");
// use wrapAsync from utils folder to async funtions / calls
const app = express();


const dbUrl = process.env.ATLASDB_URL;


// MongoDB Connection 
main()
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};


app.use(express.urlencoded({ extended: true })); // to accept data from form 

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

// Session Implementation
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // Stores user's data for a week so user won't have to 
  // login evey time he closes tab for a week
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent from CrossScripting attack 
  },
};


app.set("view engine", "ejs"); // Enable EJS
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionOptions));
app.use(flash()); // Displays flash msg 

app.use(passport.initialize());
// real middleware implementaion of stroing user's data for a week
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // serializeUser -> to store users data
passport.deserializeUser(User.deserializeUser()); // deserializeUser -> to delete users data

// Middleware to use flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Index Route
app.get("/", (req, res) => {
    res.redirect("/home");
});

// Routes to Serve HTML files from views folder
app.get("/register", (req, res) => {
  res.render("pages/register");
});
  
app.get('/login', (req, res) => {
  res.render("pages/login");
});

app.get('/home', (req, res) => {
    res.render("pages/home");
});
 

app.get("/test", (req, res) => {
  req.flash("success", "You did it");
  res.redirect("/home");
});

// just use isLoggedIn middleware to restrict user for 
// doing somthing (any work) if he's not logged in  !

app.get('/chatroom',isLoggedIn, (req, res) => {
    res.render("pages/chatroom");
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Catch you later, legend 😎");
    res.redirect("/home");
  });
});


// API routes

// Register route/API
app.use("/", authRoutes); 



app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode=500, message="Something went wrong!" } = err;
  res.status(statusCode).render("pages/error", { message }); // render new error page here
});


// Start Server
app.listen(2000, () => {
    console.log("Server listening to 2000");
});