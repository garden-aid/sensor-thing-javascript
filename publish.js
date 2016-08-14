#!/usr/bin/env node

'use strict'

const _               = require('lodash');
const awsIot          = require('aws-iot-device-sdk');
const configHelper          = require('./config');
const deviceFactory   = require('./deviceFactory');
const moistureFactory = require('./moistureFactory');

let configFilePath = process.argv[2] || './config.json';
const level = process.argv[3];

if(!level) {
  throw new Error('No level was supplied');
}

const config = configHelper.get(configFilePath);
const device = deviceFactory(config);

const moisture = moistureFactory(config, device);

device
  .on('connect', function() {
    console.log('connect');
    moisture.publish(level, (err, result) => {
      if(err) {
        console.log(err);
      }
      device.end();
    });
  });
