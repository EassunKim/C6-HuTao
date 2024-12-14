import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import OpenAI from "openai";
import { removeMentions } from "../../../utils/stringUtils";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources";
import { ChatHistory } from "../messageHelpers/chatHistory";
import { toChatCompletionMessageParam, toChatCompletionMessageParams } from "../../../utils/messageUtils";

export class Hutao implements MessageHandler {
    private openai: OpenAI;
    private chatHistory: ChatHistory;

    constructor(openai: OpenAI) {
        this.openai = openai;
        this.chatHistory = new ChatHistory(10);
    }

    async execute(message: Message): Promise<void> {
        const content = removeMentions(message.content);
        if (!content) return;

        this.chatHistory.addFromMessage(message);
        
        const response = await this.generateResponse();

        if (!response) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        this.chatHistory.addFromMessage(await message.reply(response));
    }

    private async generateResponse(): Promise<string | null> {
        const prompt = `
            pretend you are Hutao from genshin impact. 
            mimic only verbal communication. 
            Keep responses brief.
            Act as if genshin impact is an extension of the real world
            `;

        const evilPrompt = `
            be extremely rude and condescending
            mimic only verbal communication
            speak like you are genz, don't use correct punctuation
            keep responses brief
        `;

        const latestMessage = toChatCompletionMessageParam(this.chatHistory.latest()!);
        const messages: Array<ChatCompletionMessageParam> = Math.random() < 0.1
            ? [
                { role: "system", content: evilPrompt },
                ...(latestMessage ? [latestMessage] : [])
            ]
            : [
                { role: "system", content: prompt },
                ...toChatCompletionMessageParams(this.chatHistory.get()),
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
