//description of authorization logic
const express = require("express");
const router = express.Router();

const {signUp, logIn,  getProfile}= require("../controllers/authControl");
const checkAuth = require('../middleware/checkAuth');

//Signup
router.post("/signup", signUp);

//Login
router.post("/login", logIn);

// Get my profile
router.get("/myprofile", checkAuth, getProfile);

module.exports = router;