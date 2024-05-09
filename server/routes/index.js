const express = require("express");
const userRoutes = require("./user.route");
const refreshRoutes = require("./refresh.route");
const logoutRoutes = require("./logout.route");
const router = express.Router();


router.use("/refresh", refreshRoutes);
router.use("/logout", logoutRoutes);
router.use("/user", userRoutes);

module.exports = router;