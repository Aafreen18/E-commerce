import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

app.get("/image", async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "stream",
      timeout: 10000, // 10 seconds timeout
    });

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers["content-type"] || "image/jpeg");

    response.data.pipe(res);
  } catch (error) {
    console.error("Image proxy error:", error.message);
    res.status(500).json({ error: "Failed to fetch image", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ CORS proxy running at http://localhost:${PORT}`);
});
