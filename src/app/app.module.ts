import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

// Importing provider
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

import {AuthService} from '../providers/auth-service';
import {AuthData} from '../providers/auth-data';
import {Branches} from "../providers/branches";

// Localization
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {Translator} from './translator';

// Importing pages
import {LoginPage} from '../pages/login/login';
import {LoginDialog} from '../pages/login/login-dialog/login-dialog';
import {HomeHeaderDirective} from '../components/home-header/home-header';
import {LogoutButtonDirective} from '../components/logout-button-directive/logout-button-directive';
import {Schools} from "../providers/schools";
import {Classes} from "../providers/classes";
import {BranchAdminHomePage} from "../pages/branch-admin/home/home";
import {BranchAdminStudentPage} from "../pages/branch-admin/student/student";
import {BranchAdminTeacherPage} from "../pages/branch-admin/teacher/teacher";
import {BranchAdminMePage} from "../pages/branch-admin/me/me";
import {SchoolAdminHomePage} from "../pages/school-admin/home/home";
import {SchoolAdminMePage} from "../pages/school-admin/me/me";
import {SchoolAdminStudentPage} from "../pages/school-admin/student/student";
import {SchoolAdminTeacherPage} from "../pages/school-admin/teacher/teacher";
import {SchoolListDirective} from "../components/school-list/school-list";
import {BranchAdminSchoolPage} from "../pages/branch-admin/school/school";
import {BranchListDirective} from "../components/branch-list/branch-list";
import {Parents} from "../providers/parents";
import {Teachers} from "../providers/teachers";
import {Activity} from "../providers/activity";
import {WeeklyActivity} from "../providers/weeklyactivity";
import {Invitation} from "../providers/invitation";
import {Birthday} from "../providers/birthday";
import {Reminder} from "../providers/reminder";
import {WeeklyMealMenu} from "../providers/weeklymealmenu";
import {Homework} from "../providers/homework";
import {Gallery} from "../providers/gallery";
import {Feedback} from "../providers/feedback";
import {Attendance} from "../providers/attendance";
import {Message} from "../providers/message";
import {TeacherListDirective} from "../components/teacher-list/teacher-list";
import {BranchAdminClassPage} from "../pages/branch-admin/class/class";
import {SchoolAdminClassPage} from "../pages/school-admin/class/class";
import {BranchDetailsDirective} from "../components/branch-details/branch-details";
import {ClassListDirective} from "../components/class-list/class-list";

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
      LoginPage,
      LoginDialog,
      BranchAdminHomePage,
      BranchAdminStudentPage,
      BranchAdminTeacherPage,
      BranchAdminClassPage,
      BranchAdminMePage,
      BranchAdminSchoolPage,
      SchoolAdminHomePage,
      SchoolAdminMePage,
      SchoolAdminStudentPage,
      SchoolAdminTeacherPage,
      SchoolAdminClassPage,
      HomeHeaderDirective,
      LogoutButtonDirective,
      SchoolListDirective,
      TeacherListDirective,
      BranchDetailsDirective,
      ClassListDirective,
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
      LoginPage,
      LoginDialog,
      BranchAdminHomePage,
      BranchAdminStudentPage,
      BranchAdminTeacherPage,
      BranchAdminMePage,
      BranchAdminSchoolPage,
      BranchAdminClassPage,
      SchoolAdminHomePage,
      SchoolAdminMePage,
      SchoolAdminStudentPage,
      SchoolAdminTeacherPage,
      SchoolAdminClassPage,
   ],
   providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService,
      AuthData,
      Translator,
      Branches,
      Schools,
      Classes,
      Parents,
      Teachers,
      Activity,
      WeeklyActivity,
      Invitation,
      Birthday,
      Reminder,
      WeeklyMealMenu,
      Homework,
      Gallery,
      Feedback,
      Attendance,
      Message,
   ]
})


export class AppModule {
}
