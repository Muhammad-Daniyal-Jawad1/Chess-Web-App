const User = require('../database/model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.headers['refresh-token'];

    if(!refreshToken) return res.sendStatus(401);
    //console.log(cookies.jwt);


    const foundUser = await User.findOne({refreshToken:`${refreshToken}`});
    if(!foundUser) return res.status(403); //Frobidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '50s'}
            );
            res.json({ 
                "accessToken" : accessToken, 
                "name" : `${foundUser.name}`,
                "email" : `${foundUser.email}`,
                "elo" : `${foundUser.elo_rating}`
            });
        }
    )

    
}

module.exports = { handleRefreshToken };