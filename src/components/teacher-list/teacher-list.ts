import {Component, Input} from '@angular/core';
import {Translator} from "../../app/translator";
import {Schools} from "../../providers/schools";
import {Teachers} from "../../providers/teachers";
import {TeacherModel} from "../../models/teacher-model";

@Component({
   selector: '[teacher-list]',
   templateUrl: 'teacher-list.html',
   providers: [Schools, Translator]
})

export class TeacherListDirective {

   @Input() role: string;

   private teachers: Array<TeacherModel>

   constructor(public teacherProvider: Teachers,
               public translator: Translator) {
      console.log('TeacherListDirective: constructor()')
      console.log(this.role)
   }


}
