import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    Message,
    MessageActionRowComponentBuilder,
} from 'discord.js';
import { COMMAND_PREFIX } from '../../../constants/globalConstants';
import { MessageHandler } from '../messageHandler';

const JOIN_CLICK = 'join_click';
const LEAVE_CLICK = 'leave_click';

const createEmbed = (role: string, targetCount: number, attendingList: string[], waitlist: string[], isFull: boolean): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setTitle(`${role} ${isFull ? 'Game is Ready!' : "Let's play games!"}`)
        .setColor(isFull ? 0x00FF00 : 0xFF5733)
        .addFields(
            {
                name: `Looking for: ${targetCount} players`,
                value: `**Attending (${attendingList.length}/${targetCount}):**`,
                inline: false,
            },
            {
                name: 'Attending List',
                value: attendingList.map(id => `<@${id}>`).join('\n') || 'None',
                inline: false,
            },
            waitlist.length > 0
                ? {
                      name: 'Waitlist',
                      value: waitlist.map(id => `<@${id}>`).join('\n'),
                      inline: false,
                  }
                : { name: 'Waitlist', value: 'None', inline: false }
        );
    return embed;
};

const handleJoin = (
    userId: string,
    attendingList: string[],
    waitlist: string[],
    targetCount: number
): string => {
    if (!attendingList.includes(userId)) {
        if (attendingList.length < targetCount) {
            attendingList.push(userId);
            return 'You have joined the list!';
        } else if (!waitlist.includes(userId)) {
            waitlist.push(userId);
            return 'You have been added to the waitlist!';
        }
    }
    return 'You are already in the list!';
};

const handleLeave = (userId: string, attendingList: string[], waitlist: string[]): string => {
    if (attendingList.includes(userId)) {
        attendingList.splice(attendingList.indexOf(userId), 1);
        if (waitlist.length > 0) {
            attendingList.push(waitlist.shift()!);
        }
        return 'You have left the list!';
    } else if (waitlist.includes(userId)) {
        waitlist.splice(waitlist.indexOf(userId), 1);
        return 'You have left the waitlist!';
    }
    return 'You are not in the list!';
};

const execute = async (message: Message) => {
    const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
    const role = args[1];
    const targetCount = Number(args[2]);

    if (!role || isNaN(targetCount)) {
        await message.channel.send(
            '> Use it properly :3 \n > `$play <@Role or @people (no spaces)> <# of people wanted>`'
        );
        return;
    }

    await message.delete();

    let attendingList: string[] = [];
    let waitlist: string[] = [];

    let isFull = false;
    const embed = createEmbed(role, targetCount, attendingList, waitlist, isFull);

    const joinButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel('Join List')
        .setCustomId(JOIN_CLICK);

    const leaveButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setLabel('Leave List')
        .setCustomId(LEAVE_CLICK);

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(joinButton, leaveButton);

    const reply = await message.channel.send({ embeds: [embed], components: [row] });

    const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
    });

    collector.on('collect', async (interaction) => {
        const userId = interaction.user.id;
        let responseMessage: string;

        if (interaction.customId === JOIN_CLICK) {
            responseMessage = handleJoin(userId, attendingList, waitlist, targetCount);
        } else if (interaction.customId === LEAVE_CLICK) {
            responseMessage = handleLeave(userId, attendingList, waitlist);
        } else {
            return;
        }

        isFull = attendingList.length >= targetCount;
        const updatedEmbed = createEmbed(role, targetCount, attendingList, waitlist, isFull);

        await interaction.update({ embeds: [updatedEmbed] });
        interaction.followUp({ content: responseMessage, ephemeral: true });

        if (isFull) {
            const mentions = attendingList.map(id => `<@${id}>`).join(', ');
            await message.channel.send(`Game is ready! ${mentions}`);
        }
    });
};

export const lfg: MessageHandler = {
    execute,
};
