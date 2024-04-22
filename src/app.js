const nodeEnv = process.env.NODE_ENV;
let path;

if (process.env.NODE_ENV === 'development') {
  path = '.development.env';
} else if (process.env.NODE_ENV === 'test') {
  path = '.test.env';
} else {
  path = '.env';
}

require('dotenv').config({ path });
const createServer = require('./Infrastructures/http/createServer');
const container = require('./Infrastructures/container');

let server;

const start = async () => {
  server = await createServer(container);
  await server.start();
  // eslint-disable-next-line no-console
  console.log(`server start at ${server.info.uri}`);
};

// start();

module.exports = start;
