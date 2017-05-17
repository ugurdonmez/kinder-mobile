export class MessageModel {
    id: string;
    isUnread: string;
    conversation: any;

    public fromObject(obj: any):MessageModel {
        this.id = obj.$key
        this.isUnread = obj.isUnread
        this.conversation = obj.conversation

        return this;
    }
}
