
import {Component, Input} from '@angular/core';
import {Translator} from "../../app/translator";
import {SchoolModel} from "../../models/school-model";
import {Schools} from "../../providers/schools";
import {Teachers} from "../../providers/teachers";
import {TeacherModel} from "../../models/teacher-model";

@Component({
   selector: '[teacher-list]',
   templateUrl: 'teacher-list.html',
   providers: [Schools, Translator]
})

export class TeacherListDirective {

   private teachers: Array<TeacherModel>
   @Input() adminId: string;
   @Input() adminType: string; // "branch-admin" or "school-admin"

   constructor(public teacherProvider: Teachers,
               public translator: Translator) {
      console.log('TeacherListDirective: constructor()')
      this.loadTeachers()
   }

   ionViewDidEnter() { // Warning: this function is never called. https://github.com/driftyco/ionic/issues/8414
      console.log('TeacherListDirective: ionViewDidEnter called')
   }

   ionViewDidLoad() { // Warning: this function is never called. https://github.com/driftyco/ionic/issues/8414
      console.log('TeacherListDirective: ionViewDidLoad called')
   }

   private loadTeachers(){
      console.log('admin-type:')
      console.log(this.adminType)

      if (this.adminType == "branch-admin"){
      }
      else if(this.adminType == "school-admin"){
         this.teacherProvider.getSchoolAdminTeachers(this.adminId)
         // .then(res => {
         //    console.log('TeacherListDirective: teacherProvider.getSchoolAdminTeachers:')
         //    console.log(res)
         //    this.teachers = res
         // })
      }

      this.teacherProvider.getSchoolAdminTeachers("MSF3OIMww4Ywea2TrnckaiymWV63")
   }

}
