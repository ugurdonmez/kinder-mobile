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
import {SchoolAdminHomePage} from '../pages/school-admin/home/home';
import {SchoolAdminMePage} from '../pages/school-admin/me/me';
import {SchoolAdminTeacherPage} from '../pages/school-admin/teacher/teacher';
import {SchoolAdminStudentPage} from '../pages/school-admin/student/student';
import {SchoolAdminBranchPage} from '../pages/school-admin/branch/branch';
import {HomeHeaderDirective} from '../components/home-header/home-header';
import {LogoutButtonDirective} from '../components/logout-button-directive/logout-button-directive';
import {Schools} from "../providers/schools";
import {Classes} from "../providers/classes";
import {BranchListDirective} from "../components/branch-list/branch-list";

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
      SchoolAdminHomePage,
      SchoolAdminBranchPage,
      SchoolAdminMePage,
      SchoolAdminStudentPage,
      SchoolAdminTeacherPage,
      HomeHeaderDirective,
      LogoutButtonDirective,
      BranchListDirective,
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
      SchoolAdminHomePage,
      SchoolAdminBranchPage,
      SchoolAdminMePage,
      SchoolAdminStudentPage,
      SchoolAdminTeacherPage,
   ],
   providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService,
      AuthData,
      Translator,
      Branches,
      Schools,
      Classes,
   ]
})


export class AppModule {
}
