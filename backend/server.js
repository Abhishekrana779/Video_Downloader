import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://video-downloader-1-ckzg.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests such as Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/video", videoRoutes);

app.get("/", (req, res) => {
  res.send("Video Downloader API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
