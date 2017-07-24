
import { Component, OnInit } from '@angular/core';
import { ParentModel } from "../../../../models/parent-model";
import { ClassModel } from "../../../../models/class-model";
import { NavParams } from "ionic-angular";
import { HomeworkProvider } from "../../../../providers/homework-provider";
import {HomeworkModel} from "../../../../models/homework-model";

@Component({
   selector: 'teacher-add-homework-page',
   templateUrl: 'add-homework.html',
   providers: []
})

export class TeacherAddHomeworkPage implements OnInit {

   private myDate: string
   private subject: string
   private content: string
   private parent: ParentModel
   private class: ClassModel

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

      this.parent = JSON.parse(this.navParams.get('parentStr'))
      console.log(this.parent)

      this.class = JSON.parse(this.navParams.get('classStr'))
      console.log(this.class)
   }

   private submit(): void {
      let hw: HomeworkModel = new HomeworkModel()

      hw.parentId = this.parent.id
      hw.creationDate = new Date().getTime()
      hw.dueDate = new Date(this.myDate).getTime()
      hw.subject = this.subject
      hw.content = this.content

      this.homeworkProvider.addHomeworkNew(hw)

      // TODO: make in promise
      alert("homework added")

      console.log('homework added submit')
   }
}
