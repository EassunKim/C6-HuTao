const {ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType} = require('discord.js');

require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = (client) => {    
    let attending = 0;
    let usersWhoInteracted = new Set();
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content.startsWith(prefix)) return; // Ignore bot messages and messages without prefix
        message.delete();
        //isolate variables
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args[0].toLowerCase();

        let role = args[1]; // people
        let lf = args[2]; // game

        let msg = `> ${role} Let's play games!! \n > Looking for: ${lf - attending} \n > **Attending:**`;
    
        //check if proper command sent
        if (role === undefined || lf === undefined) {
            message.channel.send(`> Use it properly :3 \n > $play <@Role or @people(no spaces)> <# of people wanted>`);
            return;
        }

        //Command body
        if (command === 'play') {
            attending = 0;
            
            //init button
            const button = new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel('Lets play!')
                .setCustomId('lf_people');

            let row = new ActionRowBuilder().addComponents(button);

            const reply = await message.channel.send({ content: `${msg}`, components: [row]});
            
            //const filter = (i) => i.user.id === message.author.id;

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.Button,
                //filter,
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

            

