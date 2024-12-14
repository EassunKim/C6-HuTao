import { Message } from "discord.js";
import { ChatHistory } from "./chatHistory";

export class ChatHistoryManager {
    private histories: Map<string, ChatHistory> = new Map();
    private globalHistory: ChatHistory;
    private readonly maxLength: number;

    constructor(maxLength: number = 20) {
        this.maxLength = maxLength;
        this.globalHistory = new ChatHistory(maxLength);
    }

    private getOrCreateHistory(userId: string): ChatHistory {
        if (!this.histories.has(userId)) {
            this.histories.set(userId, new ChatHistory(this.maxLength));
        }
        return this.histories.get(userId)!;
    }

    addFromMessage(message: Message): void {
        const userId = message.author.id;

        const userHistory = this.getOrCreateHistory(userId);
        userHistory.addFromMessage(message);

        this.globalHistory.addFromMessage(message);
    }

    get(userId: string): Array<Message> {
        return this.histories.has(userId) ? this.histories.get(userId)!.get() : [];
    }

    getGlobal(): Array<Message> {
        return this.globalHistory.get();
    }

    latest(userId: string): Message | null {
        return this.histories.has(userId) ? this.histories.get(userId)!.latest() : null;
    }

    latestGlobal(): Message | null {
        return this.globalHistory.latest();
    }

}
