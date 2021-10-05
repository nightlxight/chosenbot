var fs = require('fs');
const { successfulMessage } = require('./successful.json');

function successfulFunction() {
    console.log(`${successfulMessage}`);
};

module.exports = { successfulFunction };