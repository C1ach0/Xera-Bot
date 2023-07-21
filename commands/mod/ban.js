const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "ban",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "Ban a member from guild",
    usage: "@user",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["BAN_MEMBERS"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        let user = message.mentions.users.first()
        let reason = args.slice(1).join(" ") || "No reason."
        if (!user) return message.reply("Please mention a user to ban.")
        if (user == message.author) return message.reply("You can't ban yourself.")
        let uS = message.guild.members.cache.get(user)
        if (uS.roles.highest.position >= message.member.roles.highest.position) return message.reply("You can't ban someone with a higher role than you.")
        if (uS.bannable) {
            uS.ban({
                reason: `${message.author.username} // Reason: ${reason}`
            })
            message.react('<a:valid:1050383469953421342>')
        } else message.reply("I cannot ban this member.")
    },
};