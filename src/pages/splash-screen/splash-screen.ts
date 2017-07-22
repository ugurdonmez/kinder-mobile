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
import {LoginPage} from "../login/login";
import {UserRoleModel} from "../../models/user-role-model";

@Component({
   selector: 'page-splash-screen',
   templateUrl: 'splash-screen.html'
})

export class SplashScreenPage {

   private translate: TranslateService;
   private roleSelectorToggle: boolean;
   private allRolesOfUser: UserRoleModel[];

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator,
               public authData: AuthData,
   ) {
      this.translate = translator.translatePipe;
      this.roleSelectorToggle = false;
   }

   ionViewDidLoad() {
      this.authData.getUserRoles()
         .then(snapshot => {
            this.allRolesOfUser = snapshot
            if (this.allRolesOfUser.length == 0)
            {
               this.navigateForOldDb()
               return
            }

            console.log('this.allRolesOfUser: ')
            console.log(this.allRolesOfUser)

            console.log('!this.allRolesOfUser: ')
            console.log(!this.allRolesOfUser)

            console.log('!!this.allRolesOfUser: ')
            console.log(!!this.allRolesOfUser)

            console.log('array.length == 0')
            console.log(this.allRolesOfUser.length == 0)

            if (this.allRolesOfUser.length <= 1){
               this.navigateToRoleHome(this.allRolesOfUser[0])
            }
            else{
               this.roleSelectorToggle = true;
            }
         });
   }

   private navigateToRoleHome(role) {
      if (role.name == 'branch-admin') {
         this.navCtrl.setRoot(BranchAdminHomePage, {role: role})
      } else if (role.name == 'school-admin') {
         this.navCtrl.setRoot(SchoolAdminHomePage, {role: role})
      } else if (role.name == 'parent') {
         this.navCtrl.setRoot(ParentHomePage, {role: role})
      } else if (role.name == 'teacher') {
         this.navCtrl.setRoot(TeacherHomePage, {role: role})
      }
   }

   private navigateForOldDb() {
      console.log('navigateForOldDb called')
      this.authData.getUser()
         .then(snapshot => {
            console.log('myapp navigate')

            const role = snapshot.role;

            if (role == 'branch-admin') {
               this.navCtrl.setRoot(BranchAdminHomePage, {role: role});
            } else if (role == 'school-admin') {
               this.navCtrl.setRoot(SchoolAdminHomePage, {role: role});
            } else if (role == 'parent') {
               this.navCtrl.setRoot(ParentHomePage, {role: role});
            } else if (role == 'teacher') {
               this.navCtrl.setRoot(TeacherHomePage, {role: role});
            } else {
               this.navCtrl.setRoot(LoginPage);
            }
         })
   }
}
