const {Discord, MessageEmbed } = require("discord.js");
module.exports = {
   name: "eval",
   aliases: ["e"],
   cooldowns: 3000,
   description: "Evaluate Code",
   usage: "<code>",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   description: "Evaluate a given code!",

   /**
    * 
    * @param {Discord.Client} client 
    * @param {Discord.Message} message 
    * @param {string[]} args 
    */
   run: async (client, message, args) => {
      try {
         if(args[0] == "-a") {
            args.shift();
            let code = args.join(" ")
            if (!code) {
               return message.channel.send("Please Provide A code to eval!");
            }
            let evaled = eval(code);
            
            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            return client.log(evaled)

         } else {
            const code = args.join(" ");
            if (!code) {
               return message.channel.send("Please Provide A code to eval!");
            }
            let evaled = eval(code);
            
            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            
            let embed = new MessageEmbed()
            .setAuthor("Eval", message.author.avatarURL())
            .addField("Input", `\`\`\`${code}\`\`\``)
            .addField("Output", `\`\`\`${evaled}\`\`\``)
            .setColor("BLUE");
            
            message.channel.send({ embeds: [embed] });
         }
      } catch (err) {
         message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
      }
   },
};