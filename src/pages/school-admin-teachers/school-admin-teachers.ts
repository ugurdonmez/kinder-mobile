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
    randomMockTeacher: TeacherModel;
    allTeachers: any;
    teacher: any;
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public teachersProvider: Teachers,
    classProvider: Classes, public translator: Translator) {
        this.translate = translator.translatePipe;
        let fetchedTeachers = teachersProvider.getAllTeachers();
        // this.allTeachers = teachersProvider.getAllTeachers();
        this.allTeachers = [];
        fetchedTeachers
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    console.log(snapshot);
                    let thisEntry = snapshot;
                    var classes = [];
                    for (var dictKey in thisEntry.classes){
                        let classId = thisEntry.classes[dictKey];
                        classes.push(classProvider.getClass(classId));
                    }
                    thisEntry.classes = classes;
                    this.allTeachers.push(thisEntry);
                    console.log(this.allTeachers);
                });
            })

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
}
