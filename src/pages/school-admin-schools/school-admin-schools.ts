import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Schools} from '../../providers/schools'
import {Branches} from "../../providers/branches";
import {FirebaseObjectObservable} from "angularfire2";
import {SchoolAdminAddUpdateSchoolPage} from "../school-admin-add-update-school/school-admin-add-update-school";

@Component({
  selector: 'page-school-admin-schools',
  templateUrl: 'school-admin-schools.html',
    providers: [Schools, Branches]
})


export class SchoolAdminSchoolsPage {
    private branchId: string;
    private allSchools: any;
    private branch: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, public schoolsProvider: Schools, public branchesProvider: Branches,
                private navParams: NavParams) {
        this.branchId = navParams.get('branchId');
        this.branch = branchesProvider.getBranch(this.branchId);
        this.allSchools = this.schoolsProvider.getAllSchools();
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminSchoolsPage Page');
    }

    // openSchoolPage(schoolId){
    //     console.log(schoolId);
    //     // this.navCtrl.push()
    // }
    //
    openSchoolAdminSchoolAdd(page) {
        console.log('open school admin school');
        this.navCtrl.push(SchoolAdminAddUpdateSchoolPage, {'branchId':this.branchId});
    }
}
