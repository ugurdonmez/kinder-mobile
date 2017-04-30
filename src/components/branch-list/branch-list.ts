
import {Component} from '@angular/core';
import {Branches} from "../../providers/branches";
import {Translator} from "../../app/translator";

@Component({
   selector: 'branch-list',
   templateUrl: 'branch-list.html',
   providers: [Branches, Translator]
})

export class BranchListDirective {

   constructor(public branchProvider: Branches,
               public translator: Translator) {

      console.log('BranchListDirective: constructor()')

   }

   ionViewDidLoad() {
      console.log('BranchListDirective: ionViewDidLoad()')
      this.branchProvider.getSchoolAdminBranches()
         .then(res => {
            console.log('BranchListDirective: branches of school admin ')
            console.log(res)
         })
   }

}
