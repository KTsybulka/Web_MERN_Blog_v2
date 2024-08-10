const express = require('express');
const cors = require('cors');//to handle requests from different origins (domains, protocols, or ports)
const bcrypt = require('bcryptjs');//for hashing and comparing passwords 
const jwt = require('jsonwebtoken'); //creating and verifying JSON Web Tokens (JWTs).
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const auth_router = require("./router/authRout");
const post_router = require("./router/postRout");
const comment_router = require("./router/commentRout");
const User = require('./models/User');
const fileUpload = require('express-fileupload');
dotenv.config();

const PORT = process.env.PORT || 8000;

//Middleware
app.use(cors()); // requests from differance API adresses
app.use(fileUpload())
app.use(express.json()); // the data will come to server in JSON format
app.use(express.static('uploads'))

app.use('/api/auth', auth_router );
app.use('/api/posts', post_router );
app.use('/api/comments', comment_router);

app
    .get('/', (req, res) =>{
        User.find().then(users=>{console.log(users)})//Promis
         res.json({message: 'Fine! '});
    })
//DB connection
async function start(){
    try{
        await mongoose.connect(process.env.DB_HOST);

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
    }catch(error){
        console.log('Error connecting to MongoDB:', error);
    }
}

start();
