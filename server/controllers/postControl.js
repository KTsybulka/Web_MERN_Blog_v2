const Post = require("../models/Post");
const User = require("../models/User");
// import Comment from '../models/Comment.js'

const path = require('path');
const dirname = path.dirname;
// const { dirname } = require('path');
const fs = require('fs');


// Create Post
const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        // Ensure the uploads directory exists
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        if (req.files) {
            // File Handling
            const fileName = Date.now().toString() + req.files.image.name;//assigne name to image
            const filePath = path.join(uploadDir, fileName);//get path to curent directory
            // req.files.image.mv(path.join(filePath)) // move image to uploeads directory
            req.files.image.mv(filePath, (err) => { 
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
            });


            // Creating and Saving Post with image
            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,//taken from token
            })

            await newPostWithImage.save()//post is created and saved in BD
            await User.findByIdAndUpdate(req.userId, {//find user who is the post's owner
                $push: { posts: newPostWithImage },//push just ctreated post to the user 
            })

            return res.json(newPostWithImage)
        }
// Creating and Saving Post withou image
        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({ message: 'Something went wrong!' })
    }
}

// Get All Posts
const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt') //regular posts
        const popularPosts = await Post.find().limit(5).sort('-views') // populer posts

        if (!posts) {
            return res.json({ message: 'No posts' })
        }

        res.json({ posts, popularPosts })
    } catch (error) {
        res.json({ message: 'Something went wrong.' })
    }
}

// Get Post By Id
const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { //get post and increase views
            $inc: { views: 1 },
        })
        res.json(post)
    } catch (error) {
        res.json({ message: 'Something went wrong.' })
    }
}

// // Get All Posts
// const getMyPosts = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId)
//         const list = await Promise.all(
//             user.posts.map((post) => {
//                 return Post.findById(post._id)
//             }),
//         )

//         res.json(list)
//     } catch (error) {
//         res.json({ message: 'Something went wrong.' })
//     }
// }

// // Remove post
// const removePost = async (req, res) => {
//     try {
//         const post = await Post.findByIdAndDelete(req.params.id)
//         if (!post) return res.json({ message: 'No such post' })

//         await User.findByIdAndUpdate(req.userId, {
//             $pull: { posts: req.params.id },
//         })

//         res.json({ message: 'Posr was remove.' })
//     } catch (error) {
//         res.json({ message: 'Something went wrong.' })
//     }
// }

// // Update post
// const updatePost = async (req, res) => {
//     try {
//         const { title, text, id } = req.body
//         const post = await Post.findById(id)

//         if (req.files) {
//             let fileName = Date.now().toString() + req.files.image.name
//             const __dirname = dirname(fileURLToPath(import.meta.url))
//             req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
//             post.imgUrl = fileName || ''
//         }

//         post.title = title
//         post.text = text

//         await post.save()

//         res.json(post)
//     } catch (error) {
//         res.json({ message: 'Something went wrong.' })
//     }
// }

// // Get Post Comments
// const getPostComments = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         const list = await Promise.all(
//             post.comments.map((comment) => {
//                 return Comment.findById(comment)
//             }),
//         )
//         res.json(list)
//     } catch (error) {
//         res.json({ message: 'Something went wrong.' })
//     }
// }

module.exports = {
    createPost,
    getAll,
    getById
    // logIn,
    // getProfile
};