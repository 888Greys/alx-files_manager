/*
Inside the folder utils, create a file db.js that contains the class DBClient.

DBClient should have:

the constructor that creates a client to MongoDB:
host: from the environment variable DB_HOST or default: localhost
port: from the environment variable DB_PORT or default: 27017
database: from the environment variable DB_DATABASE or default: files_manager
a function isAlive that returns true when the connection to MongoDB is a success otherwise, false
an asynchronous function nbUsers that returns the number of documents in the collection users
an asynchronous function nbFiles that returns the number of documents in the collection files
After the class definition, create and export an instance of DBClient called dbClient
*/

import { MongoClient } from 'mongodb';
// import { MongoClient } from 'mongodb/lib/mongo_client';

class DBClient {
  // A class with basic connection to a mongodb server
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}/${database}`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client = client;
    this.client.connect();
    this.db = client.db(database);
  }

  // checks if the mongoddb is connected
  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    try {
      const users = await this.db.collection('users').countDocuments();
      return users;
    } catch (err) {
      throw new Error(`Unable to get number of users ${err.message}`);
    }
  }

  async nbFiles() {
    try {
      const files = await this.db.collection('files').countDocuments();
      return files;
    } catch (err) {
      throw new Error(`Unable to get number of files ${err.message}`);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
