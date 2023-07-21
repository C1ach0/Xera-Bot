const Discord = require('discord.js');
const { QuickDB } = require('quick.db')
const rowContinue = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId('FinishedPart99')
        .setLabel('Continue')
        .setStyle(3)
    );

module.exports = {

    // 5
    //Create Client & Start Bot
    part1: {
        /**
         * @param {string} lang
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            let Threading = await db.get("ServerSettings.Threading");
            let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)

            //  French
            if (lang == "French") {
                const embedA = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                __Commençons avec Discord__\n
                *Le texte après les "//" sont des anotations*
                \`\`\`js
// En premiers lieux, nous devons importé la librairie Discord.js pour pouvoir utiliser les fonctionnalités de Discord
const Discord = require('discord.js');
// Ensuite nous allons créer un nouveau client Discord.js qui va nous permettre de communiquer avec l'api Discord.
const client = new Discord.Client({intents: 3276799}); // Les intents sont importants pour récuperer les informations (nouveau membre par exemple.)

// code..

//Connection du bot au serveur Discord.
client.login("token du bot")\`\`\`
                Nous avons écrit la première partie du code.
                
                Maintenant votre bot est fonctionnel.
                Mais il nous manque encore les commandes et des évènements pour l'utilisé.
                `)
                const embedB = new Discord.MessageEmbed()
                .setColor('#124071')
                .setDescription(`
                Ajoutons un premier évnement pour savoir dans la console quand est-ce que le bot est connecté.
                Pour cela nous allons appeler l'évènement "ready".

\`\`\`js
/* Fonction qui sera exécutée lorsque le bot sera prêt. */
client.on("ready", () => {
    console.log("Bot en ligne")
})\`\`\`

                `)
                let file = new Discord.MessageAttachment("./dialogues/files/partB/part1.js", "index.js");
                thread.send({
                    embeds: [embedA, embedB],
                    components: [rowContinue]
                }).then( async () => {
                    await thread.send({
                        files: [file]
                    })
                })
            } else if (lang == "English") {
                const embedA = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                __Let's start with Discord__\n
                *The text after the "//" are annotations*
                \`\`\`js
// In the first place, we must import the Discord .js bookstore to be able to use discord features
const Discord = require('discord.js');
// Then we will create a new Discord customer.js who will allow us to communicate with the Discord API.
const client = new Discord.Client({intents: 3276799}); // The Inteents are important to recover the information (new member for example.)

// code..

//Connection of the bot to the Discord server.
client.login("bot_token")\`\`\`
                We wrote the first part of the code.
                
                Now your bot is functional.
                But we still lack orders and events for used it.
                `)
                const embedB = new Discord.MessageEmbed()
                .setColor('#124071')
                .setDescription(`
                Add a first event to find out in the console when the bot is connected.
                For this we will call the "Ready" event.

\`\`\`js
/* Function that will be performed when the bot is ready. */
client.on("ready", () => {
    console.log("Bot online !")
})\`\`\`

                `)
                let file = new Discord.MessageAttachment("./dialogues/files/partB/part1.js", "index.js");
                thread.send({
                    embeds: [embedA, embedB],
                    components: [rowContinue]
                }).then( async () => {
                    await thread.send({
                        files: [file]
                    })
                })
            }
        }
    },

    // 6
    // Create Event and Send first Message
    part2: {
        /**
         * @param {string} lang
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            let Threading = await db.get("ServerSettings.Threading");
            let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
            if(lang == "French") {
                const embedA = new Discord.MessageEmbed() 
                .setColor('#124071')
                .setAuthor(message.member.user.username, message.member.user.displayAvatarURL(ture))
                .setDescription(`
                __Première commande__\n
                \`\`\`js
// Commençons par appeller l'évènement "messageCreate".
client.on("messageCreate", async (message) => {
    // Si le message est un message de la bot, on ne fait rien.
    if(message.author.bot) return

    //On crée un prefix
    const prefix = "!"

    // A l'aide du contenu du message, on détermine la commande :
    let command = message.content.toLowerCase().split(" ")[0].substring(1);
    /* toLowerCase() => On met le contenu du message en minuscule. ( Ping  = ping )
    *  split(" ") => On sépare le contenu du message en un tableau. ( Bonjour monsieurs = ["Bonjour", "monsieurs"] )
    *  substring(1) => On enlève le premier 
    */

    // On détermine le contenu du message sans le prefix et sans la commande.
    let args = message.content.slice(prefix.length + command.length).trim().split(" ")
    /* slice(number) => On enlève le nombre de caractères indiqué.
    *  trim() => On enlève les espaces en début et fin du message.
    *  
    *  args est un array [], un tableau. Pour obtenir le premier élement de ce tableau on utilise args[0]
    *  puis args[1] pour le second et ainsi de suite...
    *  pour lier tout les élements dans un tableau on utilise la méthode join()
    *  args.join(" ") avec un espace on dit que chaque élements du tableau seront lié avec un espace.
    *  s'il n'y a rien sa sort "Bonjourmonieur"
    *  s'il y a un espace dans le message, il sort "Bonjour monsieur"
    */ 

    // Créons maintenant la première command qui s'appelera "ping" et qui retournera "pong"
    if(command == "ping") {
        message.channel.send("pong")
    }
})\`\`\`
                Nous venons de créer la commande "!ping".
                `)
                let embedB = new Discord.MessageEmbed()
                .setColor('#124071')
                .setDescription(`
                J'aimerais que vous créer la commande "say".
                Elle doit pouvoir envoyer le message que vous ecrivez ensuite.
                par example: \`!say Bonjour monsieur\`
                le bot répondra : \`Bonjour monsieur\`

                pour faire cela vous allez avoir besoin d'utilisé les arguments qui sont dans un tableau
                vous avez déjà toutes les connaissances dites au dessus pour reussir cette objectif.

                lorsque vous êtes prêt/e faite la commandes : \`°cmd 
                votre script ici\`
                
                
                `)


            } else if (lang == "English") {

            }

        }
    },

    // 7
    //
    part3: {
        /**
         * @param {string} lang
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {

        }
    },


}