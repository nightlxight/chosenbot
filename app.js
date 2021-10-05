var fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const yaml = require('js-yaml');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('./resources/application/token.json');
const { client_id } = require('./resources/application/client_id.json');
const { guild_id } = require('./resources/application/guild_id.json');
const path = require('path');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const command of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log("The bot is ready!");
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