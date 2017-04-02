import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from "../../../providers/auth-data";
import { LoginPage } from "../../login/login";
import {Branches} from "../../../providers/branches";


@Component({
  selector: 'page-school-admin-home',
  templateUrl: 'school-admin-home.html'
})

export class SchoolAdminHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthData,
              private branchesProvider: Branches) {

     this.branchesProvider.getUserBranches().subscribe(snapshot => {

        console.log('school admin page branch')
        console.log(snapshot)

        if (snapshot.length > 0){
           console.log("user has branch.");
        }
        else{
           console.log("user has no branch.")
        }
     })

     //let branches = branchProvider.getUserBranches()

     console.log('list of school admin branches')
     // console.log(branches)
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
