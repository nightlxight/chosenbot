var fs = require('fs');
const {errorMessage} = require('./err.json');

function errFunction() {
    console.log(`${errorMessage}`);
    console.error(error);
};

module.exports = {errFunction};