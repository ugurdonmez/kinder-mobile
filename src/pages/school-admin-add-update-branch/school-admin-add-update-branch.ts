import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html'
})

export class SchoolAdminAddUpdateBranchPage {

    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }



}
