import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClassModel } from '../../models/class-model';


@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html'
})

export class SchoolAdminAddUpdateBranchPage {

    classes: Array<ClassModel> = []

    constructor(public navCtrl: NavController) {
        this.importClassesMock();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    importClassesMock() {
        let c1: ClassModel = {
            id: 'class1',
            name: 'Class A',
            teacher_id: 'teacher1',
            teacher_name: 'Ali Donmez',
            age: 5,
            current: 0,
            maximum: 10
        };

        let c2: ClassModel = {
            id: 'class1',
            name: 'Class A',
            teacher_id: 'teacher1',
            teacher_name: 'Ali Donmez',
            age: 5,
            current: 0,
            maximum: 10
        };

        let c3: ClassModel = {
            id: 'class1',
            name: 'Class A',
            teacher_id: 'teacher1',
            teacher_name: 'Ali Donmez',
            age: 5,
            current: 0,
            maximum: 10
        };

        this.classes.push(c1);
        this.classes.push(c2);
        this.classes.push(c3);
    }

}
