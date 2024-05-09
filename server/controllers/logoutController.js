const User = require('../database/model/User');

const handleLogout = async (req, res) => {
    // ON Client, also delete access Token

    const refreshToken = req.headers['refresh-token'];
    if(!refreshToken) return res.sendStatus(204); //No Content

    const foundUser = await User.findOne({refreshToken:`${refreshToken}`});
    
    if(!foundUser) {
        return res.status(204); 
    }

    //Deleting refresh token in DB
    await User.updateOne(
        { "_id": foundUser._id },
        { $set: {"refreshToken": ""}}
    );
    
    return res.sendStatus(204); 
}

module.exports = { handleLogout };