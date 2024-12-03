import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import OpenAI from "openai";
import { removeMentions } from "../../../utils/stringUtils";
import { ChatCompletionMessageParam } from "openai/resources";

export class Hutao implements MessageHandler {
    private openai: OpenAI;
    private chatHistory: Array<ChatCompletionMessageParam> = [];

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async execute(message: Message): Promise<void> {
        const content = removeMentions(message.content);
        if (!content) return;

        this.addToChatHistory("user", `${message.author.username}: ${content}`);
        
        const response = await this.generateResponse();

        if (!response) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        await message.reply(response);

        this.addToChatHistory("assistant", response);
    }

    private async generateResponse(): Promise<string | null> {
        const prompt = `
            pretend you are Hutao from genshin impact. 
            mimic only verbal communication. 
            Keep responses brief.
            Act as if genshin impact is an extension of the real world
            `;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'chatgpt-4o-latest',
                messages: [
                    { role: "system", content: prompt },
                    ...this.chatHistory,
                ],
                max_tokens: 150,
            });

            return response.choices[0]?.message?.content || null;
        } catch (error) {
            console.error("Error generating response from OpenAI:", error);
            return null;
        }
    }

    private addToChatHistory(role: "user" | "assistant", content: string): void {
        this.chatHistory.push({ role, content });

        if (this.chatHistory.length > 25) {
            this.chatHistory.shift();
        }
    }
}
