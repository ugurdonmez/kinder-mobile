export class ClassWallModel {
    id: string;
    wallRead: string;
    conversation: any;

    public fromObject(obj: any):ClassWallModel {
        this.id = obj.$key
        this.wallRead = obj.wallRead
        this.conversation = obj.conversation

        return this;
    }
}
