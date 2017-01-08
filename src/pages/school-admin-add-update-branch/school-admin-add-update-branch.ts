import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Branches } from '../../providers/branches';
import {BranchModel} from '../../models/branch-model';

@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html',
    providers: [Branches, BranchModel]
})

export class SchoolAdminAddUpdateBranchPage {
    mockBranchModel: BranchModel;


    constructor(public navCtrl: NavController, public branches: Branches) {
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



}
