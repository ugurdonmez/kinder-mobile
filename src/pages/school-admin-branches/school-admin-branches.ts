import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Branches} from '../../providers/branches'

import { SchoolAdminAddUpdateBranchPage } from '../school-admin-add-update-branch/school-admin-add-update-branch';
import { SchoolAdminSchoolsPage} from "../school-admin-schools/school-admin-schools";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";


@Component({
  selector: 'page-school-admin-branches',
  templateUrl: 'school-admin-branches.html',
    providers: [Branches, Translator]
})


export class SchoolAdminBranchesPage {

    allBranches: any;
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public branchesProvider: Branches, public translator: Translator) {
        this.translate = translator.translatePipe;
        this.allBranches = this.branchesProvider.getAllBranches();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminBranchesPage Page');
    }

    openBranchPage(branchId){
        console.log(branchId);
        this.navCtrl.push(SchoolAdminSchoolsPage, {'branchId':branchId});
    }

    openSchoolAdminBranchUpdate(page) {
        console.log('open school admin branch');
        this.navCtrl.push(SchoolAdminAddUpdateBranchPage);
    }

    // public branchesProviderTests(){
    //     // this.importBranchesMock();
    //     this.branchesProvider.getBranch("-K_zkAEp-Oi0glququHy");
    //
    //     var randomMockBranch: BranchModel;
    //     randomMockBranch = this.generateRandomMockBranch();
    //     this.branchesProvider.updateBranch(randomMockBranch);
    //
    //     //to get a result, this.branchesProvider.getUserBranches() function should be called like below.
    //     this.branchesProvider.getUserBranches(function(userBranchArray){
    //         console.log(userBranchArray)
    //     })
    // }

    // private generateRandomMockBranch() : BranchModel {
    //     //(function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
    //     var randommockbranch: BranchModel = {
    //         id: '-KaEb4MP8RkvicvOcQih',
    //         name: (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8)),
    //         manager: (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8)),
    //         manager_tel: (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8)),
    //         address: (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8)),
    //         classes: [(function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8)), 'cid3']
    //     };
    //
    //     return randommockbranch
    // }
}
