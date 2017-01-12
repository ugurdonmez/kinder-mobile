import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SchoolAdminStudents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-students',
  templateUrl: 'school-admin-students.html'
})
export class SchoolAdminStudentsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminStudentsPage Page');
  }

}
