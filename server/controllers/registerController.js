const User = require('../database/model/User');
const userData = require('../dal/users.dao');

const handleNewUser = async (req, res) => {
    const {name, email, password, skill} = req.body;

    if (skill === "Beginner") {
        elo = 400;
    } else if(skill === "Intermediate") {
        elo = 1200;
    } else {
        elo = 2000;
    }

    if (!name || !email || !password || !skill)
    {
        return res.status(400).json({message: "All fields are required"});
    }

    //checking for duplicate email address
    const duplicate = await User.findOne({email: `${email}`});
    if(duplicate)
    {
        return res.status(409).json({message: "Email is already registered"});
    }

    try {
        const newUser = {
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
            skill_level: `${skill}`,
            elo_rating: `${elo}`,
            refreshToken: ""
        }
        await userData.createUser(newUser);

    } catch (error)
    {
        res.status(500).json({message: error.message});
    }

    res.status(201).json({message: "New User Created!!"});
}

module.exports = {handleNewUser};