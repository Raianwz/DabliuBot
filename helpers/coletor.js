
let item;
module.exports = async (btn, inter, userID, msg) => {
    let okay = true;

    btn === null || inter === null || userID === null || msg === null || msg === '' ?
        okay = false : okay

    if (okay === false) return console.log('Algo está faltando')

    const filter = i => i.customId === btn && i.user.id === userID;
    const collector = inter.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter, time: 30 * 1000, max: 3 });
    collector.on('collect', async i => {
        if (i.customId === btn || i.user.id === userID) {
            await i.deferUpdate();
        }
    });
    collector.on('end', collected => console.log(`Coletados: ${collected.size}`));
}