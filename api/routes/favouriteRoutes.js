const express = require('express');
const router = express.Router();

const favouriteController = require("../controllers/favouriteController");

router.delete("/", favouriteController.deleteUserFavourite);
router.get("/", favouriteController.getAllSavedFavouritesForUser);
router.post("/", favouriteController.saveFavouriteToUser);

module.exports = router;