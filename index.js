const { Client, Collection, Intents, Message, DiscordAPIError } = require("discord.js");
// Import Discord.Js.
const client = new Client({
   intents: 3276799,
   partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
   shards: "auto"
});
// const client2 = new Client({
//    intents: 3276799,
//    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
//    shards: "auto"
// });
// Make New Discord Client.
module.exports = client;
// module.exports = client2;
// Export Client To Give Other Files Access.
const chalk = require("chalk");
// Import Chalk

// ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.config = require("./botconfig/main.json");
client.db = require('quick.db');
require("./handler")(client);

// client2.commands = new Collection();
// client2.aliases = new Collection();
// client2.cooldowns = new Collection();
//require('./handler2')(client2)
// Initializing the project.

client.log = /**@param {string} shell @param {Message} message*/ async function console(message, shell) {
   message.reply(`\`\`\`shell
   ${shell}
   \`\`\``)
}

// ———————————————[Logging Into Client]———————————————
// const tok = client.config.clienttoken2
// if(!tok) {
//    throw new Error("Second bot oken not found")
// } else {
//    client2.login(tok)
// }
const token = process.env["clienttoken"] || client.config.clienttoken;
if(token === ""){
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Invalid Token")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(chalk.magenta("There Are 3 Ways To Fix This"));
   console.log(
      chalk.blue("Put Your ") + chalk.red("Bot Token ") + chalk.blue("in:")
   );
   console.log(
      chalk.yellow.bold("1.) ") +
         chalk.cyan("index.js") +
         chalk.gray(
            " On the client.login line remove client.login(token) and write client.login('Your token')"
         )
   );
   console.log(
      chalk.yellow.bold("2.) ") +
         chalk.cyan("ENV/Secrets") +
         chalk.gray(
            " If using replit, make new secret named 'clienttoken' and put your token in it else, if your using VsCode, Then Follow Some ENV tutorials (I don't suggest using it in VSC)"
         )
   );
   console.log(
      chalk.yellow.bold("3.) ") +
         chalk.cyan("main.json ") +
         chalk.gray(
            'Go To botconfig/main.json, Find The Line with client.token and put "client.token":"Your Bot Token"'
         )
   );
   console.log(
      chalk.green.bold("Still Need Help? Contact Me:\n") +
         chalk.yellow.italic("Discord: DrakeZee#5223\n") +
         chalk.yellow.italic("Discord Server: dsc.gg/botsway")
   );
} else {
   client.login(token);
   console.log("\n\n" ,chalk.white("["),
   chalk.green.bold("Login"),
   chalk.white("]"),
   chalk.gray(" : "),
   chalk.white.bold("Bot started")
   );
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Multiple Resolves")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(type, promise, reason);
});

