const Discord = require('discord.js');
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.every = function (element) { return typeof element === 'number'; };

module.exports.run = async (client, message, args) => {
    const user = message.author;
    const val = ['-1', '0', '+1']
    let atributo = 0, calc = 0;

    //filtrando argumentos
    if (args.length == 1) {
        Number(args) <= 8 ? atributo = Number(args) : atributo = 0;
    }
    //filtrando argumentos multiplos e checando se são números
    if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            calc += Number(args[i])
            if (isNaN(calc)) {
                return message.channel.send(`<:peepoClown:858694142124752917> ${user.toString()} Digite apenas números e evite espaços entre + e o - em um número(+1,-1).`)
            }
        }
    }

    let n1 = val.sample(), n2 = val.sample(), n3 = val.sample(), n4 = val.sample();
    let rsp = Number(n1) + Number(n2) + Number(n3) + Number(n4) + atributo + calc

    if (atributo > 0) {
        message.channel.send(`<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] com +${atributo}\n **Total: ${rsp}**`)
    }
    else if (calc > 0) {
        message.channel.send(`<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] com +${calc}\n **Total: ${rsp}**`)
    }
    else {
        message.channel.send(`<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}]\n **Total: ${rsp}**`)
    }
};