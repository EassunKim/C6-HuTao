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
import { ImpersonateCommand } from "./responses/impersonate";
import { yt } from "./commands/yt";
import { thumbnail } from "./commands/thumbnail";
import OpenAI from "openai";
import { Hutao } from "./responses/hutao";

const twitterRegex = /https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/g;
const counterStrikeRegex = /\b(counter strike|counterstrike|csgo|cs|cs2|counter-strike)\b/i;
const gnRegex = /^gn(\s|$)/i;
const gmRegex = /^gm(\s|$)/i;

export interface MessageHandler {
    execute: (message: Message, args?: string[]) => Promise<void>;
}


export const handleMessages = async (client: Client, openai: OpenAI) => {

    const impersonate = new ImpersonateCommand(openai)
    const hutao = new Hutao(openai);

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

        if (message.mentions.users.size > 0) {
            proc(0.01, () => impersonate.execute(message));
        }

        if (message.mentions.has(client.user!)) {
            hutao.execute(message);
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
        case 'play':
            lfg.execute(message, args)
            break;
        case 'yt':
            yt.execute(message, args)
            break;
        case 'thumbnail':
            thumbnail.execute(message, args)
            break;
    }
}
