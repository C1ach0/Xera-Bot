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

client.on("messageCreate", async (message) => {
    // If the message is a message from the bot, we do nothing.
    if(message.author.bot) return

    // We create a prefix
    const prefix = "!"

    // Using the content of the message, the command is determined:
    let command = message.content.toLowerCase().split(" ")[0].substring(1);

    /* toLowerCase() => We put the content of the message in tiny. (Ping = ping)
    *  split(" ") => We separate the content of the message into a table.(Hello mister = ["hello", "mister"])
    *  substring(1) => We remove the first
    */

    // We determine the content of the message without the prefix and without the order.
    let args = message.content.slice(prefix.length + command.length).trim().split(" ")
    /* slice(number) => We remove the number of characters indicated.
    *  trim() => We remove the spaces at the start and end of the message.
    */ 

    // Let us now create the first command called "Ping" and which will return "Pong"
    if(command == "ping") {
        message.channel.send("pong")
    }

    if(command == "say") {
        message.channel.send(args.join(" "))
    }
})


//Connection of the bot to the Discord server.
client.login("bot_token")