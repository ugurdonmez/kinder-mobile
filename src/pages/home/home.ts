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
import {Schools} from "../../providers/schools";
import {SchoolAdminAddUpdateSchoolPage} from "../school-admin-add-update-school/school-admin-add-update-school";
import {SchoolAdminClassesPage} from "../school-admin-classes/school-admin-classes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [Translator, Branches, Schools]
})

export class HomePage {
    private translate: TranslateService;
    private myUserRole: string;


    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData,
                public translator: Translator,
                private branchesProvider: Branches,
                private schoolsProvider: Schools) {
        this.translate = translator.translatePipe;
        this.loadUserRole();
        this.authData.getUserRole().subscribe(
            snapshot => {
                if (snapshot.$value === "teacher"){
                    this.navCtrl.setRoot(TeacherHomePage);
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

    private loadUserRole() {
        this.authData.getUser().subscribe(snapshot => {
            this.myUserRole = snapshot.role;
        });
    }

    private openMyBranch(page){
        this.branchesProvider.getUserBranches().subscribe(snapshot => {
            if (snapshot.length > 0){
                this.navCtrl.push(SchoolAdminSchoolsPage, {'branchId': snapshot[0].$key});
            }
            else{
                this.navCtrl.push(SchoolAdminAddUpdateBranchPage);
            }
        })
    }

    private openMySchool(page){
        this.schoolsProvider.getUserSchools().subscribe(snapshot => {
            if (snapshot.length > 0){
                this.navCtrl.push(SchoolAdminClassesPage, {'schoolId': snapshot[0].$key});
            }
            else{
                this.authData.getUser().subscribe(snapshot => {
                    this.navCtrl.push(SchoolAdminAddUpdateSchoolPage, {'branchId': snapshot.branchId});
                })

            }
        })
    }

}
