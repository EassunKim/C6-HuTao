import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";

const execute = async (message: Message, args: string[] = []) => {
    let max = 100; // Default maximum value for the random number
    if (args.length > 0) {
        // If a maximum number is provided as an argument, parse it
        const providedMax = parseInt(args[0]);
        if (!isNaN(providedMax) && providedMax > 1) {
            max = providedMax;
        } else {
            message.channel.send('USE IT RIGHT :3');
        }
    }
    const min = 1; // Minimum value for the random number (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min and max
    message.channel.send(`BOOM!!! ${randomNumber}`);
}

export const roll: MessageHandler = {
    execute
};
