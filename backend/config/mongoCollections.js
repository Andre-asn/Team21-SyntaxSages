import { dbConnection } from "./mongoConnection.js"; // Import the DB connection function

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection(); // Get the database instance
      _col = await db.collection(collection); // Fetch the desired collection
    }
    return _col;
  };
};

export const users = getCollectionFn("users"); // Users collection
