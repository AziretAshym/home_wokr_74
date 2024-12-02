import { promises as fs } from 'fs';
import { Message, MessageWithoutId } from "./types";
import path from "node:path";
import crypto from 'crypto';

let data: Message[] = [];
const directoryName = `./messages`;

const fileDb = {
    async init() {
        try {
            const files = await fs.readdir(directoryName);
            for (const file of files) {
                const content = await fs.readFile(path.join(directoryName, file));
                const message = JSON.parse(content.toString()) as Message;
                data.push(message);
            }
        } catch (e) {
            console.error(e);
        }
    },

    async getMessages() {
        try {
            return data;
        } catch (e) {
            console.error(e);
        }
    },

    async addMessage(item: MessageWithoutId) {
        const date = new Date().toISOString();
        const fileName = `${date}.txt`;

        const message: Message = {
            id: crypto.randomUUID(),
            message: item.message,
            date: date,
        };

        const file = path.join(directoryName, fileName);

        console.log(file);

        try {
            await fs.writeFile(file, JSON.stringify(message));
            data.push(message);
            return message;
        } catch (e) {
            console.error(e);
        }
    }
};


export default fileDb;
