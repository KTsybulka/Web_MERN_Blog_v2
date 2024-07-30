const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
const signUp = async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Debugging

        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.status(400).json({
                message: 'This username already exists'
            });
        }

        // Encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign({ 
            id: newUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        await newUser.save();

        res.status(201).json({
            newUser,
            message: "Successful registration",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred during registration",
            error: error.message
        });
    }
};

// Login
const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({
                message: 'This username does not exist'
            });
        }

        // Compare the received password with the encrypted password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // Corrected comma

        if (!isPasswordCorrect) {
            return res.status(401).json({ // Changed to 401 Unauthorized
                message: 'Wrong password'
            });
        }

        // Using JWT to determine that we are logged in
        // Encrypt user id in token
        const token = jwt.sign({ 
            id: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).json({ 
            token, 
            user,
            message: "Successful log in",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while logging in",
            error: error.message
        });
    }
};

// Get my profile - works when refreshing the page without the need to re-authorize
const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({
                message: 'This username does not exist'
            });
        }

        // Encrypt user id in token
        const token = jwt.sign({ 
            id: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).json({ 
            token, 
            user,
            message: "Successful access",
        });

    }catch (error) {
        res.status(500).json({
            message: "No access",
            error: error.message
        });
    }
};

// Get my profile #2
// const getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);
        
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found'
//             });
//         }

//         res.status(200).json({ 
//             user,
//             message: "Profile retrieved successfully",
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error occurred while retrieving profile",
//             error: error.message
//         });
//     }
// };


module.exports = {
    signUp,
    logIn,
    getProfile
};