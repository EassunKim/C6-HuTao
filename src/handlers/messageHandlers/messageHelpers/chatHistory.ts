import { Message } from "discord.js";

export class ChatHistory {
    private history: Array<Message> = [];
    private maxLength: number;

    constructor(maxLength: number = 10) {
        this.maxLength = maxLength;
    }

    addFromMessage(message: Message): void {
        this.history.push(message);

        if (this.history.length > this.maxLength) {
            this.history.shift();
        }
    }

    get(): Array<Message> {
        return this.history;
    }

    clear(): void {
        this.history = [];
    }

    latest(): Message | null {
        return this.history.length > 0 ? this.history[this.history.length - 1] : null;
    }
}
