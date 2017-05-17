export class WeeklyMealMenuModel {
    id: string;
    date: string;
    imgUrl: string;

    public fromObject(obj: any):WeeklyMealMenuModel {
        this.id = obj.$key
        this.date = obj.$key
        this.imgUrl = obj.$value

        return this;
    }
}
