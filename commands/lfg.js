const {ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType} = require('discord.js');

require('dotenv').config();
const prefix = '$';

module.exports = (client) => {    
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content.startsWith(prefix)) return; // Ignore bot messages and messages without prefix

        let attending = 0;
        let usersWhoInteracted = new Set();
        //isolate variables
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();

        if (command === 'play') {
            message.delete();
            let attending = 0;
            let usersWhoInteracted = new Set();
            let role = args[1]; // people
            let lf = args[2]; // game

            let msg = `> ${role} Let's play games!! \n > Looking for: ${lf - attending} \n > **Attending:**`;

            if (role === undefined || lf === undefined) {
                message.channel.send(`> Use it properly :3 \n > $play <@Role or @people(no spaces)> <# of people wanted>`);
                return;
            }
            //init button
            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel('Lets play!')
                .setCustomId('lf_people');

            let row = new ActionRowBuilder().addComponents(button);

            const reply = await message.channel.send({ content: `${msg}`, components: [row]});

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.Button,
            });

            collector.on('collect', (interaction) => {
                if (interaction.customId === 'lf_people' && !usersWhoInteracted.has(interaction.user.id)) {
                    usersWhoInteracted.add(interaction.user.id);
                    attending++;
                    const remainingSpot = lf - attending;

                    msg += `\n > - <@${interaction.user.id}>`;

                    if (remainingSpot === 0) {
                        msg = `${msg} \n > **Waitlist:**`;
                    };

                    interaction.update(`${msg}`);

                    return;
                }
            });
        }
    });
}

            

