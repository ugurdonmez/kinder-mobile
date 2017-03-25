import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";

@Injectable()
export class Calendar {

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
    public getReminders(userId){
        return this.af.database.list("/user-reminders/" + userId)
    }

    // deletes a reminder of this user.
    public deleteReminderFromThisUser(reminderId){
        return this.deleteReminder(this.authDataProvider.getUserId(), reminderId);
    }

    // deletes a reminder of a user, given userId.
    public deleteReminder(userId, reminderId){
        return this.af.database.object("/user-reminders/" + userId + "/" + reminderId).remove();
    }


    // adds invitation to class and returns invitationId
    public createInvitation(classId, hostUserId, message, datetime){
        return this.af.database.list("/classes/" + classId + "/invitations/").push({
            hostUserId: hostUserId,
            message: message,
            datetime: datetime
        }).key
    }

    // returns all invitations of class
    public getInvitations(classId){
        return this.af.database.list("/classes/" + classId + "/invitations/")
    }

    // returns all invitations filtered by hostId
    getInvitationsOfHost(classId, hostUserId){
        return this.af.database.list("/classes/" + classId + "/invitations/", {
            query: {
                orderByChild: 'hostUserId',
                equalTo: hostUserId
            }
        })
    }

    // deletes an invitation, given classId and invitationId.
    public deleteInvitation(classId, invitationId){
        return this.af.database.object("/classes/" + classId + "/invitations/" + invitationId).remove();
    }


    // adds activity to class and returns activityId
    public createActivity(classId, message, datetime){
        return this.af.database.list("/classes/" + classId + "/activities/").push({
            message: message,
            datetime: datetime
        }).key
    }

    // returns all activities of class
    public getActivities(classId){
        return this.af.database.list("/classes/" + classId + "/activities/")
    }

    // deletes an activity, given classId and activityId.
    public deleteActivity(classId, activityId){
        return this.af.database.object("/classes/" + classId + "/activities/" + activityId).remove();
    }

    // TODO if we use subscribe, this function can't return. if not subscribe, we can't query the birthdays
    // TODO after query. not using angularfire2 may be a solution. ".child('studentBirthDate')" might work in firebase library.
    // TODO also, we can subscribe here and use callback, but it's redundant.
    // TODO in this case, retrieving the birthdays should be handled on the front-end.
    // returns students of class.
    public getBirthdays(classId){
        this.af.database.list("/parents/", {
            query: {
                orderByChild: 'classId',
                equalTo: classId
            }
        })
    }
}
