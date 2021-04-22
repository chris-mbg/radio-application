const express = require('express');
const router = express.Router();

const episodeController = require('../controllers/episodeController');

router.get("/:programId", episodeController.getAllEpisodesForProgram)
//router.get("/:episodeId", episodeController.getAllProgramsInCategory)

module.exports = router;