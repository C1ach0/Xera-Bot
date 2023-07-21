const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "command",
    aliases: ["cmd"],
    cooldowns: 3000,
    description: "Create the command of the statement",
    usage: "script",
    toggleOff: false,
    developersOnly: false,
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
        let webhook = await db.get(`User_${message.member.user.id}.webhook`)
        if(!webhook) return message.reply("Vous n'avez pas d'application contacter un adminitrateur.")
        const conn = Discord.WebhookClient({
            id: webhook.id,
            token: webhook.token
        })
        if(args.includes("webhook" || "console.log" || "" || "" || "")) {
            message.reply("Un mot ou une fonction est bloqué par l'adminitrateur")
        }
        conn.send({
            content: ``,
            embeds: []
        })
        message.channel.bulkDelete

        
        
    },
};