import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TeacherModel } from '../../models/teacher-model';
import {Teachers} from "../../providers/teachers";

import { SchoolAdminAddUpdateTeacherPage } from '../school-admin-add-update-teacher/school-admin-add-update-teacher'
import {Classes} from "../../providers/classes";

@Component({
  selector: 'page-school-admin-teachers',
  templateUrl: 'school-admin-teachers.html',
    providers: [Teachers, Classes]
})

export class SchoolAdminTeachersPage {
    randomMockTeacher: TeacherModel;
    allTeachers: any;
    teacher: any;

    constructor(public navCtrl: NavController, public teachersProvider: Teachers,
    classProvider: Classes) {
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

    // teacherProviderTests(){
    //     //getTeacher test
    //     console.log(this.teacher.getTeacher("-KadHidAEYTRGT-48rzP"));
    //
    //     //updateTeacher test
    //     this.generateRandomMockTeacher();
    //     this.randomMockTeacher.id = "-KadHidAEYTRGT-48rzP";
    //     this.teacher.updateTeacher(this.randomMockTeacher);
    //
    //     //addTeacher test
    //     this.generateRandomMockTeacher();
    //     this.teacher.addTeacher(this.randomMockTeacher);
    //
    //     // TODO ugur hoca'nin github'da issue #6'ya verecegi yanita gore geri eklenebilir
    //     //getUserTeachers test
    //     // this.teacher.getUserTeachers(function(userTeacherArray){
    //     //     console.log(userTeacherArray)
    //     // })
    // }


    // importTeachersMock() {
    //     let t1: TeacherModel = {
    //         id: 'id1',
    //         name: 'ali',
    //         surname: 'donmez',
    //         classes: ['class a', 'class b'],
    //         branches: ['eryaman', 'cankaya'],
    //         notes: '',
    //         photo_url: ''
    //     };
    //
    //     let t2: TeacherModel = {
    //         id: 'id1',
    //         name: 'ali',
    //         surname: 'donmez',
    //         classes: ['class a', 'class b', 'class c', 'class d'],
    //         branches: ['eryaman', 'cankaya', 'kecioren', 'maltepe'],
    //         notes: '',
    //         photo_url: ''
    //     };
    //
    //     console.log(t1);
    //
    //     this.teachers.push(t1);
    //     this.teachers.push(t2);
    // }

    // private generateRandomMockTeacher() {
    //     this.randomMockTeacher = new TeacherModel();
    //
    //     this.randomMockTeacher.name = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
    //     this.randomMockTeacher.surname = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
    //     this.randomMockTeacher.branches = ["mockBranchId1", "mockBranchId2", "mockBranchId3"];
    //     this.randomMockTeacher.classes = ["mockClassId1", "mockClassId2"];
    //     this.randomMockTeacher.notes = "some notes here";
    //     this.randomMockTeacher.photo_url = "http://cliparts.co/cliparts/qiB/AgG/qiBAgGrjT.jpg";
    // }
}
