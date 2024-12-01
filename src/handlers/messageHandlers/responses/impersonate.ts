import { Message } from "discord.js"
import { MessageHandler } from "../messageHandler"
import { getAssetPath } from "../../../utils/fileUtils";
import { ROLE_HUTAO_COLOR } from "../../../constants/entityIdConstants";
import { getRandomBrightColor } from "../../../utils/colorUtils";

const responses = [
    'huh',
    'one sec',
    'idk',
    'lol'
]

const execute = async (message: Message) => {
    const mentionedUsers = Array.from(message.mentions.users.values());
    const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];

    const targetMember = message.guild?.members.cache.get(randomUser.id);
    if (!targetMember) return;

    const botUser = message.guild?.members.cache.get(message.client.user?.id || '');
    const botRole = message.guild?.roles.cache.get(ROLE_HUTAO_COLOR);

    await botUser?.setNickname(targetMember.displayName);
    await botRole?.setColor(targetMember.displayHexColor);
    try {
        await message.client.user?.setAvatar(targetMember.displayAvatarURL());
    } catch (e) {
        console.log('Failed to set avatar: ', e);
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    await message.channel.sendTyping();
    await new Promise(resolve => setTimeout(resolve, 3000));
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const botMessage = await message.channel.send(randomResponse);

    // cleanup
    setTimeout(async () => {
        await botMessage.delete();
        await botRole?.setColor(getRandomBrightColor())
        await botUser?.setNickname(null);
        const defaultAvatar = getAssetPath('default-avatar.png');
        await message.client.user?.setAvatar(defaultAvatar);
    }, 180000);
}

export const impersonate: MessageHandler = {
    execute
}
