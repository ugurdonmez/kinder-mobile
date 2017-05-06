
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {AngularFire} from 'angularfire2';
import {LoginPage} from '../pages/login/login';
import {SchoolAdminHomePage} from '../pages/branch-admin/home/home';
import {AuthData} from '../providers/auth-data';


@Component({
   template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
   rootPage: any;

   constructor(platform: Platform,
               af: AngularFire,
               private authData: AuthData) {

      console.log('my app constructor called')

      // TODO: refactor this part
      af.auth.subscribe(user => {
         if (user) {
            this.authData.getUserRole()
               .subscribe(snapshot => {
                  console.log('myapp navigate')

                  const role = snapshot.$value;

                  if (role == 'branch-admin') {
                     this.rootPage = SchoolAdminHomePage
                  } else {
                     this.rootPage = SchoolAdminHomePage
                  }

                  // if (role === 'branch-admin') {
                  //    this.rootPage = BranchAdminHomePage
                  // } else if (role === 'school-admin') {
                  //    this.rootPage = SchoolAdminHomePage
                  // } else if (role === 'teacher') {
                  //    this.rootPage = TeacherHomePage
                  // } else {
                  //    this.rootPage = ParentHomePage
                  // }
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
