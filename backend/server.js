const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

const validUser = process.env.VALIDUSER;
const validPassword = process.env.VALIDPASSWORD;

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
};

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

app.post("/addData", async (req, res) => {
  const {
    code,
    code_description,
    dataStructure,
    dataStructure_level,
    leetcode_link,
    problem_name,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO problems (problem_name, leetcode_link, dataStructure_level, dataStructure, code_description, code)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        problem_name,
        leetcode_link,
        dataStructure_level,
        dataStructure,
        code_description,
        code,
      ]
    );

    res.status(201).json({
      message: "Data successfully appended to the database",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error faced during appending of data to DB", error);
    res.status(500).json({ error: "Failed to append data to database" });
  }
});

app.post("/login", (req, res) => {
  console.log("login request", req.body);
  const { user, password } = req.body;
  if (user === validUser && password === validPassword) {
    const token = generateToken(user);
    return res.status(200).json({ message: "Login successful", token });
  } else {
    console.log("Invalid credentials:", user, password);
    return res
      .status(401)
      .json({ message: "Invalid credentials, please try again." });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided." });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

// Example of a protected route that requires JWT
app.get("/protected", authenticateJWT, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
