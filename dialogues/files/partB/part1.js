// In the first place, we must import the discord.js bookstore to be able to use discord features
const Discord = require('discord.js');
// Then we will create a new Discord customer.js who will allow us to communicate with the Discord API.
const client = new Discord.Client({intents: 3276799}); // The Inteents are important to recover the information (new member for example.)

/* Script
***************************/

/* Function that will be performed when the bot is ready. */
client.on("ready", () => {
    console.log("Bot online !")
})

//Connection of the bot to the Discord server.
client.login("bot_token")