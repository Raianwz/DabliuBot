module.exports = async function localColector(interaction) {
    let msg = interaction.message.content, userID = interaction.message.author

    const Lfilter = i => i.customId === interaction.customId && i.user.id === userID;

    const collector = interaction.message.channel.createMessageComponentCollector({ componentType: 'BUTTON', Lfilter, time: 30 * 60 * 1000 });

    collector.on('collect', async i => {
        if (i.customId === 'roll' && i.user.id === userID) {
            await i.update({ content: msg, components: [] });
        }
        if (i.customId === 'back' && i.user.id === userID) {
            await changeRow(i, msg, 'back')
        }
        if (i.customId === 'next' || i.customId === 'back2' && i.user.id === userID) {
            await changeRow(i, msg, 'mid')
        }
        if (i.customId === 'nextF' && i.user.id === userID) {
            await changeRow(i, msg, 'final')
        }
    });

    collector.on('end', collected => console.log(`${collected.size}`));
};

async function changeRow(i, msg, rowValue) {
    const initRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('roll')
                .setLabel('Rolar')
                .setStyle('PRIMARY')
                .setEmoji('482132444854747166'),
            new MessageButton()
                .setCustomId('roll1')
                .setLabel('+1')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll2')
                .setLabel('+2')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll3')
                .setLabel('+3')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('next')
                .setLabel('Next')
                .setStyle('SUCCESS')
        );

    const midRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('back')
                .setLabel('Voltar')
                .setStyle('SUCESS'),
            new MessageButton()
                .setCustomId('roll4')
                .setLabel('+4')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll5')
                .setLabel('+5')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll6')
                .setLabel('+6')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('nextF')
                .setLabel('Next')
                .setStyle('SUCCESS')
        );

    const finalRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('back2')
                .setLabel('Voltar')
                .setStyle('SUCESS'),
            new MessageButton()
                .setCustomId('roll7')
                .setLabel('+7')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll8')
                .setLabel('+8')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('roll')
                .setLabel('Rolar')
                .setStyle('PRIMARY')
                .setEmoji('482132444854747166')
        );
    rowValue === 'back' ? rowValue = initRow : false
    rowValue === 'mid' ? rowValue = midRow : false
    rowValue === 'final' ? rowValue = finalRow : false

    if (rowValue !== null && rowValue !== 'back' && rowValue !== 'mid' && rowValue !== 'final') {
       await i.update({ content: msg, components: [rowValue] })
    }else console.log('deu erro')
}