const Discord = require('discord.js');
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.every = function (element) { return typeof element === 'number'; };

module.exports.run = async (client, message, args) => {
    const user = message.author;
    const val = ['-1', '0', '+1']
    let atributo = 0, calc = 0;
    let emote = "<:HmmNote:919290616490360852>"

    //filtrando argumentos
    if (args.length == 1) {
        Number(args) <= 8 ? atributo = Number(args) : atributo = 0;
    }
    //filtrando argumentos multiplos e checando se são números
    if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            calc += Number(args[i])
            if (isNaN(calc)) {
                return message.channel.send(`🤡 ${user.toString()} Digite apenas números e evite espaços entre os sinais de + e - em um número.`)
            }
        }
    }

    let n1 = val.sample(), n2 = val.sample(), n3 = val.sample(), n4 = val.sample();
    let rsp = Number(n1) + Number(n2) + Number(n3) + Number(n4) + atributo + calc

    if (atributo > 0) {
        message.channel.send(`${emote} ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] com +${atributo}\n **Total: ${rsp}**`)
    }
    else if (calc > 0) {
        message.channel.send(`${emote} ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] com +${calc}\n **Total: ${rsp}**`)
    }
    else {
        message.channel.send(`${emote} ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}]\n **Total: ${rsp}**`)
    }
};
