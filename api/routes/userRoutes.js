const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.registerNewUser);
router.put("/:userId", userController.editUserById);
router.delete("/favourites", userController.deleteUserFavourite);
router.delete("/:userId", userController.deleteUserById);
router.get("/favourites", userController.getAllSavedFavouritesForUser);
router.post("/favourites", userController.saveFavouriteToUser);

module.exports = router;
