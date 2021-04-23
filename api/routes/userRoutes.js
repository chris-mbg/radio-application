const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.registerNewUser);
router.delete("/favourites", userController.deleteUserFavourite);
router.get("/favourites", userController.getAllSavedFavouritesForUser);
router.post("/favourites", userController.saveFavouriteToUser);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.editUserById);
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
