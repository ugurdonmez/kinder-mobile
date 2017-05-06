
import {Component} from '@angular/core';
import {Branches} from "../../providers/branches";
import {Translator} from "../../app/translator";
import {BranchModel} from "../../models/branch-model";

@Component({
   selector: 'branch-list',
   templateUrl: 'branch-list.html',
   providers: [Branches, Translator]
})

export class BranchListDirective {

   private branches: Array<BranchModel>

   constructor(public branchProvider: Branches,
               public translator: Translator) {

      console.log('BranchListDirective: constructor()')

      this.branchProvider.getBranchAdminBranches()
         .then(res => {
            console.log('BranchListDirective: constructor branches of school admin ')
            console.log(res)
            this.branches = res
         })
   }

   // ionViewDidLoad() {
   //    console.log('BranchListDirective: ionViewDidLoad()')
   //    this.branchProvider.getSchoolAdminBranches()
   //       .then(res => {
   //          console.log('BranchListDirective: branches of school admin ')
   //          console.log(res)
   //       })
   // }

}
