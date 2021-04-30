const fetch = require("node-fetch");

const jsonFormat = "format=json";
const paginationFalse = "pagination=false";

const convertToDateObject = require("../core/convertToDateObject");

const getAllChannels = async (req, res) => {
  let channelsList = await fetch(
    `http://api.sr.se/api/v2/channels?${jsonFormat}&${paginationFalse}`
  );
  channelsList = await channelsList.json();
  res.json(channelsList.channels);
  // The response is now just the array with all the channel objects.
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${jsonFormat}`
  );
  channel = await channel.json();
  res.json(channel.channel);
};

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${jsonFormat}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();
  channelSchedule.schedule = channelSchedule.schedule.map((prog) => {
    return {
      ...prog,
      starttimeutc: convertToDateObject(prog.starttimeutc),
      endtimeutc: convertToDateObject(prog.endtimeutc),
    };
  });

  res.json(channelSchedule.schedule);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
};
