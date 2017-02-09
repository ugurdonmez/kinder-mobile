import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Schools} from '../../providers/schools'
import {Teachers} from "../../providers/teachers";
import {FirebaseObjectObservable} from "angularfire2";
// import {SchoolAdminEditTeacherPage} from "../school-admin-edit-teacher/school-admin-edit-teacher";

@Component({
  selector: 'page-school-admin-teacher-details',
  templateUrl: 'school-admin-teacher-details.html',
    providers: [Teachers]
})


export class SchoolAdminTeacherDetailsPage {
    private teacherId: string;
    private teacher: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, public teachersProvider: Teachers,
                private navParams: NavParams) {
        this.teacherId = navParams.get('teacherId');
        this.teacher = teachersProvider.getTeacher(this.teacherId);
    }

    openSchoolAdminEditTeacherPage(teacherId: string){
        // this.navCtrl.push( SchoolAdminEditTeacherPage , {'teacherId':this.teacherId});
    }
}
