import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { getAssetPath } from "../../../utils/fileUtils";
import { ROLE_HUTAO_COLOR } from "../../../constants/entityIdConstants";
import { getRandomBrightColor } from "../../../utils/colorUtils";
import OpenAI from "openai";
import { removeMentions, stripMetadata } from "../../../utils/stringUtils";
import { formatMessages } from "../../../utils/messageUtils";
import { ChatHistoryManager } from "../messageHelpers/chatHistoryManager";

export class ImpersonateCommand implements MessageHandler {
    private openai: OpenAI;
    private chatHistoryManager: ChatHistoryManager;

    private readonly fallbackResponses = [
        "huh",
        "one sec",
        "idk",
        "lol",
    ];

    constructor(openai: OpenAI, chatHistoryManager: ChatHistoryManager) {
        this.openai = openai;
        this.chatHistoryManager = chatHistoryManager;
    }
    

    async execute(message: Message): Promise<void> {
        const mentionedUsers = Array.from(message.mentions.users.values())
            .filter(user => !user.bot);
        
        if (mentionedUsers.length === 0) return;

        await this.impersonateRandom(message, mentionedUsers);
    }

    async impersonateUser(message: Message, targetUserId: string): Promise<void> {
        const targetMember = message.guild?.members.cache.get(targetUserId);
        if (!targetMember) return;

        const botUser = message.guild?.members.cache.get(message.client.user?.id || "");
        const botRole = await message.guild?.roles.fetch(ROLE_HUTAO_COLOR);

        // Impersonate the target user
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

        const userHistory = this.chatHistoryManager.get(targetMember.id);
        const allMessages = this.chatHistoryManager.getGlobal();

        const response = await this.generateResponse(content, userHistory, allMessages);

        await message.reply(response);

        // Cleanup after 60 seconds
        setTimeout(async () => {
            await botUser?.setNickname(null);
            const defaultAvatar = getAssetPath("default-avatar.png");
            try {
                await message.client.user?.setAvatar(defaultAvatar);
            } catch (e) {
                console.log("Failed to set avatar: ", e);
            }
            await botRole?.setColor(getRandomBrightColor());
        }, 60000);
    }

    private async impersonateRandom(message: Message, mentionedUsers: Array<import("discord.js").User>): Promise<void> {
        const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
        await this.impersonateUser(message, randomUser.id);
    }

    private async generateResponse(
        message: string,
        userHistory: Array<Message>,
        allMessages: Array<Message>
    ): Promise<string> {
        let prompt: string;

        if (userHistory.length === 0 || allMessages.length === 0) {
            // Fallback prompt if user or server history are unavailable
            prompt = `
                You are impersonating a user on a Discord server. 

                Respond generically like a Gen Z user to the following message:
                "${message}"

                Keep the response brief and avoid using emojis or punctuation.
            `;
        } else {
            const userHistoryContent = formatMessages(userHistory).join("\n");
            const allMessagesContent = formatMessages(allMessages).join("\n");

            prompt = `
                You are impersonating a user on a Discord server. 
                The following are examples of something they would type:
                ${userHistoryContent}

                generate a brief response to the last message in this conversation:
                ${allMessagesContent}

                Keep the response in a similar style to the user's past messages. 
                Don't use emojis or punctuation, don't mention users.
            `;

        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "chatgpt-4o-latest",
                messages: [
                    { role: "system", content: prompt },
                ],
                max_tokens: 150,
            });

            const content = response.choices[0]?.message?.content || this.getFallbackResponse();
            return stripMetadata(content);
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
