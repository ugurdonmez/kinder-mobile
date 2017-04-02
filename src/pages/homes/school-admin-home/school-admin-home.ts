import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from "../../../providers/auth-data";
import { LoginPage } from "../../login/login";


@Component({
  selector: 'page-school-admin-home',
  templateUrl: 'school-admin-home.html'
})

export class SchoolAdminHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthData) {

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
