const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

async function startServer() {
  try {
    await db.connect();
    console.log("Connected to the database");

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

startServer();