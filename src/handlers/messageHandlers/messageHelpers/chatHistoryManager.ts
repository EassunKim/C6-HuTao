import { Message } from "discord.js";
import { ChatHistory } from "./chatHistory";

export class ChatHistoryManager {
    private histories: Map<string, ChatHistory> = new Map();
    private globalHistory: ChatHistory;
    private readonly maxLength: number;

    constructor(maxLength: number = 10) {
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

        // Add to individual user's history
        const userHistory = this.getOrCreateHistory(userId);
        userHistory.addFromMessage(message);

        // Add to global history
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
