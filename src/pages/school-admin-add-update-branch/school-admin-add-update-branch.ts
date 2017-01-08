import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Branches } from '../../providers/branches';
import {BranchModel} from '../../models/branch-model';

import { ClassModel } from '../../models/class-model';


@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html',
    providers: [Branches, BranchModel]
})

export class SchoolAdminAddUpdateBranchPage {
    mockBranchModel: BranchModel;

    classes: Array<ClassModel> = []

    constructor(public navCtrl: NavController, public branches: Branches) {
        this.importClassesMock();

        this.mockBranchModel = new BranchModel();
        this.mockBranchModel.name = "mockName";
        this.mockBranchModel.manager = "mockmanager";
        this.mockBranchModel.manager_tel = "mockmanager_tel";
        this.mockBranchModel.address = "mockaddress";
        this.mockBranchModel.classes = [
            "mocksample1",
            "mocksample2",
            "mocksample3",
        ];
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    addNewBranch(){
        //console.log("addNewBranch() triggered.");
        this.branches.addBranch(this.mockBranchModel);
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
