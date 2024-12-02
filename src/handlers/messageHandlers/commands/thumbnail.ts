import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";

const execute = async (message: Message, args: string[] = []) => {
    if (args.length != 1) {
        message.reply('Invalid arguments provided. Please provide a valid URL.');
        return;
    }
    const videoUrl = args[0];

    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch || !videoIdMatch[1]) {
        message.reply('Invalid YouTube URL. Please provide a valid URL.');
        return;
    }

    const videoId = videoIdMatch[1];

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    await message.reply({
        files: [thumbnailUrl],
    });
}

export const thumbnail: MessageHandler = {
    execute
};
