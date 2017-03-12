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

@Component({
  selector: 'page-school-admin-class-details',
  templateUrl: 'school-admin-class-details.html',
    providers: [Classes, Teachers, Translator]
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
                private authData: AuthData) {
        this.translate = translator.translatePipe;
        this.classId = navParams.get('classId');
        this._class = classesProvider.getClass(this.classId);
        this.getTeacherOfClass();
        let userRole = this.authData.getUserRole();
        userRole.subscribe( snapshot => {
            this.userRole = snapshot.$value;
        })
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
}
