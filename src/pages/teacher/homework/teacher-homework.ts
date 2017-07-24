
import { Component, OnInit } from '@angular/core';
import { ParentModel } from "../../../models/parent-model";
import {NavController, NavParams} from "ionic-angular";
import { ClassModel } from "../../../models/class-model";
import { HomeworkProvider } from "../../../providers/homework-provider";
import {TeacherAddHomeworkPage} from "./add-homework/add-homework";
import {HomeworkModel} from "../../../models/homework-model";

@Component({
   selector: 'teacher-homework-page',
   templateUrl: 'teacher-homework.html',
   providers: []
})

export class TeacherHomeworkPage implements OnInit {

   private parents: Array<ParentModel>
   private homeworks: Array<HomeworkModel>
   private class: ClassModel
   private selectedStudent: number

   constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private homeworkProvider: HomeworkProvider
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

      this.selectedStudent = 0

      this.parents = JSON.parse(this.navParams.get('parentsStr'))
      console.log(this.parents)

      this.class = JSON.parse(this.navParams.get('classStr'))
      console.log(this.class)

      this.homeworkProvider.getHomeworksNew(this.parents[this.selectedStudent].id)
         .then(res => {
            this.homeworks = res
            console.log(this.homeworks)
         })
   }

   private selectStudent(p: number): void {
      console.log('select student')
      console.log(p)

      this.selectedStudent = p

      this.homeworkProvider.getHomeworksNew(this.parents[this.selectedStudent].id)
         .then(res => {
            this.homeworks = res
            console.log(this.homeworks)
         })
   }

   private addHomework(): void {
      console.log('open teacher homework')

      let parentStr: string = JSON.stringify(this.parents[this.selectedStudent])
      console.log('parent json')
      console.log(parentStr)

      let classStr: string = JSON.stringify(this.class)
      console.log('class str')
      console.log(classStr)

      this.navCtrl.push(TeacherAddHomeworkPage, {parentStr, classStr});
   }
}
