import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import ytdl from '@distube/ytdl-core';

const execute = async (message: Message, args: string[]) => {
    if (!message.member) return;
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

    const player = createAudioPlayer();
    const stream = ytdl(args[0], { filter: 'audioonly' });
    const resource = createAudioResource(stream);

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