import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from 'app/app.component';

import {AuthService} from 'providers/auth-service';


// Importing provider
import {AuthData} from 'providers/auth-data';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {Classes} from 'providers/classes';
import {Schools} from 'providers/schools';

// Localization
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {Translator} from 'translator';

// Importing pages
import {LoginPage} from '/pages/login/login';
import {LoginDialog} from '/pages/login/login-dialog/login-dialog';
import {SchoolAdminBranchPage} from '/pages/school-admin/branch/';
import {SchoolAdminHome} from '/pages/school-admin/home/home';
import {SchoolAdminMePage} from '/pages/school-admin/me/me';
import {SchoolAdminStudentsPage} from '/pages/school-admin-students/school-admin-students';
import {SchoolAdminTeacherPage} from '/pages/school-admin/teacher/teacher';

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
      SchoolAdminBranchPage,
      SchoolAdminHome,
      SchoolAdminMePage,
      SchoolAdminStudentsPage,
      SchoolAdminTeacherPage,
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
      SchoolAdminBranchPage,
      SchoolAdminHome,
      SchoolAdminMePage,
      SchoolAdminStudentsPage,
      SchoolAdminTeacherPage,
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
