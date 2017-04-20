import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Classes} from "../../providers/classes";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Teachers} from "../../providers/teachers";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {Attendance} from "../../providers/attendance";

@Component({
  selector: 'page-school-admin-wall',
  templateUrl: 'school-admin-class-wall.html',
    providers: [Classes, Teachers, Translator, Parents, Attendance]
})


export class SchoolAdminWallPage {
    private classId: string;
    private _class: FirebaseObjectObservable<any>;
    private teacherName: string;
    private translate: TranslateService;
    private parentsOfClass: any;
    private userRole: any;

    constructor(public navCtrl: NavController, public classesProvider: Classes,
                private navParams: NavParams, private teachersProvider: Teachers, public translator: Translator,
                private authData: AuthData, private parentsProvider: Parents,
                private attendanceProvider: Attendance) {
        this.translate = translator.translatePipe;
        this.classId = navParams.get('classId');
        console.log("opened class wall page with classId:" + this.classId);
        this._class = classesProvider.getClass(this.classId);
        let userRole = this.authData.getUserRole();
        userRole.subscribe( snapshot => {
            this.userRole = snapshot.$value;
        });
        // this.parentsOfClass = this.parentsProvider.getParentsOfClass(this.classId);

        // attendance provider tests
        // this.runAttendanceProviderTests(); // TODO delete these tests after implementing the front end for this page.
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
