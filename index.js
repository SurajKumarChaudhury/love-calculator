import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Use Render-compatible port

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite Database Setup
let db;
const initDB = async () => {
  db = await open({
    filename: path.join(__dirname, "loveCalculator.db"),
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS loveresults (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boy TEXT NOT NULL,
      girl TEXT NOT NULL,
      percentage INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend"))); // ✅ Serve static files

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.post("/result", async (req, res) => {
  const boy = req.body.boyName;
  const girl = req.body.girlName;
  const lovePercentage = Math.floor(Math.random() * 101);

  try {
    await db.run(
      "INSERT INTO loveresults (boy, girl, percentage) VALUES (?, ?, ?)",
      [boy, girl, lovePercentage]
    );

    res.render("result", {
      boy: boy,
      girl: girl,
      percentage: lovePercentage,
    });
  } catch (error) {
    console.error("❌ Failed to save result:", error.message);
    res.status(500).send("Something went wrong!");
  }
});

// Start server only after DB is initialized
const startServer = async () => {
  await initDB(); // ✅ Initialize DB before listening
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};

startServer();
