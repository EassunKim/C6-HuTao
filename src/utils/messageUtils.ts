import { ChatCompletionMessageParam } from "openai/resources";
import { Message } from "discord.js";
import { USER_HUTAO } from "../constants/entityIdConstants";

export const toChatCompletionMessageParam = (
    message: Message
): ChatCompletionMessageParam => {
    const role = message.author.id === USER_HUTAO ? "assistant" : "user";

    const content = role === "user"
        ? `${message.author.username}: ${replaceMentionsWithUsernames(message)}`
        : replaceMentionsWithUsernames(message);

    return { role, content };
};

export const toChatCompletionMessageParams = (
    messages: Array<Message>
): Array<ChatCompletionMessageParam> => {
    return messages.map(toChatCompletionMessageParam);
};

const replaceMentionsWithUsernames = (message: Message): string => {
    let content = message.content;

    // Replace user mentions
    message.mentions.users.forEach(user => {
        const mentionPattern = `<@!?${user.id}>`;
        content = content.replace(new RegExp(mentionPattern, 'g'), `@${user.username}`);
    });

    // Replace role mentions
    message.mentions.roles.forEach(role => {
        const mentionPattern = `<@&${role.id}>`;
        content = content.replace(new RegExp(mentionPattern, 'g'), `@${role.name}`);
    });

    return content;
};

export const formatMessages = (messages: Array<Message>): string[] => {
    return messages.map(message => {
        const content = replaceMentionsWithUsernames(message);
        return `${message.author.username}: ${content}`;
    });
};
