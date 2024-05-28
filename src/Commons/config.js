const { URL } = require('url');
const fs = require('fs');

const nodeEnv = process.env.NODE_ENV;
let path;

if (nodeEnv === 'test') {
  path = '.test.env';
} else if (nodeEnv === 'development') {
  path = '.development.env';
} else {
  path = '.env';
}

require('dotenv').config({ path });
// const databaseUrl = process.env.DATABASE_URL;
// const parsedUrl = new URL(databaseUrl);
const config = {
  app: {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
    debug: process.env.NODE_ENV === 'development' ? { request: ['error'] } : {},
  },
  database: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
      require: true,
    },
    // ssl: {
    //   rejectUnauthorized: true,
    //   ca: fs.readFileSync(parsedUrl.searchParams.get('sslrootcert'))
    // }
  },
  security: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
  },
};

module.exports = config;
