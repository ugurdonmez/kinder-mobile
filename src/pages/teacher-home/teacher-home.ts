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
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";

@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html',
    providers: [Translator]
})

export class TeacherHomePage {
    private translate: TranslateService;
    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData,
                public translator: Translator) {
        this.translate = translator.translatePipe;
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
}