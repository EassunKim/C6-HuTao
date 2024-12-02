import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import OpenAI from "openai";
import { removeMentions } from "../../../utils/stringUtils";

export class Hutao implements MessageHandler {
    private openai: OpenAI;

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async execute(message: Message): Promise<void> {
        const content = removeMentions(message.content);
        if (!content) return;
        const response = await this.generateResponse(content);

        if (!response) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await message.channel.sendTyping();
        await new Promise((resolve) => setTimeout(resolve, 3000));

        await message.reply(response);
    }

    private async generateResponse(message: string): Promise<string | null> {
        const prompt = `
            pretend you are hutao from genshin impact. Briefly respond to this message: ${message}
            avoid using anything you would not use in verbal communication. Act as if genshin impact is the real world
        `;
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

            return response.choices[0]?.message?.content || null;
        } catch (error) {
            console.error("Error generating response from OpenAI:", error);
            return null;
        }
    }
}
