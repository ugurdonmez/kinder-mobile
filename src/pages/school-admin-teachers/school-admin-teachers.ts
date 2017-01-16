import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TeacherModel } from '../../models/teacher-model';
import {Teachers} from "../../providers/teachers";

@Component({
  selector: 'page-school-admin-teachers',
  templateUrl: 'school-admin-teachers.html',
    providers: [Teachers]
})
export class SchoolAdminTeachersPage {

    teachers: Array<TeacherModel> = [];
    randomMockTeacher: TeacherModel;

    constructor(public navCtrl: NavController, public teacher: Teachers) {
        this.importTeachersMock();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminTeachersPage Page');
    }

    addNewTeacher(){
        //getTeacher test
        console.log(this.teacher.getTeacher("-KadHidAEYTRGT-48rzP"));

        //updateTeacher test
        this.generateRandomMockTeacher();
        this.randomMockTeacher.id = "-KadHidAEYTRGT-48rzP";
        this.teacher.updateTeacher(this.randomMockTeacher);

        //addTeacher test
        this.generateRandomMockTeacher();
        this.teacher.addTeacher(this.randomMockTeacher);

        // TODO ugur hoca'nin github'da issue #6'ya verecegi yanita gore geri eklenebilir
        //getUserTeachers test
        // this.teacher.getUserTeachers(function(userTeacherArray){
        //     console.log(userTeacherArray)
        // })
    }


    importTeachersMock() {
        let t1: TeacherModel = {
            id: 'id1',
            name: 'ali',
            surname: 'donmez',
            classes: ['class a', 'class b'],
            branches: ['eryaman', 'cankaya'],
            notes: '',
            photo_url: ''
        };

        let t2: TeacherModel = {
            id: 'id1',
            name: 'ali',
            surname: 'donmez',
            classes: ['class a', 'class b', 'class c', 'class d'],
            branches: ['eryaman', 'cankaya', 'kecioren', 'maltepe'],
            notes: '',
            photo_url: ''
        };

        console.log(t1);

        this.teachers.push(t1);
        this.teachers.push(t2);
    }

    private generateRandomMockTeacher() {
        this.randomMockTeacher = new TeacherModel();

        this.randomMockTeacher.name = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
        this.randomMockTeacher.surname = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
        this.randomMockTeacher.branches = ["mockBranchId1", "mockBranchId2", "mockBranchId3"];
        this.randomMockTeacher.classes = ["mockClassId1", "mockClassId2"];
        this.randomMockTeacher.notes = "some notes here";
        this.randomMockTeacher.photo_url = "http://cliparts.co/cliparts/qiB/AgG/qiBAgGrjT.jpg";
    }
}
