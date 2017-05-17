export class InvitationModel {
    id: string
    hostUserId: string
    message: string
    datetime: string

    public fromObject(obj: any):InvitationModel {
        this.id = obj.$key
        this.hostUserId = obj.hostUserId
        this.message = obj.message
        this.datetime = obj.datetime

        return this;
    }
}
