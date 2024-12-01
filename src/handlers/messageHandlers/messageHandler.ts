import { Client, Message } from "discord.js";
import { USER_KEVIN, USER_KYLE, USER_MAJ, USER_SLEEPHILL } from "../../constants/entityIdConstants";
import { delayDelete, delayRemoveReactions, proc } from "../../utils/wrapperUtils";
import { COMMAND_PREFIX, MESSAGE_MAX_LENGTH } from "../../constants/globalConstants";
import { getAssetPath } from "../../utils/fileUtils";
import { flip } from "./commands/flip";
import { roll } from "./commands/roll";
import { lfg } from "./commands/lfg";
import { gn } from "./responses/gn";
import { gm } from "./responses/gm";
import { generateRandomUnicodeString } from "../../utils/stringUtils";

const twitterRegex = /https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/g;
const counterStrikeRegex = /\b(counter strike|counterstrike|csgo|cs|cs2|counter-strike)\b/i;
const gnRegex = /^gn(\s|$)/i;
const gmRegex = /^gm(\s|$)/i;

export interface MessageHandler {
    execute: (message: Message, ...args: any[]) => Promise<void>;
}

export const handleMessages = async (client: Client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        handleExplicitMatchMessages(message);
        handleUserBasedResponses(message);
        handleCommands(message);

        if (twitterRegex.test(message.content)) {
            const match = message.content.match(twitterRegex);
            message.suppressEmbeds(true);
            message.reply(match![0].replace(/(twitter\.com|x\.com)/, 'vxtwitter.com'));
        }

        if (counterStrikeRegex.test(message.content)) {
            message.channel.send(`<@${USER_KEVIN}> counter strike mentioned`)
        }

        if (gnRegex.test(message.content)) {
            gn.execute(message);
        }

        if (gmRegex.test(message.content)) {
            gm.execute(message);
        }

        if (message.mentions.users.has(USER_KEVIN)) {
            const targetUser = message.mentions.users.get(USER_KEVIN);
            if (!targetUser) return;
            const guildMember = message.guild?.members.cache.get(message.client.user?.id || '');
            await guildMember?.setNickname(targetUser.username);
            await message.client.user?.setAvatar(targetUser.displayAvatarURL());
            message.reply("I'm Syed");
        }

        if (message.mentions.users.size > 0) {
            proc(1, async () => {
                const mentionedUsers = Array.from(message.mentions.users.values());
                const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];

                if (!randomUser) return;

                const targetMember = message.guild?.members.cache.get(randomUser.id);

                if (!targetMember) return;

                const guildMember = message.guild?.members.cache.get(message.client.user?.id || '');
                const targetNickname = targetMember.nickname || randomUser.username;

                await guildMember?.setNickname(targetNickname);
                await message.client.user?.setAvatar(randomUser.displayAvatarURL());

                setTimeout(() => {
                    message.channel.sendTyping()
                }, 3000);
                setTimeout(() => {
                    message.channel.send('huh');
                }, 1500);
            })
        }
    });
}

const handleExplicitMatchMessages = (message: Message) => {
    switch (message.content.toLowerCase()) {
        case 'hi':
            message.reply(':3');
            break;
        case 'who':
        case 'who?':
            message.reply('Xiangling');
            break;
        case 'hu':
            message.reply('Tao!');
            break;
        case 'boo':
            message.reply('Tao!');
            break;
        case 'and perhaps':
            message.reply('what is this?');
            break;
    }
}

const handleUserBasedResponses = (message: Message) => {
    // TODO: move these to separate files
    const userHandlers: Record<string, () => Promise<void>> = {
        [USER_KEVIN]: async () => {
            await proc(0.05, async () => {
                const replyPayload = generateRandomUnicodeString(MESSAGE_MAX_LENGTH);
                const reply = await message.channel.send(replyPayload);
                await delayDelete(reply, 1000);
            });
        },
        [USER_KYLE]: async () => {
            await proc(0.05, async () => {
                const filePath = getAssetPath('princess-connect-kyaru.gif');
                const reply = await message.reply({ files: [filePath] });
                await delayDelete(reply, 2500);
            });
        },
        [USER_SLEEPHILL]: async () => {
            proc(0.05, () => message.delete());
        },
        [USER_MAJ]: async () => {
            proc(0.05, async () => {
                const reactions = ['🇧', '🇮', '🇹', '🇨', '🇭'];
                for (const reaction of reactions) {
                    await message.react(reaction);
                }
                await delayRemoveReactions(message, 2500);
            });

            proc(0.05, () => message.reply('🖕'));
        },
    };

    const handler = userHandlers[message.author.id];
    if (handler) {
        handler();
    }
};

const handleCommands = (message: Message) => {
    if (!message.content.startsWith(COMMAND_PREFIX)) return;
    const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/\s+/);
    const command = args.shift();

    switch (command?.toLowerCase()) {
        case 'flip':
            flip.execute(message, args)
            break;
        case 'roll':
            roll.execute(message, args)
            break;
        case 'lfg':
            lfg.execute(message, args)
            break;
    }
}
