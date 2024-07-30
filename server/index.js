const express = require('express');
const cors = require('cors');//to handle requests from different origins (domains, protocols, or ports)
const bcrypt = require('bcryptjs');//for hashing and comparing passwords 
const jwt = require('jsonwebtoken'); //creating and verifying JSON Web Tokens (JWTs).
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const auth_router = require("./router/authRout");
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors()); // requests from differance API adresses
app.use(express.json()); // the data will come to server in JSON format

app.use('/api/auth', auth_router );

app
    .get('/', (req, res) =>{
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
