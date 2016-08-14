#!/usr/bin/env node

'use strict'

const _               = require('lodash');
const awsIot          = require('aws-iot-device-sdk');
const configHelper          = require('./config');
const deviceFactory   = require('./deviceFactory');
const moistureFactory = require('./moistureFactory');

let configFilePath = process.argv[2] || './config.json';

const config = configHelper.get(configFilePath);
const device = deviceFactory(config);

const moisture = moistureFactory(config, device);

device
  .on('connect', function() {
    console.log('connect');
    moisture.startPublishing();
  });

device
  .on('reconnect', function() {
     console.log('reconnect');
     moisture.startPublishing();
  });

device
  .on('close', function() {
     console.log('close');
     moisture.stopPublishing();
  });
device
  .on('offline', function() {
     console.log('offline');
     moisture.stopPublishing();
  });
device
  .on('error', function(error) {
     console.log('error', error);
     moisture.stopPublishing();
  });
device
  .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
  });
