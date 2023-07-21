const Discord = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["cls"],
    cooldowns: 3000,
    description: "Delete x message in channel",
    usage: "50",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["MANAGE_MESSAGE"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        let nb = args[0];
        if(nb > 90) return message.reply("You cannot delete more than 90 messages!").then(m => {
            setTimeout(() => {
                if(m.deletable) m.delete()
            }, 5000);
        })
        message.react('<a:valid:1050383469953421342>')
        setTimeout(() => {
            message.channel.bulkDelete(args[0])
        }, 2000);
    },
};