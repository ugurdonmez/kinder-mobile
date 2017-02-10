import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Classes} from "../../providers/classes";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Teachers} from "../../providers/teachers";

@Component({
  selector: 'page-school-admin-class-details',
  templateUrl: 'school-admin-class-details.html',
    providers: [Classes, Teachers]
})


export class SchoolAdminClassDetailsPage {
    private classId: string;
    private _class: FirebaseObjectObservable<any>;
    private teacherName: string;

    constructor(public navCtrl: NavController, public classesProvider: Classes,
                private navParams: NavParams, private teachersProvider: Teachers) {
        this.classId = navParams.get('classId');
        this._class = classesProvider.getClass(this.classId);
        this.getTeacherOfClass();
    }

    openSchoolAdminEditClassPage(classId: string){
        this.navCtrl.push( SchoolAdminEditClassPage , {'classId':this.classId});
    }

    getTeacherOfClass(){
        this._class.subscribe(classsnapshot => {
            var teacherId = classsnapshot.teacher_id;
            var teacher = this.teachersProvider.getTeacher(teacherId);
            teacher.subscribe( teachersnapshot => {
                console.log(teachersnapshot);
                console.log(teachersnapshot.name);
                this.teacherName = teachersnapshot.name;
            })
        })

    }
}
