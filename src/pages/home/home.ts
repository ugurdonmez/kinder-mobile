import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CalenderPage } from '../calender/calender';

import { MenuController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { SchoolAdminBranchesPage } from '../school-admin-branches/school-admin-branches';
import { SchoolAdminAddUpdateBranchPage } from '../school-admin-add-update-branch/school-admin-add-update-branch';
import { SchoolAdminTeachersPage } from '../school-admin-teachers/school-admin-teachers';
import { SchoolAdminAddUpdateClassPage } from '../school-admin-add-update-class/school-admin-add-update-class';
import {InviteOthersPage} from "../invite-others/invite-others";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";
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
    private doesUserHasSchool: boolean;
    private doesUserHasBranch: boolean;
    private userSchool: any;
    private userBranch: any;


    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData,
                public translator: Translator,
                private branchesProvider: Branches,
                private schoolsProvider: Schools) {
        this.translate = translator.translatePipe;
        this.loadUserRole();
        this.loadDoesUserHasSchool();
        this.loadDoesUserHasBranch();
        this.authData.updateUserRoleFromInvitedUsers(); // remove after ugurdonmez87 logins
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
        this.navCtrl.push(InviteOthersPage, {'sourcePage': 'HomePage'});
    }

    private loadUserRole() {
        this.authData.getUser().subscribe(snapshot => {
            this.myUserRole = snapshot.role;
        });
    }

    private openMyBranch(): any{
        this.navCtrl.push(SchoolAdminSchoolsPage, {'branchId': this.userBranch.$key});
    }

    private createMyBranch(){
        this.navCtrl.push(SchoolAdminAddUpdateBranchPage);
    }

    private openMySchool(): any{
        this.navCtrl.push(SchoolAdminClassesPage, {'schoolId': this.userSchool.$key});
    }

    private createMySchool(){
        this.authData.getUser().subscribe(snapshot => {
            this.navCtrl.push(SchoolAdminAddUpdateSchoolPage, {'branchId': snapshot.branchId});
        })
    }

    private loadDoesUserHasSchool() {
        this.schoolsProvider.getUserSchools().subscribe(snapshot => {
            if (snapshot.length > 0){
                this.doesUserHasSchool = (snapshot.length > 0);
                console.log("user has school.");
                this.userSchool = snapshot[0]
            }
            else{
                this.doesUserHasSchool = (snapshot.length > 0);
                console.log("user has no school.")
            }
        })
    }

    private loadDoesUserHasBranch() {
        this.branchesProvider.getUserBranches().subscribe(snapshot => {
            if (snapshot.length > 0){
                this.doesUserHasBranch = (snapshot.length > 0);
                console.log("user has branch.");
                this.userBranch = snapshot[0]
            }
            else{
                this.doesUserHasBranch = (snapshot.length > 0);
                console.log("user has no branch.")
            }
        })
    }
}
