const client = require("../index");
const { QuickDB } = require('quick.db')
const { Permissions, MessageEmbed } = require('discord.js')

client.on('guildMemberRemove', async (member) => {
    const db = new QuickDB({
        'table': `Guild_${member.guild.id}`
    });
    let Threading = await db.get("ServerSettings.Threading");
    const thread = member.guild.channels.cache.get(Threading).threads.cache.find(x => x.name === `${member.user.id}'s bot`)
    if(thread) {
        thread.delete(`${member.user.username} leave guild.`)
    }
})


let pVoice = [];
client.on("voiceStateUpdate", async (oldState, newState) => {
    let db = new QuickDB({
        "table": `Guild_${oldState.guild.id}`
    });
    let chx = await db.get("tempoVoice");
    let channel = oldState.guild.channels.cache.get(chx)
    if (!channel) return
    if (newState.channelId != channel.id) return
    let member = newState.member
    if (member.user.bot) return
    newState.guild.channels.create(`δ- ${member.user.username}`, {
        "parent": newState.channel.parentId,
        "type": "GUILD_VOICE",
        "reason": `${member.user.tag} just created a temporary voice channel.`,
        "userLimit": 10,
        "permissionOverwrites": [
            {
                id: member.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },{
                id: "1050099829352710254",
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },{
                id: "1050160592591274059",
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },
        ],
    }).then(m => {
        pVoice.push(m.id)
        member.voice.setChannel(m);
    })

});
client.on("voiceStateUpdate", async (oldState, newState) => {
    try {
        if (!oldState.channel.name.startsWith("δ- ")) return
    } catch (e) {
        if (!pVoice.includes(oldState.channelId)) return
    }
    if (oldState.channel.members.size == 0) {
        oldState.channel.delete("More members in the temporary channel")
    }
});
client.on("ready", async () => {
    client.guilds.cache.get(client.config.TestingServerID).channels.cache.forEach(f => {
        try {
            if (!f.name.startsWith("δ- ")) return
        } catch (e) {
            if (!pVoice.includes(f.id)) return
        }
        try {
            if (f.members.size == 0) {
                f.delete("More members in the temporary channel")
            }
        } catch (error) {
            console.log("Unable to delete the channel with the name: ", f.name)
        }
    })
});

client.on('guildMemberAdd', async member => {
    let db = new QuickDB({
        'table': `Guild_${member.guild.id}`
    })
    let chx = await db.get('GuildMemberAddWelcomer');
    if(!chx) return
    let embed = new MessageEmbed()
    .setColor(client.config.colorthemecode)
    .setAuthor(`Welcome ${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
    member.guild.channels.cache.get(chx).send({embeds: [embed]})
})