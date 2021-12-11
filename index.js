const { Client, Intents } = require('discord.js');
const dotenv = require("dotenv")
const config = require("./config.json");
if (process.env.NODE_ENV != 'production') { dotenv.config() }
const secret = process.env.TOKEN
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.on('ready', () => {
    client.user.setActivity('!Dados & FRIFAS', ({ type: "PLAYING" }))
    console.log("Estou online")
    console.log(`Bot iniciado em ${client.channels.cache.size} canais de ${client.guilds.cache.size} servidores`)
})

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return
    if (message.content.startsWith(config.prefix) && message.content.length > 2) {
        const args = message.content
            .trim().slice(config.prefix.length)
            .split(/ +/g);
        const comando = args.shift().toLocaleLowerCase();
        if (comando == "dados" || comando == "roll" || comando == "dd") {
            let cmd = comando
            cmd !== "dados" ? cmd = "dados" : cmd
            callCmd(client, message, args, cmd)
        }
    }
})
client.login(secret)

// client.on('interactionCreate', async interaction => {
//     if (!interaction.isButton()) return;
//     const comandoFile = require(`./comandos/intDados.js`)
//     let customNum = (num, cLabel) => {
//         let temp = cLabel.replace('Dados','')
//         num = Number(temp)
//         console.log(num)
//         return num;
//     }

//     let inter = interaction.component.type
//     if( inter === 'BUTTON'){
//         let btn = await interaction.component.customId, num = 0;
//         let cLabel = await interaction.component.label;
//         btn === 'roll' ? num = 0 : false
//         btn === 'roll1' ? num = 1 : false
//         btn === 'roll2' ? num = 2 : false
//         btn === 'roll3' ? num = 3 : false
//         btn === 'rollC' ? num = customNum(num,cLabel): false
//         await comandoFile.run(client, interaction, `${num}`);
//         return
//     }else{
//         interaction.message.reply({ content: `<:DankMan:858715889343004702> ${interaction.message.author} Algo deu errado, use o **!dados**`})
//     }

// });

function callCmd(client, message, args, comando) {
    try {
        const comandoFile = require(`./comandos/${comando}.js`)
        comandoFile.run(client, message, args);
    } catch (err) {
        console.log(`Algo deu errado!\nErro:${err}`)
    }
}