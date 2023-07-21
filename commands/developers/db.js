const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "db",
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
        if(args[0] == "set") { 
            await db.set(args[1], args[2]) 
            return await message.react('✅') 
        } else if(args[0] == "delete") {
            await db.delete(args[1]) 
            return await message.react('✅') 
        }else if(args[0] == "get") {
            return message.reply(`
\`\`\`json
${JSON.stringify(await db.get(args[1]))}\`\`\``)
        }
    },
};