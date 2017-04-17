
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";

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

      console.log('branch tab inside')

      this.branchProvider.getUserBranches()
         .subscribe((val) => {
            console.log('old method')
            console.log(val)
         })

      this.branchProvider.getSchoolAdminBranches()
         .then(res => {
            console.log('new method')
            console.log(res)
         })
   }


}
