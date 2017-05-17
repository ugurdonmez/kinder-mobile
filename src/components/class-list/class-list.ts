import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Schools} from "../../providers/schools";
import {Classes} from "../../providers/classes";
import {ClassModel} from "../../models/class-model";

@Component({
   selector: 'class-list',
   templateUrl: 'class-list.html',
   providers: [Schools, Translator]
})

export class ClassListDirective implements OnInit {

   @Input() role: string;

   private classes: Array<ClassModel>

   constructor(public classProvider: Classes,
               public translator: Translator) {
   }

   ngOnInit(): void {
      // console.log('TeacherListDirective: onInit()')
      // console.log(this.role)

      if (this.role == 'branch-admin') {
         this.classProvider.getClassByBranchAdminId()
            .then(res => {
               this.classes = res
               // console.log("classes of branch admin:")
               // console.log(this.classes)
            })
      } else if (this.role == 'school-admin') {
         this.classProvider.getClassBySchoolAdminId()
            .then(res => {
               this.classes = res
         })
      }
   }

}
