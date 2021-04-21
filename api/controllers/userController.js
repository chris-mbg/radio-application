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
        $lastName: userToReg.lastName
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
  
};

module.exports = {
  whoami,
  login,
  logout,
  registerNewUser,
  editUserById,
};
