import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
import apiRouter from "./routes";

app.get("/api", apiRouter);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`http://localhost:${PORT}`);
  }
});
