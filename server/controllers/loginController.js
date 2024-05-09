const User = require('../database/model/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = { email:`${email}`, password:`${password}`};

    const foundUser = await User.findOne({email:`${email}`});
    if(!foundUser) return res.status(400).json({message:"No user with such email exists"});

    const login = await bcrypt.compare(user.password, foundUser.password);

    if (login)
    {
        //JWT creation
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "50s"}
        );
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d"}
        );

        await User.updateOne(
            { "_id": foundUser._id },
            { $set: {"refreshToken": `${refreshToken}`}}
        );

        const {name, email, skill_level, elo_rating} = foundUser;

        return res.status(200).json(
            {message: "Login Successful!", 
            name: `${name}`,
            email: `${email}`,
            skill:`${skill_level}`, 
            elo: `${elo_rating}`,
            accessToken:`${accessToken}`,
            refreshToken:`${refreshToken}`}
            );

    }
    else
    {
        return res.status(401).json({message: "Incorrect password!!"});
    }
}

module.exports = { handleLogin };