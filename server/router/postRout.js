//description of post logic
const express = require("express");
const router = express.Router();

// const {signUp, logIn,  getProfile}= require("../controllers/authControl");
const checkAuth = require('../middleware/checkAuth');
const { createPost, getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments 
} = require("../controllers/postControl");

//Create post
// http://localhost:3002/api/posts
router.post("/", checkAuth, createPost);

// Get All Posts
// http://localhost:3002/api/posts
router.get('/', getAll);

// Get Post By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById);

// Update Post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// Remove Post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)


module.exports = router;

