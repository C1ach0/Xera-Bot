const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "rules",
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
        let role = args[0];
        let value = {
            button: [{
                    name: "rules",
                    roleId: role
                },
            ]
        }
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rules')
                    .setLabel('OK')
                    .setStyle(1),
            );
		const embed = new Discord.MessageEmbed()
			.setColor(client.config.colorthemecode)
			.setTitle('Rules')
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(`
        > **1.** No spamming or advertising.
        > **2.** No insults or threats.
        > **3.** No NSFW content.
        
        []~(￣▽￣)~*
        > Just Dev & Chill
        `)
            .setFooter("Click on the button for accept Rules.")
            .setTimestamp();
        let msg = message.channel.send({embeds: [embed], components: [row]})
        msg.then(async m => {
            await db.set(`${m.id}_btnR`, value);
        })
        message.delete();

    },
};