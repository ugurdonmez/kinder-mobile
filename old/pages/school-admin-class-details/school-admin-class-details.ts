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
import {SchoolAdminWallPage} from "../school-admin-class-wall/school-admin-class-wall";

@Component({
  selector: 'page-school-admin-class-details',
  templateUrl: 'school-admin-class-details.html',
    providers: [Classes, Teachers, Translator, Parents, Attendance]
})


export class SchoolAdminClassDetailsPage {
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
        console.log("opened class details page with classId:" + this.classId);
        this._class = classesProvider.getClass(this.classId);
        this.getTeacherOfClass();
        let userRole = this.authData.getUserRole();
        userRole.subscribe( snapshot => {
            this.userRole = snapshot.$value;
        });
        this.parentsOfClass = this.parentsProvider.getParentsOfClass(this.classId);

        // attendance provider tests
        this.runAttendanceProviderTests(); // TODO delete these tests after implementing the front end for this page.
    }

    // opens the class wall. only for teacher and administrative users.
    openSchoolAdminClassWall(){
        this.navCtrl.push( SchoolAdminWallPage , {'classId':this.classId});
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

    openAddParent(){
        this.navCtrl.push( InviteOthersPage , {
            'sourcePage': 'ClassPage',
            'classId':this.classId,
            'invitationRole':'parent'
        });
    }

    private runAttendanceProviderTests() {
        // TODO
        // delete these tests after implementing the front end for this page.
        let todaysDate = new Date().toISOString().substring(0, 10);

        this.attendanceProvider.markAllStudentsHere(this.classId, todaysDate);
        this.attendanceProvider.markStudentHere("10qFn2d6daV17ZIt5QAIPpmv4G93", this.classId, todaysDate, false);

        this.attendanceProvider.getAttendanceOf(this.classId, todaysDate).subscribe(
            snapshot => {
                console.log("test: this.attendanceProvider.getAttendanceOf");
                console.log(snapshot);
            });

        this.attendanceProvider.getAttendanceOf(this.classId, todaysDate, "10qFn2d6daV17ZIt5QAIPpmv4G93").subscribe(
            snapshot => {
                console.log("test: this.attendanceProvider.getAttendanceOf with studentId: 10qFn2d6daV17ZIt5QAIPpmv4G93");
                console.log(snapshot);
            });
    }
}
