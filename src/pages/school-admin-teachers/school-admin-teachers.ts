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
        let t1: TeacherModel = {
            id: 'id1',
            name: 'ali',
            surname: 'donmez',
            classes: ['class a', 'class b'],
            branches: ['eryaman', 'cankaya'],
            notes: '',
            photo_url: ''
        };

        console.log(t1);

        this.teachers.push(t1);
    }

}
