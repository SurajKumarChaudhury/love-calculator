import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg"; // PostgreSQL client
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL Setup
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }, // ✅ Needed for Render PostgreSQL
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS loveresults (
        id SERIAL PRIMARY KEY,
        boy TEXT NOT NULL,
        girl TEXT NOT NULL,
        percentage INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Connected to PostgreSQL and table is ready");
  } catch (err) {
    console.error("❌ Failed to connect or create table:", err.message);
  }
};

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.post("/result", async (req, res) => {
  const boy = req.body.boyName;
  const girl = req.body.girlName;
  const lovePercentage = Math.floor(Math.random() * 101);

  try {
    await pool.query(
      "INSERT INTO loveresults (boy, girl, percentage) VALUES ($1, $2, $3)",
      [boy, girl, lovePercentage]
    );

    res.render("result", {
      boy,
      girl,
      percentage: lovePercentage,
    });
  } catch (error) {
    console.error("❌ Failed to save result:", error.message);
    res.status(500).send("Something went wrong!");
  }
});

// Start server after DB is ready
const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};

startServer();
