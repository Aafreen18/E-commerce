import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// Optional root route for health check
app.get("/", (req, res) => {
  res.send("✅ Image proxy server is running.");
});

// Image proxy route
app.get("/image", async (req, res) => {
  const imageUrl = decodeURIComponent(req.query.url);
  console.log("🔗 Fetching image:", imageUrl);

  try {
    const response = await axios.get(imageUrl, {
      responseType: "stream",
    });

    // Set content type based on original image
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Stream the image back to the client
    response.data.pipe(res);
  } catch (err) {
    console.error("❌ Image fetch failed:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });

    res.status(500).send("Image fetch failed.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
