var fs = require('fs');
const {errorMessage} = require('./err.json');

function errFunction() {
    console.log(`${errorMessage}`);
};

module.exports = {errFunction};