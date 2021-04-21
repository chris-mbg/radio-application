const fetch = "node-fetch";

const jsonFormat = "format=json";
const paginationFalse = "pagination=false";

const covertToDateObject = require("../core/convertToDateObject");

const getAllChannels = async (req, res) => {
  let channelsList = await fetch(
    `http://api.sr.se/api/v2/channels?${jsonFormat}&${paginationFalse}`
  );
  channelsList = await channelsList.json();
  res.json(channelsList);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel);
};

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();

  channelSchedule.schedule = channelSchedule.schedule.map((prog) => {
    console.log(new Date(prog.starttimeutc));
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
