
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

      // this.branchProvider.getBranchAdminBranches()
      //    .then(res => {
      //       console.log('SchoolListDirective: constructor branches of school admin ')
      //       console.log(res)
      //       this.branches = res
      //    })
   }

   // ionViewDidLoad() {
   //    console.log('SchoolListDirective: ionViewDidLoad()')
   //    this.branchProvider.getSchoolAdminBranches()
   //       .then(res => {
   //          console.log('SchoolListDirective: branches of school admin ')
   //          console.log(res)
   //       })
   // }

}
