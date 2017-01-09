import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BranchModel } from '../../models/branch-model';
import {Branches} from '../../providers/branches'


@Component({
  selector: 'page-school-admin-branches',
  templateUrl: 'school-admin-branches.html',
    providers: [Branches]
})


export class SchoolAdminBranchesPage {

    branches: Array<BranchModel> = []

    constructor(public navCtrl: NavController, public branchesProvider: Branches) {
        this.importBranchesMock();
        branchesProvider.getBranch("-K_zkAEp-Oi0glququHy");

    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminBranchesPage Page');
    }

    importBranchesMock() {

        let b1: BranchModel = { id: 'id1',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b2: BranchModel = { id: 'id2',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b3: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b4: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b5: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b6: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b7: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b8: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };

        let b9: BranchModel = { id: 'id3',
                                name: 'branch ankara',
                                manager: 'ahmet donmez',
                                manager_tel: '05052223344',
                                address: 'cankaya 10. sok ankara',
                                classes: ['cid1', 'cid2', 'cid3']
                              };


        this.branches.push(b1);
        this.branches.push(b2);
        this.branches.push(b3);
        this.branches.push(b4);
        this.branches.push(b5);
        this.branches.push(b6);
        this.branches.push(b7);
        this.branches.push(b8);
        this.branches.push(b9);

    }

}
