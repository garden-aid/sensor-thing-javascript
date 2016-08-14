
'use strict'

module.exports.get = (configFilePath) => {
  if(!configFilePath.startsWith('/') && !configFilePath.startsWith('./')) {
    configFilePath = './' + configFilePath;
  }

  const config = require(configFilePath);

  return config;
};
