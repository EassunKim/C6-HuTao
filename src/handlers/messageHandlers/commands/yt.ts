import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import ytdl from '@distube/ytdl-core';
import { readFileSync } from "fs";
import { getAuthPath } from "../../../utils/fileUtils";

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

    const cookiePath = getAuthPath('youtube-cookie.json');
    const cookies = JSON.parse(readFileSync(cookiePath, "utf-8"));
    const agent = ytdl.createAgent(cookies);
    const stream = ytdl(args[0], {filter: 'audioonly', agent});
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
