import { MongoClient } from 'mongodb';
import process from 'process';

if (!process.env.MONGODB_BASE_URI) {
  throw new Error('Add Mongo URI to .env');
}

const dbName = process.env.MONGODB_DATABASE
const uri = process.env.MONGODB_BASE_URI+'/'+dbName;
const options = {};

async function getConnection() {
  const client = new MongoClient(uri, options);
  const connectionPromise = await client.connect();
  return connectionPromise.db(process.env.dbName);
}

export {
  getConnection
};