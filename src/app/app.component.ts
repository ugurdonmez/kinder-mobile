
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {FirebaseApp} from 'angularfire2';
import {LoginPage} from '../pages/login/login';
import {AuthData} from '../providers/auth-data';
import {BranchAdminHomePage} from "../pages/branch-admin/home/home";
import {SchoolAdminHomePage} from "../pages/school-admin/home/home";
import {ParentHomePage} from "../pages/parent/home/home";
import {TeacherHomePage} from "../pages/teacher/home/home";


@Component({
   template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
   rootPage: any;

   constructor(platform: Platform,
               af: FirebaseApp,
               private authData: AuthData) {

      console.log('my app constructor called')

      // TODO: refactor this part
      af.auth.subscribe(user => {
         if (user) {
            this.authData.getUser()
               .then(snapshot => {
                  console.log('myapp navigate')

                  const role = snapshot.role;

                  if (role == 'branch-admin') {
                     this.rootPage = BranchAdminHomePage
                  } else if (role == 'school-admin') {
                     this.rootPage = SchoolAdminHomePage
                  } else if (role == 'parent') {
                     this.rootPage = ParentHomePage
                  } else if (role == 'teacher') {
                     this.rootPage = TeacherHomePage
                  } else {
                     this.rootPage = LoginPage
                  }
               })
         } else {
            this.rootPage = LoginPage;
         }
      });
      platform.ready()
         .then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
         });
   }
}
