const client = require("../index");
const {
   QuickDB
} = require('quick.db')
const Discord = require('discord.js')
const { partA, partB, partC, partie } = require('../dialogues/Loader')

client.on("interactionCreate", async (interaction) => {
   const db = new QuickDB({
      'table': `Guild_${interaction.guildId}`
   })
   // ———————————————[Slash Commands]———————————————
   if (interaction.isCommand()) {
      await interaction.deferReply({
         ephemeral: false
      }).catch(() => {});

      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd)
         return interaction.followUp({
            content: "An error has occured "
         });

      const args = [];

      for (let option of interaction.options.data) {
         if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
               if (x.value) args.push(x.value);
            });
         } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
         interaction.user.id
      );

      cmd.run(client, interaction, args);
   }
   // ———————————————[Buttons]———————————————
   if (interaction.isButton()) {


      // Welcome Language Choose
      let frenchRole = await db.get("ServerSettings.RoleFrench");
      let englishRole = await db.get("ServerSettings.RoleEnglish");
      let membersRole = await db.get("ServerSettings.RoleMembers");

      if (interaction.message.id == await db.get('WelcomeLanguageId')) {
         let user = interaction.guild.members.cache.get(interaction.user.id)

         if (interaction.customId == "LangEnglish") {
            // User would change language
            /* This is checking if the user has the role, if they do, it will send a message saying
            they already have the role and channel. */
            if (user.roles.cache.has(englishRole)) return interaction.reply({
               content: "You are already English",
               ephemeral: true
            });
            /* This is checking if the user has the role, if they do, it will send a message saying
            they already have the role and channel. */
            if (user.roles.cache.has(frenchRole)) {
               user.roles.remove(frenchRole)
               user.roles.add(englishRole);
               interaction.reply({
                  content: `Language defined in English. \n\n Your channel => ${interaction.member.user.id}'s bot\n\n If you don't have your channel go to <#1050123443187761173> for reset.`,
                  ephemeral: true
               })
            } else {
               // New User
               user.roles.add(englishRole)
               user.roles.add(membersRole)
               await db.set(`User_${interaction.user.id}.language`, 'English')
               partA.part1.RUN("English", interaction).then(() => {
                  interaction.reply({
                     content: `Language defined in English. \n\n Your channel => ${interaction.member.user.id}'s bot\n\n If you don't have your channel go to <#1050123443187761173> for reset.`,
                     ephemeral: true
                  })
               })
               db.set(`User_${interaction.user.id}.progress`, 1)
            }
         }

         if (interaction.customId == "LangFrench") {
            // User would change language
            /* This is checking if the user has the role, if they do, it will send a message saying
            they already have the role and channel. */
            if (user.roles.cache.has(frenchRole)) return interaction.reply({
               content: "Vous êtes déjà français",
               ephemeral: true
            });

            /* This is checking if the user has the role, if they do, it will send a message saying
            they already have the role and channel. */
            if (user.roles.cache.has(englishRole)) {
               user.roles.remove(englishRole)
               user.roles.add(frenchRole);
               interaction.reply({
                  content: `Langue changé en Français. \n\n Votre salon => ${interaction.member.user.id}'s bot\n\n Si vous n'avez pas votre salon aller dans <#1050123443187761173> pour le reset.`,
                  ephemeral: true
               })
            } else {
               // New User
               interaction.guild.members.cache.get(interaction.user.id).roles.add(frenchRole)
               user.roles.add(membersRole)
               await db.set(`User_${interaction.user.id}.language`, 'French')
               partA.part1.RUN("French", interaction).then(() => {
                  interaction.reply({
                     content: `Langue définie en français. \n\n Votre salon => ${interaction.member.user.id}'s bot\n\n Si vous n'avez pas votre salon aller dans <#1050123443187761173> pour le reset.`,
                     ephemeral: true
                  })
               })
               db.set(`User_${interaction.user.id}.progress`, 1)
            }
         }
      }

      if (interaction.message.id == await db.get("ChannelErrorId")) {
         let Threading = await db.get("ServerSettings.Threading")
         let lang = await db.get(`User_${interaction.member.user.id}.language`)
         if(!lang) {
            return interaction.reply({content: "Avant de faire cela, choisi ta langue -> <#1050099830027985058>", ephemeral: true})
         }
         let Desc = {
            "French": `Voila votre nouveau salon.
            Veuillez reprendre votre initiation à l'aide de la commande suivante :
            \`/go\``,
            "English": `Here is your new living room.
            Please resume your initiation using the following order:
            \`/go\``
         }
         let embed = new Discord.MessageEmbed()
            .setColor('#124071')
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({
               dynamic: true
            }))
            .setDescription(Desc[lang])
            .setTimestamp();

         let chx = interaction.guild.channels.cache.find(channel => channel.name === `${interaction.member.user.id}'s bot`)
         if (chx) {
            chx.delete().then(() => {
               interaction.guild.channels.cache.get(Threading).threads.create({
                  name: `${interaction.member.user.id}'s bot`,
                  autoArchiveDuration: 60,
                  type: 'GUILD_PRIVATE_THREAD',
                  reason: `Development learning for ${interaction.member.user.username} [Re-create]`
               }).then(async (thread) => {
                  thread.send({
                     embeds: [embed]
                  })
                  await thread.members.add(interaction.member.user.id)
                  interaction.reply({
                     content: "Votre salon va être re-créer.",
                     ephemeral: true
                  })
               })
            })
         } else {
            interaction.guild.channels.cache.get(Threading).threads.create({
               name: `${interaction.member.user.id}'s bot`,
               autoArchiveDuration: 60,
               type: 'GUILD_PRIVATE_THREAD',
               reason: `Development learning for ${interaction.member.user.username} [Re-create]`
            }).then(async (thread) => {
               thread.send({
                  embeds: [embed]
               })
               await thread.members.add(interaction.member.user.id)
               interaction.reply({
                  content: "Votre salon va être créer",
                  ephemeral: true
               })
            })
         }
      }

      /* This is a button reaction that is used to continue the user's progress. */
      if (interaction.channel.isThread()) {
         if (interaction.customId == "FinishedPart99") {
            let blocked = await db.get("LimitedPart.part")
            let owned = await db.get("LimitedPart.owner")
            let Language = await db.get(`User_${interaction.user.id}.language`)
            let progressA = await db.get(`User_${interaction.user.id}.progress`)
            if(owned) {
               if(interaction.user.id == client.config.developerID[0]) {
                  await db.add(`User_${client.config.developerID[0]}.progress`, 1)
                  let progressB = await db.get(`User_${client.config.developerID[0]}.progress`)
                  partie[progressB].RUN(Language, interaction);
                  let msg = interaction.reply('_ _')
                  msg.then(setTimeout(() => interaction.deleteReply(), 50))
                  return;
               }
            }
            if(progressA >= blocked){
               return interaction.reply({content: "Pas de suite pour le moment."})
            }
            await db.add(`User_${interaction.user.id}.progress`, 1)
            let progressB = await db.get(`User_${interaction.user.id}.progress`)
            partie[progressB].RUN(Language, interaction);
            let msg = interaction.reply('_ _')
            msg.then(setTimeout(() => interaction.deleteReply(), 50))
         }
      }

      //Role Button
      let database = await db.all()
      for (const a of database) {
         if (a.id == `${interaction.message.id}_btnR`) {
            // Need This templates : 
            // let a = { id: "a", value: { 
            //    button: [
            //    {name: "", roleId: ""},
            //    {name: "", roleId: ""},
            //    {name: "", roleId: ""},
            //    ],
            //    unique: true
            //} }
            let user = interaction.guild.members.cache.get(interaction.user.id)
            a.value.button.forEach(i => {
               if (i.name == interaction.customId) {
                  // if br is unique selection then 
                  // if(a.value.unique) {
                  //    let allRoleInBtnR = []; // Create Array of all role in button reaction
                  //    allRoleInBtnR.push(i.roleId) // Ajouter tout les roles
                  //    user.roles.cache.forEach(role => {
                  //       if(allRoleInBtnR.includes(role.id)) {
                  //          user.roles.remove(role.id)
                  //          user.roles.add(i.roleId)
                  //          interaction.reply({ content: `Role ${role.name} removed & ${interaction.guild.roles.cache.get(i.roleID).name} added`, ephemeral: true })
                  //       } else {
                  //          user.roles.add(i.roleId)
                  //          interaction.reply({ content: `Role ${role.name} added`, ephemeral: true })
                  //       }
                  //    }) 
                  // } // Else if br isn't unique selection then
                  // else
                  //  {
                  if (user.roles.cache.has(i.roleId)) {
                     user.roles.remove(i.roleId)
                     let role = interaction.guild.roles.cache.get(i.roleId)
                     interaction.reply({
                        content: `Role ${role.name} removed`,
                        ephemeral: true
                     })
                  } else {
                     user.roles.add(i.roleId)
                     let role = interaction.guild.roles.cache.get(i.roleId)
                     interaction.reply({
                        content: `Role ${role.name} added`,
                        ephemeral: true
                     })
                  }
                  //}
               }
            })
         }
      }

   }
   // ———————————————[Select Menu]———————————————
   if (interaction.isSelectMenu()) {}
   // ———————————————[Context Menu]———————————————
   if (interaction.isContextMenu()) {
      await interaction.deferReply({
         ephemeral: false
      });
      const command = client.slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
   }
});

