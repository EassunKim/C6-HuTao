import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { getAssetPath } from "../../../utils/fileUtils";
import { ROLE_HUTAO_COLOR, USER_HUTAO } from "../../../constants/entityIdConstants";
import { getRandomBrightColor } from "../../../utils/colorUtils";
import OpenAI from "openai";
import { removeMentions } from "../../../utils/stringUtils";

export class ImpersonateCommand implements MessageHandler {
    private openai: OpenAI;

    private readonly fallbackResponses = [
        "huh",
        "one sec",
        "idk",
        "lol",
    ];

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async execute(message: Message): Promise<void> {
        const mentionedUsers = Array.from(message.mentions.users.values());
        const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
        if (randomUser.id === USER_HUTAO) return; // don't impersonate self lol

        const targetMember = message.guild?.members.cache.get(randomUser.id);
        if (!targetMember) return;

        const botUser = message.guild?.members.cache.get(message.client.user?.id || "");
        const botRole = await message.guild?.roles.fetch(ROLE_HUTAO_COLOR);

        await botUser?.setNickname(targetMember.displayName);
        botRole?.setColor(targetMember.displayHexColor);
        try {
            await message.client.user?.setAvatar(targetMember.displayAvatarURL());
        } catch (e) {
            console.log("Failed to set avatar: ", e);
        }

        const content = removeMentions(message.content);
        if (!content) return;

        await new Promise((resolve) => setTimeout(resolve, 3000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await this.generateResponse(content);

        await message.reply(response);

        // Cleanup
        setTimeout(async () => {
            await botRole?.setColor(getRandomBrightColor());
            await botUser?.setNickname(null);
            const defaultAvatar = getAssetPath("default-avatar.png");
            await message.client.user?.setAvatar(defaultAvatar);
        }, 180000);
    }

    private async generateResponse(message: string): Promise<string> {
        const prompt = `
        Give a brief and neutral response that a gen z person would use to respond to this message: ${message}.
        assume the sender is also gen z, don't use emojis, avoid correct punctuation and questions
        `
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: prompt,
                    },
                ],
                max_tokens: 100,
            });

            return response.choices[0]?.message?.content || this.getFallbackResponse();
        } catch (error) {
            console.error("Error generating response from OpenAI:", error);
            return this.getFallbackResponse();
        }
    }

    private getFallbackResponse(): string {
        return this.fallbackResponses[
            Math.floor(Math.random() * this.fallbackResponses.length)
        ];
    }
}
