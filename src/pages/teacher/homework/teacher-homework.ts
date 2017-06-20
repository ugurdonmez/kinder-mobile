

import { Component, OnInit } from '@angular/core';
import { ParentModel } from "../../../models/parent-model";
import { NavParams } from "ionic-angular";
import { ClassModel } from "../../../models/class-model";
import { AttendanceModel } from "../../../models/attendance-model";
import { AttendanceProvider } from "../../../providers/attendance-provider";

@Component({
   selector: 'teacher-homework-page',
   templateUrl: 'teacher-homework.html',
   providers: []
})

export class TeacherHomeworkPage implements OnInit {

   private myDate:string
   private parents: Array<ParentModel>
   private class:ClassModel
   private selectedStudent: number
   private commentText: string

   constructor(
      public navParams: NavParams,
      public attendanceProvider: AttendanceProvider
   ) {

   }

   ngOnInit(): void {
      console.log('TeacherHomeworkPage: onInit()')

      // let date = new Date()
      //
      // date.setDate(25)
      // date.setMonth(9)
      // date.setFullYear(1987)
      //
      // this.myDate = new Date(date).toISOString();

      this.myDate = new Date().toISOString();

      console.log('myDate ' + this.myDate)

      this.parents = JSON.parse(this.navParams.get('parentsStr'))
      console.log(this.parents)

      this.class = JSON.parse(this.navParams.get('classStr'))
      console.log(this.class)

      this.selectedStudent = 0
      this.commentText = ''
   }

   private selectStudent(p: number): void {
      console.log('select student')
      console.log(p)

      this.selectedStudent = p
   }

   private submit(): void {

      // let dateKey:string = 'dateKey' + this.myDate.split('T')[0]
      //
      // let attendanceModel: AttendanceModel = new AttendanceModel()
      //
      // attendanceModel.parentId = this.parents[this.selectedStudent].id
      // attendanceModel.classId =this.class.id
      // attendanceModel.hereStatus = this.here
      // attendanceModel.day = dateKey
      // attendanceModel.comment = this.commentText
      //
      // this.attendanceProvider.setStudentAttendance(attendanceModel)
      //
      // console.log('attendance submit')
   }
}
