export class ActivityModel {
    id: string;
    message: string;
    datetime: string;

    public fromObject(obj: any):ActivityModel {
        this.id = obj.$key
        this.message = obj.message
        this.datetime = obj.datetime

        return this;
    }
}
