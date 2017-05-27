export class ConversationModel {
    id: string;
    isUnread: string;
    conversation: any;

    public fromObject(obj: any):ConversationModel {
        this.id = obj.$key
        this.isUnread = obj.isUnread
        this.conversation = obj.conversation

        return this;
    }
}
