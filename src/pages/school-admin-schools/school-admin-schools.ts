import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Schools} from '../../providers/schools'
import {Branches} from "../../providers/branches";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminClassesPage} from "../school-admin-classes/school-admin-classes";
import {SchoolAdminAddUpdateSchoolPage} from "../school-admin-add-update-school/school-admin-add-update-school";

@Component({
  selector: 'page-school-admin-schools',
  templateUrl: 'school-admin-schools.html',
    providers: [Schools, Branches]
})


export class SchoolAdminSchoolsPage {
    private branchId: string;
    private allSchoolsOfBranch: any;
    private branch: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, public schoolsProvider: Schools, public branchesProvider: Branches,
                private navParams: NavParams) {
        this.branchId = navParams.get('branchId');
        this.branch = branchesProvider.getBranch(this.branchId);
        this.allSchoolsOfBranch = this.schoolsProvider.getSchoolsOfBranch(this.branchId);
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminSchoolsPage Page');
    }

    openSchoolPage(schoolId){
        console.log('goes to class list of that school with schoolId:' + schoolId);
        this.navCtrl.push(SchoolAdminClassesPage, {'schoolId':schoolId})
    }

    openSchoolAdminSchoolAdd() {
        console.log('adds new school to branch with branchId: ' + this.branchId);
        this.navCtrl.push( SchoolAdminAddUpdateSchoolPage , {'branchId':this.branchId});
    }
}
