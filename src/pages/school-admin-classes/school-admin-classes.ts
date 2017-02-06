import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Schools} from '../../providers/schools'
import {FirebaseObjectObservable} from "angularfire2";
import {Classes} from "../../providers/classes";
import { SchoolAdminAddUpdateClassPage } from '../school-admin-add-update-class/school-admin-add-update-class';
import {Teachers} from "../../providers/teachers";

@Component({
  selector: 'page-school-admin-classes',
  templateUrl: 'school-admin-classes.html',
    providers: [Schools, Classes, Teachers]
})


export class SchoolAdminClassesPage {
    private schoolId: string;
    private allClassesOfSchool: any;
    private school: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, public schoolsProvider: Schools, public classesProvider: Classes,
                private navParams: NavParams, private teachersProvider: Teachers) {
        this.schoolId = navParams.get('schoolId');
        this.school = schoolsProvider.getSchool(this.schoolId);
        this.allClassesOfSchool = this.classesProvider.getClassesOfSchool(this.schoolId);
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminClassesPage Page');
    }

    openClassPage(classId){
        console.log('goes to class list of that school with classId:' + classId);
        // this.navCtrl.push()
    }

    openSchoolAdminClassAdd() {
        console.log('adds new class to school with schoolId: ' + this.schoolId);
        this.navCtrl.push( SchoolAdminAddUpdateClassPage  , {'schoolId':this.schoolId});
    }
    getTeacher(teacherId){
        console.log("requested teacher entity with teacherId:"+teacherId);
        let teacher = this.teachersProvider.getTeacher(teacherId);
        console.log(teacher);
        return teacher;
    }
}
