
'use strict'

const awsIot    = require('aws-iot-device-sdk');

module.exports = (config) => {
  return awsIot.device(config.deviceOptions);
};
