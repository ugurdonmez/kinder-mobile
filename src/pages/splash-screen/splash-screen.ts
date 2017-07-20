import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ClassModel} from "../../../models/class-model";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {BranchAdminHomePage} from "../branch-admin/home/home";
import {TeacherHomePage} from "../teacher/home/home";
import {ParentHomePage} from "../parent/home/home";
import {SchoolAdminHomePage} from "../school-admin/home/home";
import {Translator} from "../../app/translator";

@Component({
   selector: 'page-splash-screen',
   templateUrl: 'splash-screen.html'
})

export class SplashScreenPage {

   private translate: TranslateService;
   private role: any;
   private roleSelectorToggle: boolean;
   private allRolesOfUser: any;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator,
               public authData: AuthData,
   ) {
      this.translate = translator.translatePipe;
      this.roleSelectorToggle = false;
   }

   ionViewDidLoad() {
      this.authData.getUser()
         .then(snapshot => {
            this.allRolesOfUser = snapshot.roles
            if (!this.allRolesOfUser)
               this.allRolesOfUser = [snapshot.role]

            console.log('this.allRolesOfUser: ')
            console.log(this.allRolesOfUser)

            if (this.allRolesOfUser.length <= 1){
               this.navigateToRoleHome(this.allRolesOfUser[0])
            }
            else{
               this.roleSelectorToggle = true;
            }
         });
   }

   private navigateToRoleHome(role) {
      if (this.role.name == 'branch-admin') {
         this.navCtrl.setRoot(BranchAdminHomePage, {role: role})
      } else if (this.role.name == 'school-admin') {
         this.navCtrl.setRoot(SchoolAdminHomePage, {role: role})
      } else if (this.role.name == 'parent') {
         this.navCtrl.setRoot(ParentHomePage, {role: role})
      } else if (this.role.name == 'teacher') {
         this.navCtrl.setRoot(TeacherHomePage, {role: role})
      }
   }
}
