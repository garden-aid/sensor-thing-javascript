
'use strict'

const generator     = require('./generator');

const interval = 1000 * 60 * 1; // one minute

module.exports = function(config, device) {
  const topic = config.topicPrefix + '/soil/moisture';

  let lastLevel = 3;
  let timout = null;

  function publish(level, callback) {
    console.log('Publishing level', level);

    const options = {};
    const message = JSON.stringify({
      DeviceId: 'test-js-device',
      Recorded: (new Date()).toISOString(),
      Level: level
    });

    device.publish(topic, message, options, callback);
  }

  function publishRandomLevel(onPublish) {
    const level = generator(lastLevel);
    publish(level, onPublish);
  }

  function startPublishing(onPublish) {
    stopPublishing();
    console.log('Starting publishing...');
    
    publishRandomLevel(onPublish);

    timout = setInterval(function() {
      publishRandomLevel(onPublish)
    }, interval);
  }

  function stopPublishing() {
    if(timout) {
      console.log('Stopping publishing');
      clearInterval(timout);
    }
  }

  return {
    publish: publish,
    startPublishing: startPublishing,
    stopPublishing: stopPublishing,
  };
}
