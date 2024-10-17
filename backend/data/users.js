import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import {
  validEmail,
  validUser,
  validPass,
  validFN,
  validLN,
} from "../helpers/helpers.js";

const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  username,
  password
) => {
  if (!validFN(firstName)) throw new Error("Invalid first name");
  if (!validLN(lastName)) throw new Error("Invalid last name");
  if (!validEmail(emailAddress)) throw new Error("Invalid email");
  if (!validUser(username)) throw new Error("Invalid username");
  if (!validPass(password)) throw new Error("Invalid password");

  const getUserCollection = await users();
  const existingUser = await getUserCollection.findOne({
    emailAddress: emailAddress.toLowerCase(),
  });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName,
    lastName,
    emailAddress: emailAddress.toLowerCase(),
    username: username.toLowerCase(),
    password: hashedPassword,
  };

  const result = await getUserCollection.insertOne(newUser);
  if (!result.acknowledged) throw new Error("User registration failed");

  return result;
};

const loginUser = async (username, password) => {
  if (!validUser(username)) throw new Error("Invalid username");
  if (!validPass(password)) throw new Error("Invalid password");

  const getUserCollection = await users();
  const user = await getUserCollection.findOne({
    username: username.toLowerCase(),
  });

  if (!user) throw new Error("Invalid username or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid username or password");

  return {
    userId: user._id.toString(),
    firstName: user.firstName,
  };
};

export default { registerUser, loginUser };
