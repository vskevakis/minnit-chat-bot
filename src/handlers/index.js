const fs = require('fs');
const path = require('path');

const handlers = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const handlerName = path.basename(file, '.js');
    handlers[handlerName] = require(`./${file}`);
  }
});

module.exports = handlers;
