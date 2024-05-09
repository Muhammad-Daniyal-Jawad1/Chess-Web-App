const User = require('../database/model/User');
const bcrypt = require("bcrypt");

async function createUser(newUser) {
    // hash the password and then store the user to the database
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashedPassword;

    const result = await User.create(newUser);

    console.log(result);
}

module.exports = {createUser};