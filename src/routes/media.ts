import multer, { type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import config from "@/node-zoro-cms.config";

const mediaRoot = path.resolve(process.cwd(), config.mediaDir);

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const uploadDir = path.join(mediaRoot, year.toString(), month);

    // Ensure directory exists
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const timestamp = Date.now();
    cb(null, `${base}-${timestamp}${ext}`);
  },
});

export const upload = multer({ storage });
