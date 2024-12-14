import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import OpenAI from "openai";
import { removeMentions } from "../../../utils/stringUtils";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources";
import { toChatCompletionMessageParam, toChatCompletionMessageParams } from "../../../utils/messageUtils";
import { ChatHistoryManager } from "../messageHelpers/chatHistoryManager";

export class Hutao implements MessageHandler {
    private openai: OpenAI;
    private chatHistoryManager: ChatHistoryManager;

    constructor(openai: OpenAI, chatHistoryManager: ChatHistoryManager) {
        this.openai = openai;
        this.chatHistoryManager = chatHistoryManager;
    }

    async execute(message: Message): Promise<void> {
        const content = removeMentions(message.content);
        if (!content) return;

        const response = await this.generateResponse(message);

        if (!response) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        await message.reply(response);
    }

    private async generateResponse(message: Message): Promise<string | null> {
        const prompt = `
            pretend you are Hutao from genshin impact. 
            don't describe actions
            Keep responses brief.
            Act as if genshin impact is an extension of the real world
            `;

        const evilPrompt = `
            be extremely rude and condescending
            don't use correct punctuation
            keep responses brief
        `;

        const messages: Array<ChatCompletionMessageParam> = Math.random() < 0.1
            ? [
                { role: "system", content: evilPrompt },
                toChatCompletionMessageParam(message)
            ]
            : [
                { role: "system", content: prompt },
                ...toChatCompletionMessageParams(this.chatHistoryManager.getGlobal()),
            ];

        const payload: ChatCompletionCreateParamsNonStreaming = {
            model: 'chatgpt-4o-latest',
            messages: messages,
            max_tokens: 150,
        };

        try {
            const response = await this.openai.chat.completions.create(payload);

            return response.choices[0]?.message?.content || null;
        } catch (error) {
            console.error("Error generating response from OpenAI:", error);
            return null;
        }
    }
}
