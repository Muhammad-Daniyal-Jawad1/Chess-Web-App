const User = require('../database/model/User');
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    const { email, oldPassword, newPassword} = req.body;


    if ( !email || !newPassword || !oldPassword)
    {
        return res.status(400).json({message: "All fields are required"});
    }

    //checking for duplicate email address
    const foundUser = await User.findOne({email: `${email}`});
    if(!foundUser)
    {
        return res.status(409).json({message: "No such user Exists"});
    }

    const flag = await bcrypt.compare(oldPassword, foundUser.password);

    if(flag) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await User.updateOne(
                { "_id": foundUser._id },
                { $set: {"password": hashedPassword}}
            );
    
        } catch (error)
        {
            return res.status(500).json({message: error.message});
        }

        return res.status(201).json({message: "Password Updated!!"});
    }
    else {
        return res.status(401).json({message: "Incorrect password!!"});
    }
    
}

module.exports = {resetPassword};