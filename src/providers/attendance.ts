import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

import {Parents} from "./parents";

@Injectable()
export class Attendance {

    constructor(public af: AngularFire, private parentsProvider: Parents){
    }


    public markAllStudentsHere(classId:string, date:string){
        // this should be called by the teacher. marks all the students as here.
        // also it overwrites "absent" students as all "here".
        this.parentsProvider.getParentsOfClass(classId).then(studentsOfClass => {
            // console.log(studentsOfClass);
            studentsOfClass.forEach( student => {
                this.markStudentHere(student.id, classId, date, true);
            })
        })
    }

    public markStudentHere(studentId:string, classId:string, date:string, hereStatus:boolean){
        // hereStatus is true if student is here, false if absent. for now, studentId is parentId in our design. (temporarily)
        // date is isodate. it can be obtained using "new Date().toISOString().substring(0, 10);"
        // console.log("markStudentHere called with: ", studentId, classId, date, hereStatus);
        this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId).set(
            hereStatus
        )
    }

    public getAttendanceOf(classId:string, date:string, studentId?:string) : any{
        // returns attendance status of all students in that class on that date.
        // if studentId is indicated, returns attendance status of only that student on that date.
        if(studentId)
            return this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId);
        else
            return this.af.database.list("/classes/" + classId + "/attendance/" + date);
    }
}
