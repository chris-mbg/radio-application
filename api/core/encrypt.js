const crypto = require('crypto');

const encrypt = password => {
  return crypto
    .createHmac("sha256", "Travel And Prosper") // Algorithm and salt
    .update(password) // Hashes password
    .digest("hex"); // Encoding type
}

module.exports = encrypt;