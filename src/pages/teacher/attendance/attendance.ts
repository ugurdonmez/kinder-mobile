

import { Component, OnInit } from '@angular/core';
import {ParentModel} from "../../../models/parent-model";
import {NavParams} from "ionic-angular";
import {ClassModel} from "../../../models/class-model";

@Component({
   selector: 'teacher-attendance-page',
   templateUrl: 'attendance.html',
   providers: []
})

export class TeacherAttendancePage implements OnInit {

   private myDate:string
   private parents: Array<ParentModel>
   private class:ClassModel
   private selectedStudent: number
   private here: boolean
   private commentText: string

   constructor(public navParams: NavParams) {

   }

   ngOnInit(): void {
      console.log('TeacherAttendancePage: onInit()')

      this.myDate = new Date().toISOString();
      console.log('myDate ' + this.myDate)

      this.parents = JSON.parse(this.navParams.get('parentsStr'))
      console.log(this.parents)

      this.class = JSON.parse(this.navParams.get('classStr'))
      console.log(this.class)

      this.selectedStudent = 0
      this.here = true
      this.commentText = ''
   }

   private selectStudent(p: number): void {
      console.log('select student')
      console.log(p)

      this.selectedStudent = p
   }

   private iconClicked(value: boolean): void {
      console.log('icon clicked')
      console.log(value)
      this.here = value
   }

   private submit(): void {
      console.log('attendance submit')
   }
}
