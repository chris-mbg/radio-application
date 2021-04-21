const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.registerNewUser);
router.put("/:userId", userController.editUserById);
router.delete("/:userId", userController.deleteUserById);
router.get("/:userId/favourites", userController.getAllSavedFavourites);
router.post("/:userId/favourites", userController.saveFavouriteToUser);

module.exports = router;
