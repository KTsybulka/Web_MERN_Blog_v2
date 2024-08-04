//description of authorization logic
const express = require("express");
const router = express.Router();

const {signUp, logIn,  getProfile}= require("../controllers/authControl");
const checkAuth = require('../middleware/checkAuth');
const { createPost } = require("../controllers/postControl");

//Create post
// http://localhost:3002/api/posts
router.post("/", checkAuth, createPost);

module.exports = router;

