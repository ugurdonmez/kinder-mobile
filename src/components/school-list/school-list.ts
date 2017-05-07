import {Component} from '@angular/core';
import {Translator} from "../../app/translator";
import {SchoolModel} from "../../models/school-model";
import {Schools} from "../../providers/schools";

@Component({
   selector: 'school-list',
   templateUrl: 'school-list.html',
   providers: [Schools, Translator]
})

export class SchoolListDirective {

   private schools: Array<SchoolModel>

   constructor(public schoolProvider: Schools,
               public translator: Translator) {

      console.log('SchoolListDirective: constructor()')

      this.schoolProvider.getSchoolByBranchAdminId()
         .then(res => {
            console.log('SchoolListDirective: constructor schools of branch admin ')
            console.log(res)
            this.schools = res
         })
   }

}
