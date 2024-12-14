import { ChatCompletionMessageParam } from "openai/resources";
import { Message } from "discord.js";
import { USER_HUTAO } from "../constants/entityIdConstants";

export const toChatCompletionMessageParam = (
    message: Message
): ChatCompletionMessageParam => {
    const role = message.author.id === USER_HUTAO ? "assistant" : "user";
    const content = role === "user"
        ? `${message.author.username}: ${message.content}`
        : message.content;

    return { role, content };
};

export const toChatCompletionMessageParams = (
    messages: Array<Message>
): Array<ChatCompletionMessageParam> => {
    return messages.map(toChatCompletionMessageParam);
};
