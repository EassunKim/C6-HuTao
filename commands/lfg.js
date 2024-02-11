const {ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType} = require('discord.js');

require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = (client) => {    
    let attending = 0;
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content.startsWith(prefix)) return; // Ignore bot messages and messages without prefix
        
        //isolate variables
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();

        let role = args[1]; // people
        let lf = args[2]; // game

        let msg = `> ${role} Let's play games!! \n > Looking for: ${lf} \n > **Attending:**`;

        const usersWhoInteracted = new Set();

        //check if proper command sent
        if (role === undefined || lf === undefined) {
            message.channel.send(`> Use it properly :3 \n > $play <@Role> <# of people wanted>`);
            return;
        }

        if (command === 'play') {
            attending = 0;

            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel('Lets play!')
                .setCustomId('click_button');

            const row = new ActionRowBuilder().addComponents(button);

            const reply = await message.channel.send({ content: `${msg}`, components: [row]});
            lf--;
            
            const filter = (i) => i.user.id === message.author.id;

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.Button,
                filter,
            });

            collector.on('collect', (interaction) => {
                
                if (lf > 0 && interaction.customId === 'click_button' && !usersWhoInteracted.has(interaction.user.id)) {
                    msg += `\n > - <@${interaction.user.id}>`;
                    interaction.update(`${msg}`);
                    lf = lf - 1;
                    usersWhoInteracted.add(interaction.user.id);
                    return;
                } else if (usersWhoInteracted.has(interaction.user.id)) {
                    return;
                } else {
                    interaction.update(`> Lobby's Full!`);
                    return;
                }
                
            });
        }
    });
}

