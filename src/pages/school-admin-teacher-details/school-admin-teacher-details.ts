import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Teachers} from "../../providers/teachers";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminEditTeacherPage} from "../school-admin-edit-teacher/school-admin-edit-teacher";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-school-admin-teacher-details',
  templateUrl: 'school-admin-teacher-details.html',
    providers: [Teachers, Translator]
})


export class SchoolAdminTeacherDetailsPage {
    private teacherId: string;
    private teacher: FirebaseObjectObservable<any>;
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public teachersProvider: Teachers,
                private navParams: NavParams, public translator: Translator) {
        this.translate = translator.translatePipe;
        this.teacherId = navParams.get('teacherId');
        this.teacher = teachersProvider.getTeacher(this.teacherId);
    }

    openSchoolAdminEditTeacherPage(teacherId: string){
        this.navCtrl.push( SchoolAdminEditTeacherPage , {'teacherId':this.teacherId});
    }
}
