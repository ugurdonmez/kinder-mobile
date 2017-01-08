import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SchoolAdminTeachers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-teachers',
  templateUrl: 'school-admin-teachers.html'
})
export class SchoolAdminTeachersPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminTeachersPage Page');
  }

}
