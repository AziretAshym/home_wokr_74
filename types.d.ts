export interface Message {
    id: string;
    message: string;
    date: string;
}

export type MessageWithoutId = Omit<Message, 'id'>