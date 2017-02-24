import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TeacherModel } from '../../models/teacher-model';
import {Teachers} from "../../providers/teachers";

import { SchoolAdminAddUpdateTeacherPage } from '../school-admin-add-update-teacher/school-admin-add-update-teacher'
import {Classes} from "../../providers/classes";
import {SchoolAdminTeacherDetailsPage} from "../school-admin-teacher-details/school-admin-teacher-details";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-school-admin-teachers',
  templateUrl: 'school-admin-teachers.html',
    providers: [Teachers, Classes, Translator]
})

export class SchoolAdminTeachersPage {
    allTeachers: any;
    private translate: TranslateService;
    private classProvider: Classes;
    private classesOfTeachers: any;

    constructor(public navCtrl: NavController, public teachersProvider: Teachers,
    classProvider: Classes, public translator: Translator) {
        this.translate = translator.translatePipe;
        this.allTeachers = teachersProvider.getAllTeachers();

        this.classProvider = classProvider;
        this.classesOfTeachers = {};
        this.loadClassesOfTeachers();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminTeachersPage Page');
    }

    openSchoolAdminAddUpdateTeacher(page) {
        this.navCtrl.push(SchoolAdminAddUpdateTeacherPage);
    }

    openTeacherPage(teacherId){
        console.log(teacherId);
        this.navCtrl.push(SchoolAdminTeacherDetailsPage, {'teacherId':teacherId});
    }

    loadClassesOfTeachers(){
        this.allTeachers.subscribe(snapshots =>{
            snapshots.forEach(snapshot => {
                this.loadClassesOfTeacherWithTeacherId(snapshot.$key);
            })
        })
    }

    loadClassesOfTeacherWithTeacherId(teacherId){
        this.classProvider.getClassesOfTeacher(teacherId).subscribe(snapshot => {
            this.classesOfTeachers[teacherId] = snapshot;
        })
    }

    getClassesOfTeachers(teacherId){
        return this.classesOfTeachers[teacherId];
    }
}
