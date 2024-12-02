import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { getAssetPath } from "../../../utils/fileUtils";
import { ROLE_HUTAO_COLOR } from "../../../constants/entityIdConstants";
import { getRandomBrightColor } from "../../../utils/colorUtils";
import OpenAI from "openai";

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

        await new Promise((resolve) => setTimeout(resolve, 3000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await this.generateResponse(message);

        await message.reply(response);

        // Cleanup
        setTimeout(async () => {
            await botRole?.setColor(getRandomBrightColor());
            await botUser?.setNickname(null);
            const defaultAvatar = getAssetPath("default-avatar.png");
            await message.client.user?.setAvatar(defaultAvatar);
        }, 180000);
    }

    private async generateResponse(message: Message): Promise<string> {
        const content = this.removeMentions(message);
        const prompt = `
        Give a brief and neutral response that a gen z person would use to respond to this message: ${content}.
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
    
    private  removeMentions = (message: Message): string => {
        return message.content
            // Remove user mentions (e.g., <@123456789012345678>)
            .replace(/<@!?(\d+)>/g, "")
            // Remove role mentions (e.g., <@&123456789012345678>)
            .replace(/<@&(\d+)>/g, "")
            // Remove channel mentions (e.g., <#123456789012345678>)
            .replace(/<#(\d+)>/g, "")
            .trim();
    };
}
