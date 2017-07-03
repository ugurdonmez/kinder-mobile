import {Injectable} from '@angular/core';

import {AngularFire} from 'angularfire2';

import {Parents} from "./parents";
import {AttendanceModel} from "../models/attendance-model";

@Injectable()
export class AttendanceProvider {

   constructor(public af: AngularFire,
               private parentsProvider: Parents) {
   }

   public setStudentAttendance(attendance: AttendanceModel): any {

      this.af.database.object("/attendance/"+attendance.parentId+attendance.day)
         .set(attendance)
         .then(res => {
            console.log('attendance written')
            console.log(res)
         })
   }

   public getStudentAtendance(parentId: string, attendanceDateKey: string): Promise<AttendanceModel> {
      return this.af.database.object("/attendance/" + parentId + attendanceDateKey)
         .map(obj => {
            return this.castObjectToModel(obj)
         })
         .first()
         .toPromise()
   }

   public markAllStudentsHere(classId: string, date: string): void {
      // this should be called by the teacher. marks all the students as here.
      // also it overwrites "absent" students as all "here".
      this.parentsProvider.getParentsOfClass(classId)
         .then(studentsOfClass => {
            // console.log(studentsOfClass);
            studentsOfClass.forEach(student => {
               this.markStudentHere(student.id, classId, date, true);
            })
         })
   }

   public markStudentHere(studentId: string, classId: string, date: string, hereStatus: boolean): void {
      // hereStatus is true if student is here, false if absent. for now, studentId is parentId in our design. (temporarily)
      // date is isodate. it can be obtained using "new Date().toISOString().substring(0, 10);"
      // console.log("markStudentHere called with: ", studentId, classId, date, hereStatus);
      this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId).set(
         hereStatus
      )
   }

   // returns attendance status of all students in that class on that date.
   // if studentId is indicated, returns attendance status of only that student on that date.
   public getAttendanceOf(classId: string, date: string): Promise<AttendanceModel[]>;
   public getAttendanceOf(classId: string, date: string, studentId: string): Promise<AttendanceModel>;
   public getAttendanceOf(classId: string, date: string, studentId?: string) {
      if (studentId)
         return this.af.database.object("/classes/" + classId + "/attendance/" + date + "/" + studentId)
            .map(obj => {
               return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
      else
         return this.af.database.list("/classes/" + classId + "/attendance/" + date)
            .map(obj => {
               return this.castListToModel(obj)
            })
            .first()
            .toPromise()
   }

   // Conversion: FirebaseListObservable -> Model
   private castListToModel(objs: any[]): AttendanceModel[] {
      let modelArray: Array<AttendanceModel> = [];
      for (let obj of objs) {
         var model = new AttendanceModel().fromObject(obj);
         modelArray.push(model);
      }
      return modelArray;
   }

   // Conversion: FirebaseObjectObservable -> Model
   private castObjectToModel(obj: any): AttendanceModel {
      return new AttendanceModel().fromObject(obj);
   }
}
