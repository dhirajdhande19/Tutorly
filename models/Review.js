const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    name: String, 
    institution: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    feedback: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema);