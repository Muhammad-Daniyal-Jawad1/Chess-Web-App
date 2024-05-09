const express = require("express");
const registerController = require("../controllers/registerController")
const loginController = require("../controllers/loginController");
const resetController = require("../controllers/resetController");
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.post("/register", registerController.handleNewUser);
router.post("/login", loginController.handleLogin);
router.post("/reset", resetController.resetPassword);

router.use(verifyJWT);

router.get("/info", (req, res) => {
    //
    res.sendStatus(200);
})

module.exports = router;