const {errFunction} = require('./resources/deploy/err/err.js');
const {successfulFunction} = require('./resources/deploy/successful/successful.js');
var fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./resources/application/token.json');
const { client_id } = require('./resources/application/client_id.json');
const { guild_id } = require('./resources/application/guild_id.json');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(client_id, guild_id),
			{ body: commands },
		);

		successfulFunction();
	} catch (error) {
        errFunction();
		console.error(error);
	}
})();