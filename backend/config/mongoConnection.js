import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js"; // MongoDB configuration settings

let _connection = undefined;
let _db = undefined;

export const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl); // Connect to MongoDB
    _db = _connection.db(mongoConfig.database); // Get the specific database
  }
  return _db;
};

export const closeConnection = async () => {
  if (_connection) await _connection.close(); // Close the connection when needed
};
