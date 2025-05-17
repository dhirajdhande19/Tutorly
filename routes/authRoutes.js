const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

router.post("/register", wrapAsync(registerUser));

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", 
        { failureRedirect: "/login", 
            failureFlash: true }), loginUser,
);

module.exports = router;