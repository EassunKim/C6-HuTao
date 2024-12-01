import { Message } from "discord.js";

export const proc = (chance: number, fn: () => void) => {
    if (Math.random() < chance) {
        fn();
    }
}

export const delayDelete = async (message: Message, ttl: number) => {
    setTimeout(async () => {
        await message.delete();
    }, ttl);
}

export const delayRemoveReactions = async (message: Message, ttl: number) => {
    setTimeout(async () => {
        await message.reactions.removeAll();
    }, ttl);
}