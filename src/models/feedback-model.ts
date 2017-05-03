export class FeedbackModel {
    id: string;
    date: string;
    breakfast: boolean;
    lunch: boolean;
    midafternoonsnack: boolean;
    siesta: boolean;
    comment: string;
    activities: Array<string>; // = ["lego", "music", "drawing", "etc"]

    public fromObject(obj: any):FeedbackModel {
        this.id = obj.$key
        this.date = obj.$key
        this.breakfast = obj.breakfast
        this.lunch = obj.lunch
        this.midafternoonsnack = obj.midafternoonsnack
        this.siesta = obj.siesta
        this.comment = obj.comment
        this.activities = obj.activities

        return this;
    }
}
