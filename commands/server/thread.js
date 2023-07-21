const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
module.exports = {
    name: "thread",
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
        let intro = new Discord.MessageEmbed()
        .setColor(client.config.colorthemecode)
        .setTitle("Learn with me !")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`
        Here you will be able to discover with me the world of development.
        > We will start with the bases of JavaScript and then used the Discord API.

        - You will be able to create orders and events.
        - Used a database.
        - Create an incredible bot!

        > We meet in your channel to discover all of this.`)
        .setImage("https://i.imgur.com/yszFIxE.jpg")
        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
        message.channel.send({embeds: [intro]});
        message.delete()
        
    },
};