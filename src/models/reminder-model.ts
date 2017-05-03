export class ReminderModel {
    id: string
    message: string
    datetime: string

    public fromObject(obj: any):ReminderModel {
        this.id = obj.$key
        this.message = obj.message
        this.datetime = obj.datetime

        return this;
    }
}
