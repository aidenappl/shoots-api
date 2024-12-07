const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test DB connection
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database", err.stack));

// Import routes
const userRoutes = require("./routes/user");

// Use routes
app.use("/user", userRoutes);

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Shoots server is running on port ${port}`);
});
