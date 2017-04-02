import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../../login/login";
import { AuthData } from "../../../providers/auth-data";


@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html'
})
export class TeacherHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherHomePage');
  }

   logout() {
      console.log('logout clicked');
      this.authData.logoutUser();
      this.navCtrl.setRoot(LoginPage);
   }

}
