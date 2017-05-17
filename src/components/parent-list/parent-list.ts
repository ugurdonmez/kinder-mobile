import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Schools} from "../../providers/schools";
import {ParentModel} from "../../models/parent-model";
import {Parents} from "../../providers/parents";

@Component({
   selector: 'parent-list',
   templateUrl: 'parent-list.html',
   providers: [Schools, Translator]
})

export class ParentListDirective implements OnInit {

   @Input() role: string;

   private parents: Array<ParentModel>

   constructor(public parentProvider:Parents,
               public translator: Translator) {
   }

   ngOnInit(): void {
      // console.log('ParentListDirective: onInit()')
      // console.log(this.role)

      if (this.role == 'branch-admin') {
         this.parentProvider.getParentsByBranchAdminId()
            .then(res => {
               this.parents = res
            })
      } else if (this.role == 'school-admin') {
         this.parentProvider.getParentsBySchoolAdminId()
            .then(res => {
               this.parents = res
         })
      }
   }

}
