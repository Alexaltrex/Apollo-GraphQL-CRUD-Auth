export interface IMessage {
    id: string
    text: string
    author: string
}

export type AddMessageType = Omit<IMessage, "id" | "author">

export type AddMessageErrorType = Partial<AddMessageType>

