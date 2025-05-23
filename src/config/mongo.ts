import mongoose from "mongoose";

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
    if (this.connection && this.connection.readyState === 1) {
      console.log("Already connected to MongoDB.");
      return;
    }

    try {
      await mongoose.connect(this.connectionString!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      this.connection = mongoose.connection;

      this.connection.on("connected", () => console.log("MongoDB connected."));
      this.connection.on("error", (err) =>
        console.error("MongoDB Error:", err)
      );
      this.connection.on("disconnected", () =>
        console.log("MongoDB disconnected.")
      );
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      throw new Error(error?.message);
    }
  }

  async endConnection(): Promise<void> {
    if (!this.connection || this.connection.readyState === 0) {
      console.log("No active MongoDB connection to close.");
      return;
    }

    try {
      await mongoose.disconnect();
      console.log("MongoDB Connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      throw new Error(error?.message);
    }
  }
}

const mongodb = new Mongo("your-mongodb-connection-string");
export { mongodb };