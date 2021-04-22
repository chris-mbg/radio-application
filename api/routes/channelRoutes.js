const express = require('express');
const router = express.Router();

const channelController = require('../controllers/channelController');

router.get("/", channelController.getAllChannels);
router.get("/schedule/:channelId", channelController.getChannelSchedule);
router.get("/:channelId", channelController.getChannelById);

module.exports = router;