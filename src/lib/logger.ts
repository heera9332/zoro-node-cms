/**
 * @author @heera9331
 * @date 03-06-2025
 * @description Logging system
 */

import fs from "fs";
import path from "path";

/**
 * Logs a message to logs/{year}/{month}/{YYYY-MM-DD}.txt.
 * @param message The message to log (will be prefixed with timestamp).
 */
export function debugLog(message: unknown) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01-12
  const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

  // Now includes month in the folder path
  const logDir = path.join(process.cwd(), "logs", String(year), month);
  const logFile = path.join(logDir, `${dateStr}.txt`);
  const time = now.toISOString().slice(11, 19); // HH:mm:ss

  // Prepare message with time
  const logLine = `[${time}] ${formatLogValue(message)}\n`;

  // Ensure the directory exists
  fs.mkdirSync(logDir, { recursive: true });

  // Append the log line to the file
  fs.appendFileSync(logFile, logLine, { encoding: "utf8" });
}

/**
 * Serializes any log value to a readable string.
 */
function formatLogValue(value: unknown): string {
  if (value instanceof Error) {
    return `${value.name}: ${value.message}\n${value.stack}`;
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2); // Pretty JSON for objects/arrays
    } catch {
      return String(value);
    }
  }
  return String(value);
}
