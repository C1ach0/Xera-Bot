const client = require('../index')
client.on("messageCreate", async (message) => {
    // Si le message est un message de la bot, on ne fait rien.
    if(message.author.bot) return

    //On crée un prefix
    const prefix = "!"

    // A l'aide du contenu du message, on détermine la commande :
    let command = message.content.toLowerCase().split(" ")[0].substring(1);

    // On détermine le contenu du message sans le prefix et sans la commande.
    let args = message.content.slice(prefix.length + command.length).trim().split(" ")

    if(command == "ping") {
        message.channel.send("pong")
        console.log(args)
    }
})

const invitess = []
client.on('ready', async() => {
    // client.guilds.cache.forEach(f => {
    //     console.log(f)
        
    // })
})