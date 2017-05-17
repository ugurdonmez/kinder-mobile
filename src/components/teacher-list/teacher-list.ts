import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Schools} from "../../providers/schools";
import {Teachers} from "../../providers/teachers";
import {TeacherModel} from "../../models/teacher-model";

@Component({
   selector: 'teacher-list',
   templateUrl: 'teacher-list.html',
   providers: [Schools, Translator]
})

export class TeacherListDirective implements OnInit {

   @Input() role: string;

   private teachers: Array<TeacherModel>

   constructor(public teacherProvider: Teachers,
               public translator: Translator) {
   }

   ngOnInit(): void {
      // console.log('TeacherListDirective: onInit()')
      // console.log(this.role)

      if (this.role == 'branch-admin') {
         this.teacherProvider.getTeacherByBranchAdminId()
            .then(res => {
               this.teachers = res
            })
      } else if (this.role == 'school-admin') {
         this.teacherProvider.getTeacherBySchoolAdminId()
            .then(res => {
               this.teachers = res
         })
      }
   }

}
