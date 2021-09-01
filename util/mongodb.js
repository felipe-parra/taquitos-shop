import { MongoClient } from "mongodb";
import config from "../config";

const MONGO_URI = config.dbUriMongo;
const MONGO_DB = config.dbMongoName;

// check the MongoDB URI
if (!MONGO_URI) {
  throw new Error("Define the MONGO_URI envirmental variable");
}

// check the MongoDB DB
if (!MONGO_URI) {
  throw new Error("Define the MONGO_DB enviromental variable");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cached
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedDb,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGO_URI, opts);
  await client.connect();
  let db = client.db(MONGO_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
