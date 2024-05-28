/* istanbul ignore file */
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const config = require('../../Commons/config');

const logger = winston.createLogger({
  level: 'info', // Set the desired logging level
  format: winston.format.json(),
  transports: [],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
  }));

  logger.add(new winston.transports.File({ filename: 'debug.json' }));
}

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new WinstonCloudWatch({
      logGroupName: 'forum-group',
      logStreamName: 'forum-stream',
      awsOptions: {
        credentials: {
          accessKeyId: config.security.awsAccessKeyId,
          secretAccessKey: config.security.awsSecretKey,
        },
        region: config.security.awsRegion,
      },
    }),
  );
}

module.exports = logger;
