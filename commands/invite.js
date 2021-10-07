var fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const yaml = require('js-yaml');
const { random_color } = require('../util/colors/random/random.json');
const { inviteDescription } = require('../resources/invite/desc.yml');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription(`${inviteDescription}`),
    async execute(interaction) {
        let embed = new MessageEmbed()
            .setColor(random_color)
            .setTitle('Bot Invite Link')
            .setDescription('Invite link can be found below')
            .addField('Invite Link:', 'your bots invite link here', true) /* TO GET YOUR INVITE LINK, PLEASE GO TO https://discordapi.com/permissions.html */
            .setFooter(`${interaction.user.tag} | invite link`)
            .setTimestamp();
        function sendEmbedFunction() {
            try {
                return interaction.reply({ embeds: [embed] });
            } catch (error) {
                // * interaction.reply({content: "There was an error!"});
                console.error(error);
            };
        };
        let sendEmbed = () => {
            sendEmbedFunction();
        };

        sendEmbed(); // sends the embed
    },
};