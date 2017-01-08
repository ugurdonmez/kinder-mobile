import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TeacherModel } from '../../models/teacher-model';

@Component({
  selector: 'page-school-admin-teachers',
  templateUrl: 'school-admin-teachers.html'
})
export class SchoolAdminTeachersPage {

    teachers: Array<TeacherModel> = []

    constructor(public navCtrl: NavController) {
        this.importTeachersMock();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminTeachersPage Page');
    }

    importTeachersMock() {

    }

}
