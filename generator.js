
'use strict'

const maxLevel = 6;
const minLevel = 0;

const smoothedRange = 1;
const windowSize = smoothedRange * 2;

function getRange(lastLevel) {
  const range = {
    max: lastLevel + smoothedRange,
    min: lastLevel - smoothedRange,
  };

  if(range.max > maxLevel) {
    range.max = maxLevel;
    range.min = maxLevel - windowSize;
  }

  if(range.min < minLevel) {
    range.min = minLevel;
    range.max = minLevel + windowSize;
  }

  return range;
}

function getRandomLevel(min, max) {
    return Math.random()*(max-min+1)+min;
}

module.exports = (lastLevel) => {
  const range = getRange(lastLevel);
  return getRandomLevel(range.min, range.max);
};
