/**
 * @author @heera9331
 * @date 03-06-2025
 * @description file uploading
 */

// lib/multer.ts
import multer from "multer";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// ESM-compatible __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, "../../temp");

fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");

    const uploadPath = path.join(__dirname, "../../", "uploads", year, month);

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // preserves .zip, .jpg, etc.
    const base = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${base}-${timestamp}${ext}`);
  },
});

const upload = multer({ storage });
const tempUpload = multer({ dest: "temp/" });

export { tempUpload, upload };
