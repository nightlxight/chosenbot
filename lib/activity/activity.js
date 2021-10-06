var fs = require('fs');
const { Client, Collection, Intents } = require('discord.js')
const yaml = require('js-yaml');
const path = require('path');
const { activity } = yaml.load(fs.readFileSync(path.join(__dirname, './activity-status.yml')));

function activityFunction() {
    console.log(`Activity` + ":" + " " + activity);
};

module.exports = {activityFunction};