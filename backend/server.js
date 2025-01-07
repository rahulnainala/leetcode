const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then(() => console.log("Connected to the PostgreSQL database on AWS RDS"))
  .catch((err) => console.error("Connection error", err.stack));

app.get("/api/problems/:dataStructure", async (req, res) => {
  const { dataStructure } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM problems WHERE datastructure = $1",
      [dataStructure]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching problems by datastructure:", err);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
