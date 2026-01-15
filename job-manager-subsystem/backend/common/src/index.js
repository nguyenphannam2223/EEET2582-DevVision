// Errors
const CustomError = require('./errors/custom-error');
const BadRequestError = require('./errors/bad-request-error');

// Middlewares
const errorHandler = require('./middlewares/error-handler');

// Database
const BaseRepository = require('./database/base-repository');

// Messaging
const kafkaWrapper = require('./messaging/kafka-wrapper');

module.exports = {
  CustomError,
  BadRequestError,
  errorHandler,
  BaseRepository,
  kafkaWrapper,
};
