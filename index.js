const { Client, Intents } = require('discord.js');
const dotenv = require("dotenv")
const config = require("./config.json");
if (process.env.NODE_ENV != 'production') { dotenv.config() }
const secret = process.env.TOKEN
const client = new Client({ intents: ["GUILDS","GUILD_MESSAGES"] });


client.on('ready', () => {
    client.user.setActivity('!Dados & FRIFAS', ({ type: "PLAYING" }))
    console.log("Estou online")
    console.log(`Bot iniciado em ${client.channels.cache.size} canais de ${client.guilds.cache.size} servidores`)
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return
    if (message.content.startsWith(config.prefix) && message.content.length > 3) {
        const args = message.content
            .trim().slice(config.prefix.length)
            .split(/ +/g);
        const comando = args.shift().toLocaleLowerCase();
        if (comando == "dados") {
            callCmd(client, message, args, comando)
        }
    }
})
client.login(secret)

function callCmd(client, message, args, comando) {
    try {
        const comandoFile = require(`./comandos/${comando}.js`)
        comandoFile.run(client, message, args);
    } catch (err) {
        console.log(`Algo deu errado!\nErro:${err}`)
    }
}