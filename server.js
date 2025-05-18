require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const {isLoggedIn} = require("./middlewares");
// use wrapAsync from utils folder to async funtions / calls
const app = express();


// MongoDB Connection 
main()
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
};

// Middleware to parse form and JSON dat
// app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to accept data from form 

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


// Session Implementation
const sessionOptions = {
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
      res.render("home");
});

// Routes to Serve HTML files from views folder
app.get("/register", (req, res) => {
  res.render("register");
});
  
app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/home', (req, res) => {
    res.render("home");
});
 

// just use isLoggedIn middleware to restrict user for 
// doing somthing (any work) if he's not logged in  !

app.get('/chatroom',isLoggedIn, (req, res) => {
    res.render("chatroom");
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

// to test flash

// app.get('/test-flash', (req, res) => {
//   req.flash('error', 'Flash is working!');
//   res.redirect('/home');
// });

// DEMO example for checking if passport is working okay

// app.get("/demouser", async (req, res) => {
//   let fakeuser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeuser, "helloworld");
//   res.send(registeredUser);
// });



// API routes

// Register route/API
app.use("/", authRoutes); 

// app.post("/login")


app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
    // res.render("error.ejs");
});

app.use((err, req, res, next) => {
  let { statusCode=500, message="Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
// res.send("Something went wrong!");
});


// Start Server
app.listen(8080, () => {
    console.log("Server listening to 8080");
});