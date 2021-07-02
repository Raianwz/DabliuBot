const Discord = require('discord.js');
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}


module.exports.run = async (client, message, args) => {
    const user = message.author;
    const val = ['-1','0','+1']
    let atributo = -1;
    switch (Number(args)) {
        case 1:
        case +1:
            atributo = 1
            break;
        case 2:
        case +2:
            atributo = 2
            break
        case 3:
        case +3:
            atributo = 3
        break 
        default:
            atributo = 0;
            break;
    }
    //valores[Math.floor(Math.random() * valores.length)]
    let n1 = val.sample(),n2 = val.sample(),n3= val.sample(),n4 = val.sample();
    let rsp = Number(n1) + Number(n2) + Number(n3) + Number(n4) + atributo
 
    if(atributo > 0){
        message.channel.send(`<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}] com +${atributo}\n **Total: ${rsp}**`)
    }else{
        message.channel.send(`<:HmmNote:858691453513105429> ${user.toString()} Você rolou: [${n1}, ${n2}, ${n3}, ${n4}]\n **Total: ${rsp}**`)
    }
    
    //message.channel.send(`<:HmmNote:858691453513105429>${user.toString()} Você rolou: ${val1} , ${val2} , ${val3} e ${val4}`);
};