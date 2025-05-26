const joi = require("joi");

module.exports.reviewSchema = joi.object({
    name: joi.string().min(2).required(),
    institution: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
    feedback: joi.string().required(),
});
