const express = require("express");
const userController = require("../Controllers/User.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);
router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);


module.exports = router;