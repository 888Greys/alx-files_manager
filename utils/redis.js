import { createClient } from 'redis';
import { promisify } from 'util';

// RedisClient should have:

// the constructor that creates a client to Redis:
// any error of the redis client must be displayed in the console (you should use on('error') of the redis client)
// a function isAlive that returns true when the connection to Redis is a success otherwise, false
// an asynchronous function get that takes a string key as argument and returns the Redis value stored for this key
// an asynchronous function set that takes a string key, a value and a duration in second as arguments to store it in Redis (with an expiration set by the duration argument)
// an asynchronous function del that takes a string key as argument and remove the value in Redis for this key
// After the class definition, create and export an instance of RedisClient called redisClient.
// 
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis client not connected to the server: ', err.message));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (err) {
      return (`Failed to get ${key}: ${err.messsage}`);
    }
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    try {
      await setAsync(key, value, 'EX', duration);
    } catch (err) {
      throw new Error(`Failed to set ${key}: ${err.messsage}`);
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key);
    } catch (err) {
      console.log(`Failed to delete ${key}: ${err.messsage}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
