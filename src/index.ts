import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { addAction, doAction } from "@/lib/hooks";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
import apiRouter from "./routes";

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "working" });
});

app.get("/api", apiRouter);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`http://localhost:${PORT}`);
  }

  doAction("init", () => console.log("Initialized"));
});
