const Discord = require("discord.js");
const {partie} = require('../../dialogues/Loader')
const {QuickDB} = require('quick.db')
module.exports = {
   name: "go",
   description: "Continue learning",
   type: "CHAT_INPUT",
   /**
    * 
    * @param {Discord.Client} client 
    * @param {Discord.CommandInteraction} interaction 
    * @param {string[]} args 
    */
   run: async (client, interaction, args) => {
      if(interaction.channel.isThread()) {
         const db = new QuickDB({
            'table': `Guild_${interaction.guild.id}`
         })
         let progress = await db.get(`User_${interaction.member.user.id}.progress`)
         let lang = await db.get(`User_${interaction.member.user.id}.language`)
         let embed = new Discord.MessageEmbed()
         .setColor('#124071')
         .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({dynamic: true}))
         .setTitle('Continue learning')
         .setTimestamp();
         interaction.followUp({ embeds: [embed] });
         setTimeout(() => partie[progress].RUN(lang, interaction), 500);
      }
   },
};
