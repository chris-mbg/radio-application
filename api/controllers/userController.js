const path = require("path");
const encrypt = require("../core/encrypt");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(path.join(__dirname, "../radioAppDB.db"));

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {
  // Checks if user email exist in DB
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };
  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Email and/or password not found." });
      return;
    }
    // Compares the passwords
    req.body.password = encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      res.json({ success: "Logged in", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Email and/or password not found." });
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "User logged out." });
};

const registerNewUser = (req, res) => {
  const userToReg = req.body;
  console.log("In user controller, user To reg:", userToReg);
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToReg.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      res.status(400).json({ error: "User email already registered" });
    } else {
      userToReg.password = encrypt(userToReg.password);
      query = /*sql*/ `INSERT INTO users (email, password, firstName, lastName) VALUES ($email, $password, $firstName, $lastName)`;
      params = {
        $email: userToReg.email,
        $password: userToReg.password,
        $firstName: userToReg.firstName,
        $lastName: userToReg.lastName,
      };
      db.run(query, params, function (err, result) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        } else {
          query = /*sql*/ `SELECT * FROM users WHERE userId = $id`;
          params = { $id: this.lastID };
          db.get(query, params, (err, newUser) => {
            if (err) {
              res.status(400).json({ error: err });
              return;
            } else {
              delete newUser.password;
              req.session.user = newUser;
              res.json({
                success: "User registered and logged in.",
                lastID: this.lastID,
              });
            }
          });
        }
      });
    }
  });
};

const editUserById = (req, res) => {
  let query = /*sql*/ `UPDATE users SET ${Object.keys(req.body)
    .map((k) => k + " = $" + k)
    .join(", ")} WHERE userId = $id`;
  let params = { $id: req.params.userId };
  for (key in req.body) {
    params["$" + key] = req.body[key];
  }
  db.run(query, params, function (err) {
    if (err) {
      console.log("Error in edit:", err);
      res.json({ error: err });
    } else {
      res.json({ success: "User info updated", changes: this.changes });
    }
  });
};

const deleteUserById = (req, res) => {
  let query = /*sql*/ `SELECT * from users WHERE userId = $id`;
  let params = { $id: req.params.userId };
  let userToDelete = db.get(query, params);
  // Check if the user exist
  if (!userToDelete) {
    res
      .status(400)
      .send(`The user with id:${req.params.userId} does not exist`);
    return;
  }

  query = /*sql*/ `DELETE FROM users WHERE userId = $id`;
  db.run(query, params, function (err) {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: "User deleted", changes: this.changes });
    }
  });
};

const getAllSavedFavourites = (req, res) => {
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
        console.log('Error:', err)
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
  if(req.body.channelId) {
    query = /*sql*/`SELECT * from channel WHERE channelId = $channelId AND userId = $userId`
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
        res.json({ success: `Favourite channel deleted for user with id:${req.session.user.userId}`, changes: this.changes });
      }
    });
  } else if(req.body.programId) {

  } else {
    
  }

};

module.exports = {
  whoami,
  login,
  logout,
  registerNewUser,
  editUserById,
  deleteUserById,
  getAllSavedFavourites,
  saveFavouriteToUser,
  deleteUserFavourite
};