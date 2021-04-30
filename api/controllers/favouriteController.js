const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(path.join(__dirname, "../../radioAppDB.db"));

const getAllSavedFavouritesForUser = (req, res) => {
  const allUserFavourites = {};
  db.all(
    /*sql*/ `SELECT * FROM channels WHERE userId = $id`,
    { $id: req.session.user.userId },
    (err, result) => {
      if (err) {
        res.json({ error: err });
        return;
      } else {
        allUserFavourites.channels = result;
        db.all(
          /*sql*/ `SELECT * FROM programs WHERE userId = $id`,
          { $id: req.session.user.userId },
          (err, result) => {
            if (err) {
              res.json({ error: err });
              return;
            } else {
              allUserFavourites.programs = result;
              db.all(
                /*sql*/ `SELECT * FROM episodes WHERE userId = $id`,
                { $id: req.session.user.userId },
                (err, result) => {
                  if (err) {
                    res.json({ error: err });
                    return;
                  } else {
                    allUserFavourites.episodes = result;
                    res.json(allUserFavourites);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

const saveFavouriteToUser = (req, res) => {
  if (req.body.channelId) {
    let query = /*sql*/ `INSERT INTO channels (channelId, channelName, userId) VALUES ($channelId, $channelName, $userId)`;
    let params = {
      $userId: req.session.user.userId,
      $channelId: req.body.channelId,
      $channelName: req.body.channelName,
    };
    db.run(query, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err });
        return;
      } else {
        res.json({
          success: "Favourite channel added.",
          lastID: this.lastID,
        });
      }
    });
  } else if (req.body.programId) {
    let query = /*sql*/ `INSERT INTO programs (programId, programName, userId) VALUES ($programId, $programName, $userId)`;
    let params = {
      $userId: req.session.user.userId,
      $programId: req.body.programId,
      $programName: req.body.programName,
    };
    db.run(query, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err });
        return;
      } else {
        res.json({
          success: "Favourite program added.",
          lastID: this.lastID,
        });
      }
    });
  } else {
    let query = /*sql*/ `INSERT INTO episodes (episodeId, episodeTitle, userId) VALUES ($episodeId, $episodeTitle, $userId)`;
    let params = {
      $userId: req.session.user.userId,
      $episodeId: req.body.episodeId,
      $episodeTitle: req.body.episodeTitle,
    };
    db.run(query, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err });
        return;
      } else {
        res.json({
          success: "Favourite episode added.",
          lastID: this.lastID,
        });
      }
    });
  }
};

const deleteUserFavourite = (req, res) => {
  let query;
  let params = { $userId: req.session.user.userId };
  if (req.body.channelId) {
    query = /*sql*/ `SELECT * from channels WHERE channelId = $channelId AND userId = $userId`;
    params.$channelId = req.body.channelId;
    let channelToDelete = db.get(query, params);
    if (!channelToDelete) {
      res
        .status(400)
        .send(`This favourite channel does not exist for this user`);
      return;
    }
    query = /*sql*/ `DELETE FROM channels WHERE userId = $userId AND channelId = $channelId`;
    db.run(query, params, function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({
          success: `Favourite channel deleted for user with id:${req.session.user.userId}`,
          changes: this.changes,
        });
      }
    });
  } else if (req.body.programId) {
    query = /*sql*/ `SELECT * from programs WHERE programId = $programId AND userId = $userId`;
    params.$programId = req.body.programId;
    let programToDelete = db.get(query, params);
    if (!programToDelete) {
      res
        .status(400)
        .send(`This favourite program does not exist for this user`);
      return;
    }
    query = /*sql*/ `DELETE FROM programs WHERE userId = $userId AND programId = $programId`;
    db.run(query, params, function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({
          success: `Favourite program deleted for user with id:${req.session.user.userId}`,
          changes: this.changes,
        });
      }
    });
  } else {
    query = /*sql*/ `SELECT * from episodes WHERE episodeId = $episodeId AND userId = $userId`;
    params.$episodeId = req.body.episodeId;
    let episodeToDelete = db.get(query, params);
    if (!episodeToDelete) {
      res
        .status(400)
        .send(`This favourite episode does not exist for this user`);
      return;
    }
    query = /*sql*/ `DELETE FROM episodes WHERE userId = $userId AND episodeId = $episodeId`;
    db.run(query, params, function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({
          success: `Favourite episode deleted for user with id:${req.session.user.userId}`,
          changes: this.changes,
        });
      }
    });
  }
};

module.exports = {
  getAllSavedFavouritesForUser,
  saveFavouriteToUser,
  deleteUserFavourite,
};
