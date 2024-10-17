import express from "express";
import routes from "./routes/index.js"; // Use modular route configuration

const app = express();
const PORT = 3000;

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply routes using the constructor method from routes/index.js
routes(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
