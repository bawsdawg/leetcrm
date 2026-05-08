import mongoose from "mongoose";

/** @type {{ promise: Promise<typeof mongoose> | null }} */
const globalForMongoose = globalThis;

if (!globalForMongoose.mongoConnectPromise) {
  globalForMongoose.mongoConnectPromise = { promise: null };
}

const g = globalForMongoose.mongoConnectPromise;

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI — add your MongoDB connection string to the environment.",
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  if (!g.promise) {
    g.promise = mongoose.connect(uri);
  }
  await g.promise;
  return mongoose;
}
