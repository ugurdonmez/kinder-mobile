import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalenderPage } from '../pages/calender/calender';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AuthService } from '../providers/auth-service';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CalenderPage,
        LoginPage,
        RegisterPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CalenderPage,
        LoginPage,
        RegisterPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthService
    ]
})
export class AppModule {}
