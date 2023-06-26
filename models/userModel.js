const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secrets");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  p_name: String,
  city_name: String,
  street_name: String,
  building_name: String,
  story: Number,
  apartment: Number,
  files: Array,
  comments: Array,
  date_created: {
    type: Date, default: Date.now
  },
  role: {
    type: String,
    default: "User",
    enum: ['Admin', 'Contractor', 'User']
  },
})

// Export the user model
exports.UserModel = mongoose.model("users", userSchema);

// Function to create a JWT token
exports.createToken = (user_id, role) => {
   // Sign the payload (user_id and role) with the token secret and set expiration time
  let token = jwt.sign({ _id: user_id, role: role }, config.token_secret, { expiresIn: "600mins" })
  return token;
}

// Function to validate user data before saving to the database
exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    // Define the Joi schema for validation
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(4).max(150).required(),
    phone: Joi.string().min(6).max(30).required(),
    p_name: Joi.string().min(2).max(50).required(),
    city_name: Joi.string().min(2).max(50).required(),
    street_name: Joi.string().min(2).max(50).required(),
    building_name: Joi.string().min(1).max(40).allow('', null),
    story: Joi.number().max(50).required(),
    apartment: Joi.number().max(300).required()
  })
  return joiSchema.validate(_reqBody);
}

exports.validateUserPut = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).allow(null,""),
    email: Joi.string().min(2).max(150).email().allow(null,""),
    phone: Joi.string().min(6).max(30).allow(null,""),
    p_name: Joi.string().min(2).max(50).allow(null,""),
    city_name: Joi.string().min(2).max(50).allow(null,""),
    street_name: Joi.string().min(2).max(50).allow(null,""),
    building_name: Joi.string().min(1).max(40).allow('', null),
    story: Joi.number().max(50).allow(null,""),
    apartment: Joi.number().max(300).allow(null,""),
    files: Joi.array().max(11100).allow(null, ""),
    comments: Joi.array().max(11100).allow(null, ""),
  })
  return joiSchema.validate(_reqBody);
}
exports.validateUserPost = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).allow(null,""),
    email: Joi.string().min(2).max(150).email().allow(null,""),
    phone: Joi.string().min(6).max(30).allow(null,""),
    p_name: Joi.string().min(2).max(50).allow(null,""),
    city_name: Joi.string().min(2).max(50).allow(null,""),
    street_name: Joi.string().min(2).max(50).allow(null,""),
    building_name: Joi.string().min(1).max(40).allow('', null),
    story: Joi.number().max(50).allow(null,""),
    apartment: Joi.number().max(300).allow(null,""),
    files: Joi.array().max(11100).allow(null, ""),
    comments: Joi.array().max(11100).allow(null, ""),
  })
  return joiSchema.validate(_reqBody);
}

// Function to validate login credentials
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(3).max(150).required()
  })

   // Perform validation and return the result
  return joiSchema.validate(_reqBody);
}
