import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-school-admin-add-update-class',
  templateUrl: 'school-admin-add-update-class.html'
})
export class SchoolAdminAddUpdateClassPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateClassPage Page');
  }

}
