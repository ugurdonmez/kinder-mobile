export class WeeklyActivityModel {
    id: string;
    date: string;
    imgUrl: string;

    public fromObject(obj: any):WeeklyActivityModel {
        this.id = obj.$key
        this.date = obj.$key
        this.imgUrl = obj.$value

        return this;
    }
}
