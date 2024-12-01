import { Message } from "discord.js"
import { MessageHandler } from "../messageHandler"
import { getAssetPath } from "../../../utils/fileUtils";

const responses = [
    'huh',
    'one sec',
    'idk',
    'lol'
]

const execute = async (message: Message) => {
    const mentionedUsers = Array.from(message.mentions.users.values());
    const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];

    if (!randomUser) return;

    const targetMember = message.guild?.members.cache.get(randomUser.id);

    if (!targetMember) return;

    const guildMember = message.guild?.members.cache.get(message.client.user?.id || '');
    const targetNickname = targetMember.nickname || randomUser.username;

    await guildMember?.setNickname(targetNickname);
    try {
        await message.client.user?.setAvatar(randomUser.displayAvatarURL());
    } catch (e) {
        console.log('Failed to set avatar: ', e);
    }

    setTimeout(async () => {
        await message.channel.sendTyping()
    }, 3000);
    setTimeout(async () => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        await message.channel.send(randomResponse);
    }, 6000);

    // cleanup
    setTimeout(async () => {
        await guildMember?.setNickname(null);
        const defaultAvatar = getAssetPath('default-avatar.png');
        await message.client.user?.setAvatar(defaultAvatar);
    }, 180000);
}

export const impersonate: MessageHandler = {
    execute
}
