import userRoutes from "./userroutes.js"; // Import user routes
import { static as staticDir } from "express"; // Optional for serving static files

const constructorMethod = (app) => {
  app.use("/users", userRoutes); // Use user routes under the /users path

  // Handle undefined routes
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
