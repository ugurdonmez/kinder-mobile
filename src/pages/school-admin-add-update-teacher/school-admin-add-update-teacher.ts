import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SchoolAdminAddUpdateTeacher page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-add-update-teacher',
  templateUrl: 'school-admin-add-update-teacher.html'
})
export class SchoolAdminAddUpdateTeacherPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
  }

}
