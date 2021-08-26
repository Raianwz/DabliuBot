const { MessageActionRow, MessageButton } = require('discord.js');
const coletor = require('../helpers/coletor')
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.every = function (element) { return typeof element === 'number'; };

module.exports.run = async (client, message, args) => {
    const user = message.author, val = ['-1', '0', '+1']
    let atributo = 0, calc = 0, msg = '';
    //filtrando argumentos
    if (args.length == 1) Number(args) <= 8 ? atributo = Number(args) : atributo = 0;

    //filtrando argumentos multiplos e checando se são números
    if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            calc += Number(args[i])
            if (isNaN(calc)) { return message.channel.send(`<:peepoClown:858694142124752917> ${user.toString()} Digite __apenas números__, não use letras ou caracteres especiais \`()@#$&,*\` e __evite espaços__ entre **+** e **-** \`-1\` \`+1\`.`) }
        }
    }
    const getMsg = (value) => {
        value === atributo & value > 0 ? value = `com +${atributo}` : false
        value === calc & value > 0 ? value = `com +${calc}` : false
        if (value === null || value === 0) value = ''
        let n1 = val.sample(), n2 = val.sample(), n3 = val.sample(), n4 = val.sample();
        let rsp = Number(n1) + Number(n2) + Number(n3) + Number(n4) + atributo + calc
        return msg = `<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] ${value}\n **Total: ${rsp}**`
    }
    atributo > 0 ? getMsg(atributo) : getMsg(calc)

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('roll')
                .setLabel('Dados')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('roll1')
                .setLabel('Dados +1')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll2')
                .setLabel('Dados +2')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll3')
                .setLabel('Dados +3')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('rollC')
                .setLabel(`Dados +4`)
                .setStyle('SECONDARY'),
        );
    await message.reply({ content: msg, ephemeral: true, components: [row] });
    await coletor('roll1', message, message.author.id, msg);
    await coletor('roll2', message, message.author.id, msg);
    await coletor('roll3', message, message.author.id, msg);
    await coletor('rollC', message, message.author.id, msg);
};

