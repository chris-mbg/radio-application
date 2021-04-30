const fetch = require("node-fetch");

const jsonFormat = "format=json";
const paginationFalse = "pagination=false";

const convertToDateObject = require("../core/convertToDateObject");

const getAllProgramsForOneChannel = async (req, res) => {
  let programList = await fetch(
    `http://api.sr.se/api/v2/programs/index?${jsonFormat}&${paginationFalse}&channelid=${req.params.channelId}`
  );
  programList = await programList.json();
  res.json(programList.programs);
};

const getProgramById = async (req, res) => {
  let program = await fetch(
    `http://api.sr.se/api/v2/programs/${req.params.programId}?${jsonFormat}`
  );
  program = await program.json();
  res.json(program.program);
};

const getProgramSchedule = async (req, res) => {
  let programBroadcasts = await fetch(
    `http://api.sr.se/api/v2/broadcasts?${jsonFormat}&${paginationFalse}&programid=${req.params.programId}`
  );
  programBroadcasts = await programBroadcasts.json();

  programBroadcasts.broadcasts = programBroadcasts.broadcasts.map(
    (broadcast) => {
      return {
        ...broadcast,
        broadcastdateutc: convertToDateObject(broadcast.broadcastdateutc),
      };
    }
  );

  res.json(programBroadcasts);
};

module.exports = {
  getAllProgramsForOneChannel,
  getProgramById,
  getProgramSchedule,
};
