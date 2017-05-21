import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

// Localization
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {Translator} from './translator';

// Importing pages
import * as page from '../pages';

// Importing providers
import * as provider from '../providers';

// Importing components
import * as cmp from '../components';

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

      // pages
      page.LoginPage,
      page.LoginDialog,
      page.BranchAdminHomePage,
      page.BranchAdminStudentPage,
      page.BranchAdminTeacherPage,
      page.BranchAdminClassPage,
      page.BranchAdminMePage,
      page.BranchAdminSchoolPage,
      page.SchoolAdminHomePage,
      page.SchoolAdminMePage,
      page.SchoolAdminStudentPage,
      page.SchoolAdminTeacherPage,
      page.SchoolAdminClassPage,
      page.SchoolAdminClassDetailsPage,
      page.SchoolAdminCreateClassPage,
      page.BranchAdminSchoolDetailsPage,
      page.BranchAdminCreateClassPage,
      page.BranchAdminClassDetailsPage,
      page.BranchAdminCreateSchoolPage,
      page.ParentHomePage,
      page.TeacherHomePage,

      // components
      cmp.HomeHeaderDirective,
      cmp.LogoutButtonDirective,
      cmp.SchoolListDirective,
      cmp.TeacherListDirective,
      cmp.BranchDetailsDirective,
      cmp.ClassListDirective,
      cmp.ParentListDirective,
      cmp.SchoolDetailsDirective,
      cmp.ClassDetailsDirective,
      cmp.CreateClassDirective,
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
      page.LoginPage,
      page.LoginDialog,
      page.BranchAdminHomePage,
      page.BranchAdminStudentPage,
      page.BranchAdminTeacherPage,
      page.BranchAdminMePage,
      page.BranchAdminSchoolPage,
      page.BranchAdminClassPage,
      page.SchoolAdminHomePage,
      page.SchoolAdminMePage,
      page.SchoolAdminStudentPage,
      page.SchoolAdminTeacherPage,
      page.SchoolAdminClassPage,
      page.BranchAdminSchoolDetailsPage,
      page.BranchAdminCreateClassPage,
      page.BranchAdminClassDetailsPage,
      page.ParentHomePage,
      page.TeacherHomePage,
      page.BranchAdminCreateSchoolPage,
      page.SchoolAdminClassDetailsPage,
      page.SchoolAdminCreateClassPage,
   ],
   providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Translator,
      provider.AuthService,
      provider.AuthData,
      provider.Branches,
      provider.Schools,
      provider.Classes,
      provider.Parents,
      provider.Teachers,
      provider.Activity,
      provider.WeeklyActivity,
      provider.Invitation,
      provider.Birthday,
      provider.Reminder,
      provider.WeeklyMealMenu,
      provider.Homework,
      provider.Gallery,
      provider.Feedback,
      provider.Attendance,
      provider.Message,
   ]
})


export class AppModule {
}
