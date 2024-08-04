const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        username: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },// String because it just stores the path of the image
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],//arrya of objects
    },
    { timestamps: true },
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;