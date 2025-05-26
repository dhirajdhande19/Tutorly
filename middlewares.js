const Review = require("./models/Review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Whoa! That's for logged-in users only 😅");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", `Hold up! You can't delete someone else's review 🚫`);
    return res.redirect("/home#testimonials");
  }
  
  next();
};