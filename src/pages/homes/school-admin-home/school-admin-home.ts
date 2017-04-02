import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthData } from "../../../providers/auth-data";
import { LoginPage } from "../../login/login";
import { Branches } from "../../../providers/branches";
import { Translator } from "../../../app/translator";
import {Schools} from "../../../providers/schools";


@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'school-admin-home.html',
   providers: [Translator, Branches, Schools]
})

export class SchoolAdminHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthData,
              private branchesProvider: Branches,
              private schoolProvider: Schools) {

     this.schoolProvider.getUserSchools()
        .subscribe(schools => {
           console.log('user schools')
           console.log(schools)
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolAdminHomePage');
  }

   logout() {
      console.log('logout clicked');
      this.authData.logoutUser();
      this.navCtrl.setRoot(LoginPage);
   }

}
