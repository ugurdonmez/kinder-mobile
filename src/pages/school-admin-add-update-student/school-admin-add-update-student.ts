import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SchoolAdminAddUpdateStudent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-add-update-student',
  templateUrl: 'school-admin-add-update-student.html'
})
export class SchoolAdminAddUpdateStudentPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateStudentPage Page');
  }

}
