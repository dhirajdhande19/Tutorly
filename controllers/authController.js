const passport = require("passport");
const User = require("../models/User");
const { userSchema } = require("../Schema");
const ExpressError = require("../utils/ExpressError");

const registerUser = async (req, res) => {
    try{
    const {username, email, password} = req.body;
    const newUser = new User({email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", `Hey ${username}, welcome to the club! ✨`);
    res.redirect("/home");
    } catch(e) {
        req.flash("error", e.message);
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