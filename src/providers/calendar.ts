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

    public deleteReminderFromThisUser(reminderId){
        return this.deleteReminder(this.authDataProvider.getUserId(), reminderId);
    }

    public deleteReminder(userId, reminderId){
        return this.af.database.object("/user-reminders/" + userId + "/" + reminderId).remove();
    }



    // public markAllStudentsHere(classId:string, date:string){
    //     // this should be called by the teacher. marks all the students as here.
    //     // also it overwrites "absent" students as all "here".
    //     this.parentsProvider.getParentsOfClass(classId).subscribe(studentsOfClass => {
    //         // console.log(studentsOfClass);
    //         studentsOfClass.forEach( student => {
    //             this.markStudentHere(student.$key, classId, date, true);
    //         })
    //     })
    // }
    //
    // public markStudentHere(studentId:string, classId:string, date:string, hereStatus:boolean){
    //     // hereStatus is true if student is here, false if absent. for now, studentId is parentId in our design. (temporarily)
    //     // date is isodate. it can be obtained using "new Date().toISOString().substring(0, 10);"
    //     // console.log("markStudentHere called with: ", studentId, classId, date, hereStatus);
    //     this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId).set(
    //         hereStatus
    //     )
    // }
    //
    // public getAttendanceOf(classId:string, date:string, studentId?:string) : any{
    //     // returns attendance status of all students in that class on that date.
    //     // if studentId is indicated, returns attendance status of only that student on that date.
    //     if(studentId)
    //         return this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId);
    //     else
    //         return this.af.database.list("/classes/" + classId + "/attendance/" + date);
    // }
}
