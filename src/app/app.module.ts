import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {RegisterPage} from '../pages/register/register';

import {AuthService} from '../providers/auth-service';

// Importing pages
import {LoginPage} from '../pages/login/login';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {CalenderPage} from '../pages/calender/calender';
import {SchoolAdminBranchesPage} from '../pages/school-admin-branches/school-admin-branches';
import {SchoolAdminAddUpdateBranchPage} from '../pages/school-admin-add-update-branch/school-admin-add-update-branch';
import {SchoolAdminAddUpdateClassPage} from '../pages/school-admin-add-update-class/school-admin-add-update-class';
import {SchoolAdminAddUpdateTeacherPage} from '../pages/school-admin-add-update-teacher/school-admin-add-update-teacher';
import {SchoolAdminTeachersPage} from '../pages/school-admin-teachers/school-admin-teachers';
import {SchoolAdminSchoolsPage} from '../pages/school-admin-schools/school-admin-schools';
import {SchoolAdminAddUpdateSchoolPage} from "../pages/school-admin-add-update-school/school-admin-add-update-school";
import {SchoolAdminClassesPage} from "../pages/school-admin-classes/school-admin-classes";
import {SchoolAdminEditBranchPage} from "../pages/school-admin-edit-branch/school-admin-edit-branch";
import {SchoolAdminEditSchoolPage} from "../pages/school-admin-edit-school/school-admin-edit-school";
import {SchoolAdminTeacherDetailsPage} from "../pages/school-admin-teacher-details/school-admin-teacher-details";
import {SchoolAdminEditTeacherPage} from "../pages/school-admin-edit-teacher/school-admin-edit-teacher";
import {SchoolAdminClassDetailsPage} from "../pages/school-admin-class-details/school-admin-class-details";
import {SchoolAdminEditClassPage} from "../pages/school-admin-edit-class/school-admin-edit-class";
import {InviteOthersPage} from "../pages/invite-others/invite-others";
import {AddParentPage} from "../pages/add-parent/add-parent";
import {WeeklyMenuPage} from "../pages/weekly-menu/weekly-menu";
import {TeacherHomePage} from "../pages/homes/teacher-home/teacher-home";
import {DailyTeacherFeedbackPage} from "../pages/daily-teacher-feedback/daily-teacher-feedback";
import {HomeworksPage} from "../pages/homeworks/homeworks";
import {BranchAdminHomePage} from "../pages/homes/branch-admin-home/branch-admin-home";
import {GalleryPage} from "../pages/gallery/gallery";
import {LoginDialog} from "../pages/login/login-dialog/login-dialog";
import {ParentHomePage} from "../pages/homes/parent-home/parent-home";
import {MessagePage} from "../pages/message/message";
import {SchoolAdminHomePage} from "../pages/homes/school-admin-home/school-admin-home";
import {MessageDialogComponent} from "../components/message-dialog/message-dialog";
import {MessageParentPage} from "../pages/message-parent/message-parent";
import {SchoolAdminWallPage} from "../pages/school-admin-class-wall/school-admin-class-wall";


// Importing provider
import {AuthData} from '../providers/auth-data';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {Classes} from "../providers/classes";
import {Schools} from "../providers/schools";

// Localization
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http} from "@angular/http";
import {Translator} from "./translator";
import {WeeklyActivityPlanPage} from "../pages/weekly-activity-plan/weekly-activity-plan";
import {DailyParentFeedbackPage} from "../pages/daily-parent-feedback/daily-parent-feedback";
import {AttendancePage} from "../pages/attendance/attendance";
import {LogoutButtonDirective} from "../components/logout-button-directive/logout-button-directive";
import {HomeHeaderDirective} from "../components/home-header/home-header";
import {DialogPage} from "../pages/message/dialog/dialog";

// AF2 Settings
export const firebaseConfig = {
   apiKey: "AIzaSyC3ZHNBANkIOGZsJwv4iZyhqUzXnYrz2sk",
   authDomain: "kindergarden-5bcfa.firebaseapp.com",
   databaseURL: "https://kindergarden-5bcfa.firebaseio.com",
   storageBucket: "kindergarden-5bcfa.appspot.com",
   messagingSenderId: "594048241170"
};

const myFirebaseAuthConfig = {
   provider: AuthProviders.Password,
   method: AuthMethods.Password
};

export function createTranslateLoader(http: Http) {
   return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};


@NgModule({
   declarations: [
      MyApp,
      CalenderPage,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      RegisterPage,
      SchoolAdminBranchesPage,
      SchoolAdminAddUpdateBranchPage,
      SchoolAdminAddUpdateClassPage,
      SchoolAdminAddUpdateTeacherPage,
      SchoolAdminTeachersPage,
      SchoolAdminSchoolsPage,
      SchoolAdminAddUpdateSchoolPage,
      SchoolAdminClassesPage,
      SchoolAdminEditBranchPage,
      SchoolAdminEditSchoolPage,
      SchoolAdminTeacherDetailsPage,
      SchoolAdminEditTeacherPage,
      SchoolAdminClassDetailsPage,
      SchoolAdminEditClassPage,
      InviteOthersPage,
      AddParentPage,
      WeeklyMenuPage,
      DailyTeacherFeedbackPage,
      HomeworksPage,
      LoginDialog,
      GalleryPage,
      BranchAdminHomePage,
      ParentHomePage,
      SchoolAdminHomePage,
      TeacherHomePage,
      MessagePage,
      WeeklyActivityPlanPage,
      DailyParentFeedbackPage,
      AttendancePage,
      LogoutButtonDirective,
      HomeHeaderDirective,
      MessageDialogComponent,
      MessageParentPage,
      DialogPage,
      SchoolAdminWallPage
   ],
   imports: [
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
      TranslateModule.forRoot({
         provide: TranslateLoader,
         useFactory: (createTranslateLoader),
         deps: [Http]
      })
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      MyApp,
      CalenderPage,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      RegisterPage,
      SchoolAdminBranchesPage,
      SchoolAdminAddUpdateBranchPage,
      SchoolAdminAddUpdateClassPage,
      SchoolAdminAddUpdateTeacherPage,
      SchoolAdminTeachersPage,
      SchoolAdminSchoolsPage,
      SchoolAdminAddUpdateSchoolPage,
      SchoolAdminClassesPage,
      SchoolAdminEditBranchPage,
      SchoolAdminEditSchoolPage,
      SchoolAdminTeacherDetailsPage,
      SchoolAdminEditTeacherPage,
      SchoolAdminClassDetailsPage,
      SchoolAdminEditClassPage,
      InviteOthersPage,
      AddParentPage,
      WeeklyMenuPage,
      DailyTeacherFeedbackPage,
      HomeworksPage,
      LoginDialog,
      GalleryPage,
      BranchAdminHomePage,
      ParentHomePage,
      SchoolAdminHomePage,
      TeacherHomePage,
      MessagePage,
      WeeklyActivityPlanPage,
      DailyParentFeedbackPage,
      AttendancePage,
      MessageParentPage,
      DialogPage,
      SchoolAdminWallPage
   ],
   providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService,
      AuthData,
      Classes,
      Schools,
      Translator
   ]
})


export class AppModule {
}
