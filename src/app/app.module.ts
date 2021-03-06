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
      page.TeacherInboxPage,
      page.TeacherDialogPage,
      page.TeacherClassWallPage,
      page.TeacherCalendarPage,
      page.TeacherGalleryPage,
      page.TeacherTakePhotoPage,
      page.TeacherViewPhotoPage,
      page.SplashScreenPage,
      page.TeacherAlbumsPage,
      page.TeacherParentPage,
      page.TeacherAttendancePage,
      page.ParentAttendancePage,
      page.ParentCalendarPage,
      page.ParentClassWallPage,
      page.ParentGalleryPage,
      page.ParentHomePage,
      page.ParentInboxPage,
      page.ParentChatPage,
      page.ParentViewPhotoPage,
      page.TeacherAlbumPage,
      page.TeacherWeeklyMealMenuPage,
      page.TeacherViewWeeklyMealMenuPage,
      page.TeacherHomeworkPage,
      page.TeacherAddHomeworkPage,
      page.TeacherViewWeeklyActivityPage,
      page.TeacherWeeklyActivitiesPage,
      page.ParentAlbumsPage,
      page.ParentAlbumPage,
      page.ParentWeeklyActivitiesPage,
      page.ParentViewWeeklyActivityPage,
      page.ParentWeeklyMealMenuPage,
      page.ParentViewWeeklyMealMenuPage,
      page.ParentDialogPage,
      page.ParentDailyFeedbackParent,

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
      cmp.InboxDialogsListDirective,
      cmp.ClassWallAdminDirective,
      cmp.CalendarComponent,
      cmp.PhotosGridComponent,
      cmp.TakePhotoComponent,
      cmp.ViewPhotoComponent,
      cmp.AlbumsGridComponent,
      cmp.WeeklyMealMenuComponent,
      cmp.ViewWeeklyMealMenuComponent,
      cmp.ViewWeeklyActivityComponent,
      cmp.WeeklyActivitiesComponent,
      cmp.ParentPhotosGridComponent,
      cmp.ParentViewPhotoComponent,
      cmp.ParentAlbumsGridComponent,
      cmp.ParentWeeklyActivitiesComponent,
      cmp.ParentViewWeeklyActivityComponent,
      cmp.ParentWeeklyMealMenuComponent,
      cmp.ParentViewWeeklyMealMenuComponent,
      cmp.ParentCalendarComponent,
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
      page.TeacherInboxPage,
      page.TeacherDialogPage,
      page.TeacherClassWallPage,
      page.TeacherCalendarPage,
      page.TeacherGalleryPage,
      page.TeacherTakePhotoPage,
      page.TeacherViewPhotoPage,
      page.SplashScreenPage,
      page.TeacherAlbumsPage,
      page.TeacherParentPage,
      page.TeacherAttendancePage,
      page.ParentAttendancePage,
      page.ParentCalendarPage,
      page.ParentClassWallPage,
      page.ParentGalleryPage,
      page.ParentHomePage,
      page.ParentInboxPage,
      page.ParentChatPage,
      page.ParentViewPhotoPage,
      page.TeacherAlbumPage,
      page.TeacherWeeklyMealMenuPage,
      page.TeacherViewWeeklyMealMenuPage,
      page.TeacherHomeworkPage,
      page.TeacherAddHomeworkPage,
      page.TeacherViewWeeklyActivityPage,
      page.TeacherWeeklyActivitiesPage,
      page.ParentAlbumsPage,
      page.ParentAlbumPage,
      page.ParentWeeklyActivitiesPage,
      page.ParentViewWeeklyActivityPage,
      page.ParentWeeklyMealMenuPage,
      page.ParentViewWeeklyMealMenuPage,
      page.ParentDialogPage,
      page.ParentDailyFeedbackParent,
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
      provider.Gallery,
      provider.Feedback,
      provider.Message,
      provider.AttendanceProvider,
      provider.HomeworkProvider,
   ]
})


export class AppModule {
}
