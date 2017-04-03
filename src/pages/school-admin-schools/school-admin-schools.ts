import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Schools} from '../../providers/schools'
import {Branches} from "../../providers/branches";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminClassesPage} from "../school-admin-classes/school-admin-classes";
import {SchoolAdminEditBranchPage} from "../school-admin-edit-branch/school-admin-edit-branch";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";
import {SchoolAdminHomePage} from "../homes/school-admin-home/school-admin-home";

@Component({
   selector: 'page-school-admin-schools',
   templateUrl: 'school-admin-schools.html',
   providers: [Schools, Branches, Translator]
})

export class SchoolAdminSchoolsPage {
   private branchId: string;
   private allSchoolsOfBranch: any;
   private branch: FirebaseObjectObservable<any>;
   private translate: TranslateService;
   private logoURL: string;
   allTeachersOfBranch: any;

   constructor(public navCtrl: NavController,
               public schoolsProvider: Schools,
               public branchesProvider: Branches,
               private navParams: NavParams,
               public translator: Translator) {

      this.translate = translator.translatePipe;
      this.branchId = navParams.get('branchId');
      this.branch = branchesProvider.getBranch(this.branchId);
      this.allTeachersOfBranch = [];

      this.branch.subscribe(snapshot => {
         if (snapshot === null) {
            console.log(snapshot === null);
            this.navCtrl.setRoot(SchoolAdminHomePage);
         }
      });
      this.allSchoolsOfBranch = this.schoolsProvider.getSchoolsOfBranch(this.branchId);
      this.loadImage();
   }

   ionViewDidLoad() {
      console.log('Hello SchoolAdminSchoolsPage Page');
   }

   openSchoolPage(schoolId) {
      console.log('goes to class list of that school with schoolId:' + schoolId);
      this.navCtrl.push(SchoolAdminClassesPage, {'schoolId': schoolId})
   }

   openSchoolAdminSchoolAdd() {
      console.log('adds new school to branch with branchId: ' + this.branchId);

      this.navCtrl.push(InviteOthersPage, {
         'sourcePage': 'BranchPage',
         'branchId': this.branchId,
         'invitationRole': 'school-admin'
      });
   }

   openSchoolAdminEditBranchPage(branchId: string) {
      this.navCtrl.push(SchoolAdminEditBranchPage, {'branchId': this.branchId});
   }

   loadImage() {
      this.branch.subscribe(snapshot => {
         this.logoURL = snapshot.logoURL;
         console.log(this.logoURL);
      })
   }
}
