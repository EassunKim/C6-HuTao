import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";

const execute = async (message: Message) => {
    const result = Math.random() <= 0.5 ? "Heads da yo" : "Tails da yo";
    await message.channel.send(result);
}

export const flip: MessageHandler = {
    execute
};
