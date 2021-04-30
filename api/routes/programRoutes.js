const express = require('express');
const router = express.Router();

const programController = require('../controllers/programController');

router.get("/channel/:channelId", programController.getAllProgramsForOneChannel);
router.get("/schedule/:programId", programController.getProgramSchedule)
router.get("/:programId", programController.getProgramById);

module.exports = router;