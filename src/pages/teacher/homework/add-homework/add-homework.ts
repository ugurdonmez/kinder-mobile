
import { Component, OnInit } from '@angular/core';
import { ParentModel } from "../../../../models/parent-model";
import { ClassModel } from "../../../../models/class-model";
import { NavParams } from "ionic-angular";
import { HomeworkProvider } from "../../../../providers/homework-provider";

@Component({
   selector: 'teacher-homework-page',
   templateUrl: 'teacher-homework.html',
   providers: []
})

export class TeacherAddHomeworkPage implements OnInit {

   private myDate: string
   private parents: Array<ParentModel>
   private class: ClassModel
   private selectedStudent: number
   private commentText: string

   constructor(public navParams: NavParams,
               public homeworkProvider: HomeworkProvider) {

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
}
