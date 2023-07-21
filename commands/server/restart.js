const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "restart",
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
        });
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ErrorChannelButton')
                    .setLabel('Restart')
                    .setStyle(1)
            );
		const embed = new Discord.MessageEmbed()
			.setColor(client.config.colorthemecode)
			.setTitle('Do you have a problem with your channel?')
            .setDescription("- Click here to re-create the channel.\n- Clique ici pour re-créer le salon.")
        let msg = message.channel.send({embeds: [embed], components: [row]})
        msg.then(async m => {
            await db.set("ChannelErrorId", m.id);
        })
        message.delete();
    },
};