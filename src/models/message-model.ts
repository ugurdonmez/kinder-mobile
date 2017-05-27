export class MessageModel {
    id: string;
    message: string;
    sender: string;
    timestamp: number;

    public fromObject(obj: any):MessageModel {
        this.id = obj.$key
        this.message = obj.message
        this.sender = obj.sender
        this.timestamp = obj.timestamp

        return this;
    }
}
