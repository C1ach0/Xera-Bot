const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const mainjson = require("../botconfig/main.json");
const chalk = require("chalk");


module.exports = async (client2) => {
    // ———————————————[Commands]———————————————
    const commandFiles = await globPromise(`${process.cwd()}/commands2/**/*.js`);
    commandFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
  
      if (file.name) {
        const properties = { directory, ...file };
        client2.commands.set(file.name, properties);
      }
    });

    // ———————————————[Events]———————————————
    const eventFiles = await globPromise(`${process.cwd()}/events2/*.js`);
    eventFiles.map((value) => require(value));
}