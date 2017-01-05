import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SchoolAdminBranches page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-branches',
  templateUrl: 'school-admin-branches.html'
})
export class SchoolAdminBranchesPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminBranchesPage Page');
  }

}
