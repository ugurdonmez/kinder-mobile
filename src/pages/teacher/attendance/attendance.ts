

import { Component, OnInit } from '@angular/core';
import {ParentModel} from "../../../models/parent-model";
import {NavParams} from "ionic-angular";

@Component({
   selector: 'teacher-attendance-page',
   templateUrl: 'attendance.html',
   providers: []
})

export class TeacherAttendancePage implements OnInit {

   private myDate:string
   private parents: Array<ParentModel>
   private selectedStudent: number

   constructor(public navParams: NavParams) {

   }

   ngOnInit(): void {
      console.log('TeacherAttendancePage: onInit()')

      this.myDate = new Date().toISOString();
      console.log('myDate ' + this.myDate)


      this.parents = JSON.parse(this.navParams.get('parentsStr'))
      console.log(this.parents)

      this.selectedStudent = 0
   }

   private selectStudent(p: number): void {
      console.log('select student')
      console.log(p)

      this.selectedStudent = p
   }
}
