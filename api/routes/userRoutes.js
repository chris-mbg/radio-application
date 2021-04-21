const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.registerNewUser);
router.put("/:userId/edit", userController.editUserById)

module.exports = router;
