/**
 * @date 03-06-2025
 * @author @heera9331
 * @description
 */

import mongoose from "mongoose";
import { debugLog } from "@/lib/logger";

class Mongo {
  private static instance: Mongo;
  private connection: mongoose.Connection | null = null;
  private connectionString: string | undefined;

  constructor(connectString: string) {
    if (!Mongo.instance) {
      this.connectionString = connectString;
      Mongo.instance = this;
    }
    return Mongo.instance;
  }

  async makeConnection(): Promise<void> {
    /** Already connected to MongoDB. */
    if (this.connection && this.connection.readyState === 1) {
      return;
    }

    try {
      await mongoose.connect(this.connectionString!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      this.connection = mongoose.connection;

      this.connection.on("connected", () => console.log("MongoDB connected."));
      this.connection.on("error", (err) => debugLog(["MongoDB Error:", err]));
      this.connection.on("disconnected", () =>
        console.log("MongoDB disconnected.")
      );
    } catch (error) {
      debugLog(["MongoDB Connection Error:", error]);
      /* @ts-ignore */
      throw new Error(error?.message);
    }
  }

  async endConnection(): Promise<void> {
    if (!this.connection || this.connection.readyState === 0) {
      debugLog("No active MongoDB connection to close.");
      return;
    }

    try {
      await mongoose.disconnect();
      debugLog("MongoDB Connection closed.");
    } catch (error) {
      debugLog(["Error closing MongoDB connection:", error]);
      /* @ts-ignore */
      throw new Error(error?.message);
    }
  }
}

const mongodb = new Mongo(process.env.DATABASE_URL!);
export default mongodb;
