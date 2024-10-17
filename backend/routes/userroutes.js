import { Router } from "express";
import { users } from "../config/mongoCollections.js"; // Direct access to users collection
import userData from "../data/users.js"; // Import reusable user functions
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validEmail,
  validUser,
  validPass,
  validFN,
  validLN,
} from "../helpers/helpers.js";

const router = Router();
const SECRET_KEY = "yourSecretKey";

// Register Route
router.post("/register", async (req, res) => {
  const {
    firstNameInput,
    lastNameInput,
    emailAddressInput,
    userNameInput,
    passwordInput,
  } = req.body;

  try {
    // Validate input using helper functions
    if (!validFN(firstNameInput)) throw new Error("Invalid first name");
    if (!validLN(lastNameInput)) throw new Error("Invalid last name");
    if (!validEmail(emailAddressInput)) throw new Error("Invalid email");
    if (!validUser(userNameInput)) throw new Error("Invalid username");
    if (!validPass(passwordInput)) throw new Error("Invalid password");

    const userCollection = await users(); // Access MongoDB collection

    // Check if email or username already exists
    const existingUser = await userCollection.findOne({
      emailAddress: emailAddressInput.toLowerCase(),
    });
    const existingUsername = await userCollection.findOne({
      username: userNameInput.toLowerCase(),
    });

    if (existingUser) throw new Error("Email already in use");
    if (existingUsername) throw new Error("Username already in use");

    // Use the userData function to register the user (reusing logic)
    const result = await userData.registerUser(
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      userNameInput,
      passwordInput
    );

    if (!result.acknowledged) throw new Error("User registration failed");

    res.status(200).json({ message: "Registration successful" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { userNameInput, passwordInput } = req.body;

  try {
    // Validate input using helper functions
    if (!validUser(userNameInput)) throw new Error("Invalid username");
    if (!validPass(passwordInput)) throw new Error("Invalid password");

    const userCollection = await users(); // Access MongoDB collection

    // Retrieve the user by username
    const user = await userCollection.findOne({
      username: userNameInput.toLowerCase(),
    });

    if (!user) throw new Error("Invalid username or password");

    // Compare passwords using bcrypt
    const match = await bcrypt.compare(passwordInput, user.password);
    if (!match) throw new Error("Invalid username or password");

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id.toString() }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
