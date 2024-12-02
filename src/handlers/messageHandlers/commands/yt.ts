import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import ytdl from '@distube/ytdl-core';

const execute = async (message: Message, args: string[] = []) => {
    if (!message.member) return;
    if (args.length != 1) {
        message.reply('Invalid arguments provided. Please provide a valid URL.');
        return;
    }
    const videoUrl = args[0];
    if (!message.member.voice.channel) {
        message.reply('You need to be in a voice channel to use this command');
        return;
    }

    const voiceChannel = message.member.voice.channel;
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    const proxy = process.env.YOUTUBE_PROXY;
    if (!proxy) {
        console.error("YouTube Proxy environment variable is not configured");
        return;
    }

    const agent = ytdl.createProxyAgent({ uri: proxy });

    const stream = ytdl(videoUrl, {filter: 'audioonly', agent});
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);
     player.on(AudioPlayerStatus.Playing, () => {
        console.log('The bot is now playing audio!');
    });

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });

    player.on('error', (error) => {
        console.log(error)
        connection.destroy();
    });
}

export const yt: MessageHandler = {
    execute
};
