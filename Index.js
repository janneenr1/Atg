import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ ATG-proxy är igång! Använd /api/games/:type/:date");
});

app.get("/api/games/:type/:date", async (req, res) => {
  const { type, date } = req.params;
  const url = `https://api.atg.se/v1/games/${type}/${date}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `ATG API-fel ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Serverfel: " + error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 ATG-proxy körs på port ${port}`));
