const Discord = require('discord.js');
const {
    QuickDB
} = require('quick.db')

const rowContinue = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId('FinishedPart99')
        .setLabel('Continue')
        .setStyle(3)
    );

module.exports = {

    // Welcomer
    part1: {
        /**
         * @param {string} lang
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            let Threading = await db.get("ServerSettings.Threading") || "1049665268365922334";
            const rowStart = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setCustomId('FinishedPart99')
                    .setLabel('Start !')
                    .setStyle(3)
                );

            if (lang == "French") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                **__Bienvenue pour apprendre à créer un bot discord__**\n
                > Je vais vous suivre tout au long de votre aventure pour vous aider à développer votre bot.\n
                > Pour ce tutoriel vous allez avoir besoin de : 
                - NodeJS latest
                - Un IDE (Visual Studio Code, Replit, ...)
                \n
                > Vous allez aussi pouvoir intéragir avec moi pour apprendre.
                `)
                    .setImage('https://cdn.discordapp.com/attachments/970741484842266644/1049658340554330182/123Z_2101.w020.n001.946B.p15.946.jpg')
                    .setTimestamp();
                if (message.guild.channels.cache.find(channel => channel.name === `${message.member.user.id}'s bot`)) return;
                message.guild.channels.cache.get(Threading).threads.create({
                    name: `${message.member.user.id}'s bot`,
                    autoArchiveDuration: 60,
                    type: 'GUILD_PRIVATE_THREAD',
                    reason: `Development learning for ${message.member.user.username}`
                }).then(async (thread) => {
                    thread.send({
                        embeds: [embed],
                        components: [rowStart]
                    })
                    setTimeout(async () => await thread.members.add(message.member.user.id), 1000)
                }).catch(e => console.log(e))
            } else if (lang == "English") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                **__Welcome for learning to create a discord bot__**\n
                > I will follow you throughout your adventure to help you develop your bot.\n
                > For this tutorial you will need:
                - NodeJS latest
                - An IDE (Visual Studio Code, Replit, ...)
                \n
                > You will also be able to interact with me to learn.
                `)
                    .setImage('https://cdn.discordapp.com/attachments/970741484842266644/1049658340554330182/123Z_2101.w020.n001.946B.p15.946.jpg')
                    .setTimestamp();

                if (message.guild.channels.cache.find(channel => channel.name === `${message.member.user.id}'s bot`)) return;
                message.guild.channels.cache.get(Threading).threads.create({
                    name: `${message.member.user.id}'s bot`,
                    autoArchiveDuration: 60,
                    type: 'GUILD_PRIVATE_THREAD',
                    reason: `Development learning for ${message.member.user.username}`
                }).then(async (thread) => {
                    thread.send({
                        embeds: [embed],
                        components: [rowStart]
                    })
                    setTimeout(async () => await thread.members.add(message.member.user.id), 1000)
                }).catch(e => console.log(e))
            }
        }
    },

    // Javascript & JSON file
    part2: {
        /**
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            let Threading = await db.get("ServerSettings.Threading") || "1049665268365922334";
            if (lang == "French") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle("Les Fichiers en Javascript")
                    .setDescription(`
                __Commençons avec les base du JavaScript__\n

                > Pour démarrer, il faut que je vous explique comment fonction du JavaScript.
                > Cela vous permettra de découvrir les bases du langage.

                La première chose à faire avant de commencé un programme est de l'initialisé :
                \`\`\`shell
npm init\`\`\`
                On remplis les informations. Ne vous en faites pas elle ne sont pas obligatoire. 
                Vous pouvez laissé les valeurs par défaut.

                Ensuite nous pouvons enfin installer des modules
                \`\`\`shell
npm install discord.js\`\`\`

                Ensuite nous allons créer notre premier fichier.
                Il dois être nommé : \`index.js\`
                `)
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                __Les fichiers JSON__\n
                > Les fichiers en .json sont beaucoup utilisé en JS, ils servent à stocker des informations.
                > Nous allons par exemple stocker le token du bot dedans.
                
                Le fichier doit toujours commencé par : \`{\` et finir par : \`}\`.
                \`\`\`json
{
    "token": "tokenDuBot",
    "prefix": "!"
}\`\`\`
                `)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed, embed2],
                    components: [rowContinue]
                })
            } else if (lang == "English") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                __Let's start with the base of JavaScript__\n

                > To start, I have to explain to you how JavaScript function.
                > This will allow you to discover the basics of language.
                
                The first thing to do before starting a program is initialized:
                \`\`\`shell
npm init\`\`\`
                We fill the information. Don't worry, they are not compulsory.
                You can leave the default values.

                Then we can finally install modules
                \`\`\`shell
npm install discord.js\`\`\`

                Then we will create our first file.
                He must be appointed: \`index.js\`
                \n
                We will finally be able to start your first bot.
                `)
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`
                __JSON files__\n
                > The .json files are used a lot in JS, they are used to store information.
                > For example, we are going to store the Bot's token in it.
                
                The file must always start with: \`{\` And finish with: \`}\`.
                \`\`\`json
{
    "token": "tokenOfBot",
    "prefix": "!"
}\`\`\`
                `)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed, embed2],
                    components: [rowContinue]
                })
            }
        }
    },

    // Javascript Base
    part3: {
        /**
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            const a = 1,
                b = 2;
            let Threading = await db.get("ServerSettings.Threading") || "1049665268365922334";
            if (lang == "French") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle("Javascript")
                    .setDescription(`
                __Commençons avec les base du JavaScript__\n
                *Le texte après les "//" sont des anotations*\n

                > Le JavaScript est un language Web donc est utilisé sur internet, que ce soit pour les sites ou pour des api.
                > Il est utilisé pour faire des applications web, des applications mobile et des robots qui utilisent des API (Discord.js, Twitch...).
                \n
                Nous allons voir quelques exemples de fonctions et comment utiliser le JavaScript:
                \`\`\`js
// Les variables : 
// Les variables sont des espaces dans lequel on peut stocker des données. 
// Pour déclarer une variable, on utilise le mot clé "var", "let", ou "const".
// "var" est une variable global, tandis que "let" et "const" se limitent à leur bloc d'instruction.

const a = 1, b = 4;
// Pour accéder à la console on fait : 
console.log(a + b) // Et ensuite l'argument dedans
// = 5
                
//---------------------------
// Les conditions : 
// Pour déclarer une condition, on utilise le mot clé "if" et "else"
if(a == b) {
    console.log("'a' est égal à 'b'")
} else {
    //..
}

//---------------------------
// Les Fonctions :
// Pour déclarer une fonction, on utilise le mot clé "function" et le nom de la fonction.
// On peut aussi déclarer des arguments dans la fonction.
// Et la mettre async pour dire que la fonction est asynchrone.
function addition(a, b) {
    return a + b;
}

// Pour appeler une fonction, on fais :
const a = 3, b = 4;
const result = addition(a, b);
console.log(result)
// = 7\`\`\`
                `)
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setDescription(`**__Les opérateurs :__**\n
                    Plus d'informations : [Expressions et opérateurs](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators)
                    `)
                    .addFields({
                        name: '**Les Opérations Basiques :**',
                        value: '_ _'
                    }, {
                        name: 'AND',
                        value: '&&',
                        inline: true
                    }, {
                        name: 'OR',
                        value: '||',
                        inline: true
                    }, {
                        name: 'if else',
                        value: 'a = true ? "yes" : "no"',
                        inline: true
                    }, {
                        name: "there isn't",
                        value: '!',
                        inline: true
                    }, {
                        name: '**Les Opérations Avancés :**',
                        value: '_ _'
                    }, {
                        name: 'x = f',
                        value: 'x = f',
                        inline: true
                    }, {
                        name: 'x += f',
                        value: 'x = x + f',
                        inline: true
                    }, {
                        name: 'x -= f',
                        value: 'x = x - f',
                        inline: true
                    }, )
                const embed3 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setDescription(`
                Allons un peu plus loin..
                \`\`\`js
// Faire un appel de module :
const Discord = require('discord.js')

// ou les fichier en que nous créons 
const client = require('./index.js')
module.export = require('./rosy.js') // Dans d'autres besoins

// Exporter un module
module.export = {
    function addition(a, b) {
        return a + b;
    },

    // ou par ex ☺

    name: "help",
    description: "Affiche les commandes du bot",
    run: async (client, message, args) => {

    }
}\`\`\`
                **Voila nous connaissons enfin un peu mieux le langage Javascript.**
                Nous allons pouvoir commencer et entrer completement dedans.
                `)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed, embed2, embed3],
                    components: [rowContinue]
                })
            } else if (lang == "English") {
                const embed = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle("Javascript")
                    .setDescription(`
                __Let's start with the base of JavaScript__\n
                *The text after the "//" are annotations*\n

                > JavaScript is a web language so is used on the internet, whether for sites or for APIs.
                > It is used to make web applications, mobile applications and robots that use APIs (Discord.js, Twitch ...).
                \n
                We will see some examples of functions and how to use JavaScript:
                \`\`\`js
// The variables : 
// Variables are spaces in which data can be stored.
// To declare a variable, we use the keyword "var", "let", or "const".
// "var" is a global variable, while "let" and "const" are limited to their instruction block.

const a = 1, b = 4;
// To access the console we do:
console.log(a + b) // And then the argument in
// = 5
                
//---------------------------
// Conditions :
// To declare a condition, we use the keyword "If" and "Else"
if(a == b) {
    console.log("'a' is equal to 'b'")
} else {
    //..
}

//---------------------------
// The Functions :
// To declare a function, we use the keyword "Function" and the name of the function.
// We can also declare arguments in the function.
// And put it async to say that the function is asynchronous.
function add(a, b) {
    return a + b;
}

// To call a function, we do:
const a = 3, b = 4;
const result = add(a, b);
console.log(result)
// = 7\`\`\`
                `)
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setDescription(`**__The operators :__**\n
                    More information : [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
                    `)
                    .addFields({
                        name: '**Basic operations:**',
                        value: '_ _'
                    }, {
                        name: 'AND',
                        value: '&&',
                        inline: true
                    }, {
                        name: 'OR',
                        value: '||',
                        inline: true
                    }, {
                        name: 'if else',
                        value: 'a = true ? "yes" : "no"',
                        inline: true
                    }, {
                        name: "there isn't",
                        value: '!',
                        inline: true
                    }, {
                        name: '**Advanced operations:**',
                        value: '_ _'
                    }, {
                        name: 'x = f',
                        value: 'x = f',
                        inline: true
                    }, {
                        name: 'x += f',
                        value: 'x = x + f',
                        inline: true
                    }, {
                        name: 'x -= f',
                        value: 'x = x - f',
                        inline: true
                    }, )
                const embed3 = new Discord.MessageEmbed()
                    .setColor('#124071')
                    .setDescription(`
                Let's go a little further.
                \`\`\`js
// Make a module call:
const Discord = require('discord.js')

// or the files as we create
const client = require('./index.js')
module.export = require('./rosy.js') // In other needs

// Export a module
module.export = {
    function addition(a, b) {
        return a + b;
    },

    // or exemple ☺

    name: "help",
    description: "Displays the BOT commands",
    run: async (client, message, args) => {

    }
}\`\`\`
                **Here we finally know a little better JavaScript language.**
                We will be able to start and enter completely into it.
                `)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed, embed2, embed3],
                    components: [rowContinue]
                })
            }
        }
    },

    // Create WebHooks bot for user
    part4: {
        /**
         * @param {Discord.Message} message
         */
        RUN: async function start(lang, message) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            let Threading = await db.get("ServerSettings.Threading") || "1049665268365922334";
            if (lang == "French") {
                let embed = new Discord.MessageEmbed()
                    .setColor("#124071")
                    .setTitle("Creation d'un bot")
                    .setDescription(`Nous allons créer une application avec vous pour continuer l'aventure.\n
                **Faite la commande** \`°app <NomDeVotreApp>\`\nAttention, vous ne pourrez pas changer !`)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed]
                })
            } else if (lang == "English") {
                let embed = new Discord.MessageEmbed()
                    .setColor("#124071")
                    .setTitle("Creation of a robot")
                    .setDescription(`We will create an application with you to continue the adventure.\n
                **Do the command** \`°app <NameOfYourApp>\`\nBe careful, you will not be able to change!`)
                    .setTimestamp();
                let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
                thread.send({
                    embeds: [embed]
                })
            }
        }
    },

    webH: {
         /**
         * @param {Discord.Message} message
         */
        create: async function create(lang, message, appName) {
            const db = new QuickDB({
                'table': `Guild_${message.guild.id}`
            })
            const rowNext = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setCustomId('FinishedPart99')
                    .setLabel('Next Chapter')
                    .setStyle(3)
                );
            let Threading = await db.get("ServerSettings.Threading") || "1049665268365922334";

            let thread = message.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${message.member.user.id}'s bot`)
            if(lang == "French") {
                let web = await db.get(`User_${message.member.user.id}.webhook.id`);
                let embedb = new Discord.MessageEmbed()
                .setColor('#124071')
                .setDescription(`
                Nous allons enfin commencer le prochain chapitre.\n
                > Pour cela vous allez directement interagir avec l'application que l'on a créée il y a peu.
                > Vous aurez des réponses ou du script à écrire pour l'utiliser.
                `)
                .setTimestamp();
                
                if(!web) {
                    message.guild.channels.cache.get(Threading).createWebhook(appName, {
                        avatar: 'https://i.imgur.com/AfFp7pu.png',
                    }).then(async webhook => {
                        await db.set(`User_${message.member.user.id}.webhook.id`, webhook.id)
                        await db.set(`User_${message.member.user.id}.webhook.token`, webhook.token)
                        let embeda = new Discord.MessageEmbed()
                        .setColor("#124071")
                        .setTitle(appName)
                        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                        .setDescription(`**Votre application a été créée avec succès.**`)
                        .setTimestamp();
                        thread.send({
                            embeds: [embeda, embedb],
                            components: [rowNext]
                        })
                    })
                } else {
                    let emb = new Discord.MessageEmbed()
                    .setColor("#124071")
                    .setDescription("Vous avez déjà un bot.")
                    thread.send({
                        embeds: [emb, embedb],
                        components: [rowNext]
                    })
                }
            } else if (lang == "English") {
                let web = await db.get(`User_${message.member.user.id}.webhook.id`);
                let embedb = new Discord.MessageEmbed()
                .setColor('#124071')
                .setDescription(`
                We will finally start the next chapter.\n
                > For this you will go directly to interact with the application that we have created recently.
                > You will have answers or script to write to use it.
                `)
                .setTimestamp();
                
                if(!web) {
                    message.guild.channels.cache.get(Threading).createWebhook(appName, {
                        avatar: 'https://i.imgur.com/AfFp7pu.png',
                    }).then(async webhook => {
                        await db.set(`User_${message.member.user.id}.webhook.id`, webhook.id)
                        await db.set(`User_${message.member.user.id}.webhook.token`, webhook.token)
                        let embeda = new Discord.MessageEmbed()
                        .setColor("#124071")
                        .setTitle(appName)
                        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                        .setDescription(`**Your application has been successfully created.**`)
                        .setTimestamp();
                        thread.send({
                            embeds: [embeda, embedb],
                            components: [rowNext]
                        })
                    })
                } else {
                    let emb = new Discord.MessageEmbed()
                    .setColor("#124071")
                    .setDescription("You already have a bot.")
                    thread.send({
                        embeds: [emb, embedb],
                        components: [rowNext]
                    })
                }
            }
        }
    }

};