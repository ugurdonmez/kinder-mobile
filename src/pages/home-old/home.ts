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
import {Teachers} from "../../providers/teachers";
import {SchoolAdminAddUpdateTeacherPage} from "../school-admin-add-update-teacher/school-admin-add-update-teacher";
import {Parents} from "../../providers/parents";
import {SchoolAdminClassDetailsPage} from "../school-admin-class-details/school-admin-class-details";
import {AddParentPage} from "../add-parent/add-parent";
import {WeeklyMenuPage} from "../weekly-menu/weekly-menu";
import {DailyTeacherFeedbackPage} from "../daily-teacher-feedback/daily-teacher-feedback";
import {HomeworksPage} from "../homeworks/homeworks";
import {GalleryPage} from "../gallery/gallery";
import {MessagePage} from "../message/message";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [Translator, Branches, Schools, Teachers, Parents]
})

export class HomePage {
    private translate: TranslateService;
    private myUserRole: string;
    private userSchoolId: any;
    private userBranch: any;


    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData,
                public translator: Translator,
                private schoolsProvider: Schools,
                private teachersProvider: Teachers,
                private parentsProvider: Parents) {
        this.authData.updateUserRoleFromInvitedUsers(); // remove after ugurdonmez87 logins
        this.translate = translator.translatePipe;
        this.loadUserRole();
    }

    openGallery(){
        this.navCtrl.push(GalleryPage);
    }

    openCalender(page) {

        console.log('open calender');
        console.log(page);

        this.navCtrl.push(CalenderPage);
    }

    openWeeklyMenu(){
        this.navCtrl.push(WeeklyMenuPage);
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

    private openFeedbackPage(){
        this.navCtrl.push(DailyTeacherFeedbackPage);
    }

    private openHomeworkPage(){
        this.navCtrl.push(HomeworksPage);
    }

    private openMessages(){
        this.navCtrl.push(MessagePage)
    }
}
