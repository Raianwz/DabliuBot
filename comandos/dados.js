Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.every = function (element) { return typeof element === 'number'; };

module.exports.run = async (client, message, args) => {
    const user = message.author, val = ['-1', '0', '+1']
    let atributo = 0, calc = 0, msg = '';
    let emote = "<:HmmNote:915409970328121374>"
    
    if (args.length == 1) Number(args) <= 8 ? atributo = Number(args) : atributo = 0;
    if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            calc += Number(args[i])
            if (isNaN(calc)) { return message.reply(`🤡 ${user.toString()} Digite __apenas números__, não use letras ou caracteres especiais \`()@#$&,*\` e __evite espaços__ entre os operadores **+** e **-** \`-1\` \`+1\`.`) }
        }
    }
    const getMsg = (value) => {
        value === atributo & value > 0 ? value = `com +${atributo}` : false
        value === calc & value > 0 ? value = `com +${calc}` : false
        if (value === null || value === 0) value = ''
        let n1 = val.sample(), n2 = val.sample(), n3 = val.sample(), n4 = val.sample();
        let rsp = Number(n1) + Number(n2) + Number(n3) + Number(n4) + atributo + calc
        return msg = `${emote} ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] ${value}\n **Total: ${rsp}**`
    }
    atributo > 0 ? getMsg(atributo) : getMsg(calc)
    await message.reply({ content: msg });
};

