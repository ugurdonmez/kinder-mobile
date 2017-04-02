import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from "../../../providers/auth-data";
import { LoginPage } from "../../login/login";

@Component({
  selector: 'page-parent-home',
  templateUrl: 'parent-home.html'
})
export class ParentHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentHomePage');
  }

   logout() {
      console.log('logout clicked');
      this.authData.logoutUser();
      this.navCtrl.setRoot(LoginPage);
   }

}
