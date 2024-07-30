const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        post: {
            // link to another schema
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    },
    {
        timestamps: true, // see the post history (date)
    }
)


const User = mongoose.model('User', userSchema);
module.exports = User;