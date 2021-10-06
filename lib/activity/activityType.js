var fs = require('fs');
const { Client, Collection, Intents } = require('discord.js')
const yaml = require('js-yaml');
const path = require('path');
const { activityType } = yaml.load(fs.readFileSync(path.join(__dirname, './activity-status.yml')));

function activityTypeFunction() {
    console.log(`Activity` + " " + "type" + ":" + " " + activityType);
};

module.exports = {activityTypeFunction};