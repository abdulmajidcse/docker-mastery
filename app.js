require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = process.env.APP_PORT || 3000;

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0,
  })
  .promise();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("This is my about page!");
});

app.get("/posts", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM posts");
    res.json({ data: rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
