const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
const partA = require('../../dialogues/partA')
module.exports = {
    name: "app",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Create your application",
    usage: "name",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES"],
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
        let appName = args.join(' ');
        let lang = await db.get(`User_${message.member.user.id}.language`)
        partA.webH.create(lang, message, appName);
    },
};