
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";
import {BranchModel} from "../../../models/branch-model";

@Component({
   selector: 'page-school-admin-branch',
   templateUrl: 'branch.html',
   providers: [Branches, Translator]
})

export class SchoolAdminBranchPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public branchProvider: Branches,
               public translator: Translator
   ) {

   }

   ionViewDidLoad() {
      // this.runTests();
   }

   private runTests() {
      // branchProvider.getSchoolAdminBranches() Test
      console.log('branchProvider.getSchoolAdminBranches() Test')
      this.branchProvider.getSchoolAdminBranches()
          .then(res => {
             console.log(res)
          })

      // branchProvider.getAllBranches() Test
      this.branchProvider.getAllBranches()
          .then(response => {
             console.log('branchProvider.getAllBranches() Test with subscribe:')
             console.log(response)
          })

      // branchProvider.getBranch() Test
      console.log('branchProvider.getBranch() Test raw:')
      console.log(this.branchProvider.getBranch('-KaEb4P-cddA6VHNoMOW'))
      this.branchProvider.getBranch('-KaEb4P-cddA6VHNoMOW')
          .then(response => {
             console.log('branchProvider.getBranch() Test with subscribe:')
             console.log(response)
          })
   }
}
