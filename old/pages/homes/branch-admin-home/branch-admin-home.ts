import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from "../../../providers/auth-data";
import {Branches} from "../../../providers/branches";
import {SchoolAdminSchoolsPage} from "../../school-admin-schools/school-admin-schools";
import {SchoolAdminAddUpdateBranchPage} from "../../school-admin-add-update-branch/school-admin-add-update-branch";
import {Translator} from "../../../app/translator";
import {MessagePage} from "../../message/message";

@Component({
   selector: 'page-branch-admin-home',
   templateUrl: 'branch-admin-home.html',
   providers: [Translator, Branches]
})

export class BranchAdminHomePage {
   private userBranch: any;
   private doesUserHasBranch: boolean;

   constructor(public navCtrl: NavController,
               public translator: Translator,
               public navParams: NavParams,
               private branchesProvider: Branches,
               public authData: AuthData) {

      this.loadDoesUserHasBranch();
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad BranchAdminHomePage');
   }

   private openMyBranch(): any {
      this.navCtrl.push(SchoolAdminSchoolsPage, {'branchId': this.userBranch.$key});
   }

   private createMyBranch() {
      this.navCtrl.push(SchoolAdminAddUpdateBranchPage);
   }

   private loadDoesUserHasBranch() {
      this.branchesProvider.getUserBranches().subscribe(snapshot => {
         if (snapshot.length > 0) {
            this.doesUserHasBranch = (snapshot.length > 0);
            console.log("user has branch.");
            this.userBranch = snapshot[0]
         }
         else {
            this.doesUserHasBranch = (snapshot.length > 0);
            console.log("user has no branch.")
         }
      })
   }

   private openMessages() {
      this.navCtrl.push(MessagePage)
   }
}
