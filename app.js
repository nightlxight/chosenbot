var fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const yaml = require('js-yaml');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('./resources/application/token.json');
const { client_id } = require('./resources/application/client_id.json');
const { guild_id } = require('./resources/application/guild_id.json');
const path = require('path');
const { activityFunction } = require('./lib/activity/activity.js');

const { activity, activityError, activityType } = yaml.load(fs.readFileSync(path.join(__dirname, './lib/activity/activity-status.yml')));
const { activityTypeFunction } = require('./lib/activity/activityType.js');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    try {
        let { onReadySuccessful } = require('./resources/onReady/successful/successful.json');
        console.log(`${onReadySuccessful}`);
    } catch (error) {
        let { onReadyErr} = require('./resources/onReady/err/err.json');
        console.warn(`${onReadyErr}`); // * console.error(`${onReadyErr}`);
        console.error(error);
    };
    try {
        const { status } = yaml.load(fs.readFileSync(path.join(__dirname, './lib/activity/activity-status.yml')));
        const { statusFunc } = require('./lib/activity/status.js');
        client.user.setStatus(`${status}`);
        statusFunc();
    } catch (error) {
        let { statusError } = yaml.load(fs.readFileSync(path.join(__dirname, './lib/activity/activity-status.yml')));
        console.warn("e");
        console.error(error);
    };
    try {
        client.user.setActivity(`${activity}`), { type: `${activityType}`};
        activityFunction();
        activityTypeFunction();
    } catch (error) {
        console.warn(`${activityError}`);
        console.error(error);
    };
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: "❌ There was an error!", ephemeral: true });
    }
});

client.login(token);