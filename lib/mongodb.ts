import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

const clientPromise =
  global._mongoClientPromise || (global._mongoClientPromise = client.connect());

export default clientPromise;
