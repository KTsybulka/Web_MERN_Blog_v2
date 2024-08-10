const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const { createComment }= require("../controllers/commentControl");

// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment)

module.exports = router;
