// config
require("dotenv").config();

const ServerPort = process.env.SERVER_PORT;
const MongoDB_Atlas_Connection = process.env.MONGODB_ATLAS_CONNECTION;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME || "1d";

module.exports = {
  ServerPort,
  MongoDB_Atlas_Connection,
  jwtSecretKey,
  jwtExpirationTime,
};
