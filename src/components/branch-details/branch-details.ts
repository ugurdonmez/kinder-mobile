import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Schools} from "../../providers/schools";
import {Branches} from "../../providers/branches";
import {BranchModel} from "../../models/branch-model";
import {NavController} from "ionic-angular";

@Component({
   selector: 'branch-details',
   templateUrl: 'branch-details.html',
   providers: [Branches, Translator]
})

export class BranchDetailsDirective implements OnInit {

   private branch: BranchModel

   constructor(public branchProvider: Branches,
               public translator: Translator,
               private navController: NavController) {
   }

   ngOnInit(): void {
      console.log('TeacherListDirective: onInit()')

      this.branchProvider.getBranchAdminBranches()
         .then(res => {
            this.branch = res[0] // assuming user has only one branch.
         })
   }

   private editBranchButtonClicked(){
      // this.navController.push()
   }

}
