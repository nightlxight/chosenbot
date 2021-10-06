require('@discordjs/builders');
require('@discordjs/rest');
require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
var fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { status } = yaml.load(fs.readFileSync(path.join(__dirname, './activity-status.yml')));
function statusFunc() {
    console.log(`Status: ${status}`);
}

module.exports = {statusFunc};