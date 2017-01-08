import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RegisterPage } from '../pages/register/register';

import { AuthService } from '../providers/auth-service';

// Importing pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { CalenderPage } from '../pages/calender/calender';
import { SchoolAdminBranchesPage } from '../pages/school-admin-branches/school-admin-branches';
import { SchoolAdminAddUpdateBranchPage } from '../pages/school-admin-add-update-branch/school-admin-add-update-branch';
import { SchoolAdminAddUpdateClassPage } from '../pages/school-admin-add-update-class/school-admin-add-update-class';
import { SchoolAdminTeachersPage } from '../pages/school-admin-teachers/school-admin-teachers';

// Importing provider
import { AuthData } from '../providers/auth-data';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

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
}


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CalenderPage,
        LoginPage,
        RegisterPage,
        ResetPasswordPage,
        RegisterPage,
        SchoolAdminBranchesPage,
        SchoolAdminAddUpdateBranchPage,
        SchoolAdminAddUpdateClassPage,
        SchoolAdminTeachersPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CalenderPage,
        LoginPage,
        RegisterPage,
        ResetPasswordPage,
        RegisterPage,
        SchoolAdminBranchesPage,
        SchoolAdminAddUpdateBranchPage,
        SchoolAdminAddUpdateClassPage,
        SchoolAdminTeachersPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthService,
        AuthData
    ]
})



export class AppModule {}
