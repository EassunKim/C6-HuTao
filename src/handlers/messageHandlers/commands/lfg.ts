import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Message, MessageActionRowComponentBuilder } from "discord.js";
import { COMMAND_PREFIX } from "../../../constants/globalConstants";
import { MessageHandler } from "../messageHandler";

const execute = async (message: Message) => {
    // TODO: matt clean this up lololol

    const args = message.content.slice(COMMAND_PREFIX.length).split(/ +/);

    message.delete();
    let attending = 0;
    let usersWhoInteracted = new Set();
    let role = args[1]; // people
    let lf = Number(args[2]); // game

    let msg = `> ${role} Let's play games!! \n > Looking for: ${lf - attending} \n > **Attending:**`;

    if (role === undefined || lf === undefined) {
        message.channel.send(`> Use it properly :3 \n > $play <@Role or @people(no spaces)> <# of people wanted>`);
        return;
    }

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel('Lets play!')
        .setCustomId('lf_people');

    let row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(button);

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

export const lfg: MessageHandler = {
    execute
};
