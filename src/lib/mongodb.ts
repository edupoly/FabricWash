import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalWithMongoose = global as typeof globalThis & { mongooseCache?: Cache };
const cache = globalWithMongoose.mongooseCache ?? { conn: null, promise: null };
globalWithMongoose.mongooseCache = cache;

export async function connectDB() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || "fabric-wash" });
  cache.conn = await cache.promise;
  return cache.conn;
}
