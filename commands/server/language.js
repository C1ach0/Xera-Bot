const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
const { MessageActionRow, MessageButton, ButtonStyle, MessageEmbed, Events } = require('discord.js');

module.exports = {
    name: "language",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `Guild_${message.guildId}`
        })
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('LangEnglish')
                    .setLabel('English')
                    .setStyle(1),
                new MessageButton()
                    .setCustomId('LangFrench')
                    .setLabel('French')
                    .setStyle(1),
            );
		const embed = new MessageEmbed()
			.setColor(client.config.colorthemecode)
			.setTitle('Choose your language')
        let msg = message.channel.send({embeds: [embed], components: [row]})
        msg.then(async m => {
            await db.set("WelcomeLanguageId", m.id);
        })
        message.delete();
    },
};