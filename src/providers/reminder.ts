
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";
import {ReminderModel} from "../models/reminder-model";

@Injectable()
export class Reminder {

    constructor(public af: AngularFire, private authDataProvider: AuthData){
    }

    public createReminderForThisUser(message, datetime){
        return this.createReminder(this.authDataProvider.getUserId(), message, datetime)
    }

    // adds reminder to user and returns reminderId
    public createReminder(userId, message, datetime){
        return this.af.database.list("/user-reminders/" + userId).push({
            message: message,
            datetime: datetime
        }).key
    }

    // returns all reminders of user
    public getThisUserReminders(){
        return this.getReminders(this.authDataProvider.getUserId())
    }

    // returns all reminders of user
    public getReminders(userId): Promise<ReminderModel[]>{
        return this.af.database.list("/user-reminders/" + userId)
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // deletes a reminder of this user.
    public deleteReminderFromThisUser(reminderId){
        return this.deleteReminder(this.authDataProvider.getUserId(), reminderId);
    }

    // deletes a reminder of a user, given userId.
    public deleteReminder(userId, reminderId){
        return this.af.database.object("/user-reminders/" + userId + "/" + reminderId).remove();
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): ReminderModel[] {
        let modelArray: Array<ReminderModel> = [];
        for (let obj of objs) {
            var model = new ReminderModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): ReminderModel {
        return new ReminderModel().fromObject(obj);
    }
}
