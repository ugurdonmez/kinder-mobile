import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Branches } from '../../providers/branches';
import {BranchModel} from '../../models/branch-model';

import { ClassModel } from '../../models/class-model';
import {TranslateService} from "ng2-translate";


@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html',
    providers: [Branches]
})

export class SchoolAdminAddUpdateBranchPage {
    mockBranch: BranchModel = new BranchModel();

    classes: Array<ClassModel> = [];
    translate: any;

    constructor(public navCtrl: NavController, public branches: Branches, translate: TranslateService) {
        translate.setDefaultLang('tr');
        this.translate = translate;
        this.importClassesMock();
        this.importBranchMock();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    addNewBranch(){
        //console.log("addNewBranch() triggered.");
        this.branches.addBranch(this.mockBranch);
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

    importBranchMock() {
        this.mockBranch.name = "mockName";
        this.mockBranch.manager = "mockmanager";
        this.mockBranch.manager_tel = "mockmanager_tel";
        this.mockBranch.address = "mockaddress";
        this.mockBranch.classes = [
            "mocksample1",
            "mocksample2",
            "mocksample3",
        ];
    }
}
