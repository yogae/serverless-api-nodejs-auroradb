const awsServerlessExpress = require('aws-serverless-express')
const app = require('../app');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const server = awsServerlessExpress.createServer(app);
  return new Promise((resolve, reject) => {
    awsServerlessExpress.proxy(server, event, {
      ...context,
      succeed: process.env.IS_OFFLINE ? context.succeed : resolve,
    });
  });
};