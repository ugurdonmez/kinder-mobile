import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CalenderPage } from '../calender/calender';

import { MenuController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
// import { LoginPage } from '../login/login';
import { SchoolAdminBranchesPage } from '../school-admin-branches/school-admin-branches';
import { SchoolAdminAddUpdateBranchPage } from '../school-admin-add-update-branch/school-admin-add-update-branch';
import { SchoolAdminTeachersPage } from '../school-admin-teachers/school-admin-teachers';
import { SchoolAdminAddUpdateClassPage } from '../school-admin-add-update-class/school-admin-add-update-class';
import {InviteOthersPage} from "../invite-others/invite-others";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";
import {TeacherHomePage} from "../teacher-home/teacher-home";
import {SchoolAdminSchoolsPage} from "../school-admin-schools/school-admin-schools";
import {Branches} from "../../providers/branches";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [Translator, Branches]
})

export class HomePage {
    private translate: TranslateService;
    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData,
                public translator: Translator,
                private branchesProvider: Branches) {
        this.translate = translator.translatePipe;
        this.authData.getUserRole().subscribe(
            snapshot => {
                console.log("user role:");
                console.log(snapshot);
                if (snapshot.$value === "teacher"){
                    this.navCtrl.setRoot(TeacherHomePage);
                }
                else if (snapshot.$value === "branch-admin"){
                    branchesProvider.getUserBranches().subscribe(snapshot => {
                        if (snapshot.length > 0){
                            console.log("snapshot:");
                            console.log(snapshot);
                            this.navCtrl.setRoot(SchoolAdminSchoolsPage, {'branchId': snapshot[0].$key});
                        }
                        else{
                            this.navCtrl.setRoot(SchoolAdminAddUpdateBranchPage);
                        }
                    })
                }
            }
        )
    }

    openCalender(page) {

        console.log('open calender');
        console.log(page);

        this.navCtrl.push(CalenderPage);
    }

    logout() {
        console.log('logout clicked');
        this.authData.logoutUser();
    }

    openSchoolAdminBranch(page) {
        console.log('open school admin branch')

        this.navCtrl.push(SchoolAdminBranchesPage);
    }

    openSchoolAdminBranchUpdate(page) {
        console.log('open school admin branch')

        this.navCtrl.push(SchoolAdminAddUpdateBranchPage);
    }

    openSchoolAdminTeachers(page) {
        console.log('open school admin teachers')

        this.navCtrl.push(SchoolAdminTeachersPage);
    }

    openSchoolAdminClasses(page) {
        console.log('open school admin classes')

        this.navCtrl.push(SchoolAdminAddUpdateClassPage);
    }

    openInvitePeople(page) {
        this.navCtrl.push(InviteOthersPage);
    }
}
