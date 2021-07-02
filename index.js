require("dotenv/config")
const Discord = require('discord.js');
const client = new Discord.Client()
const config = require("./config.json");
const secret = process.env.TOKEN

client.on('ready', () => {
    client.user.setActivity('!Dados & FRIFAS', ({ type: "PLAYING" }))
    console.log("Estou online")
    console.log(`Bot iniciado em ${client.users.cache.size} usuários, ${client.channels.cache.size},em ${client.guilds.cache.size} servidores`)
})

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return
    if (message.content.startsWith(config.prefix) && message.content.length > 3) {
        const args = message.content
            .trim().slice(config.prefix.length)
            .split(/ +/g);
        const comando = args.shift().toLocaleLowerCase();

        try {
            const comandoFile = require(`./comandos/${comando}.js`)
            comandoFile.run(client, message, args);
        } catch (err) {
            console.log(`Algo deu errado!\nErro:${err}`)
        }
    }
})

client.login(secret)
