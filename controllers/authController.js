const passport = require("passport");
const User = require("../models/User");
const { userSchema } = require("../Schema");
const ExpressError = require("../utils/ExpressError");



const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Hey ${username}, welcome to the club! ✨`);
            res.redirect("/home");
        });

    } catch (e) {
        // Check for duplicate key error (email or username)
        if (e.name === "MongoServerError" && e.code === 11000) {
            const duplicateField = Object.keys(e.keyValue)[0];
            if (duplicateField === "email") {
                req.flash("error", "📧 That email's taken. Got another?");
            } else if (duplicateField === "username") {
                req.flash("error", "😕 Username's taken. Be more original 😉");
            } else {
                req.flash("error", "❗Oops! Check your input.");
            }
        } else {
            // Any other errors (e.g. validation)
            req.flash("error", e.message);
        }

        res.redirect("/register");
    }
};


const loginUser =  async (req, res) => {
        const {username} = req.body;
        req.flash("success", `Great to see you, ${username}! 😎`);
        let redirectUrl = res.locals.redirectUrl || "/home";
        res.redirect(redirectUrl);
};

module.exports = { registerUser, loginUser };