import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {BranchModel} from '../models/branch-model';

@Injectable()
export class Branches {

    branches: any;

    constructor(public af: AngularFire) {
        this.branches = af.database.list('/branches');
    }

    public getUserBranches() {

    }

    public getBranch(branchId: string) {
        // branch = this.branches.object('/branches/'+branchId);
        // console.log(branch.name)
    }

    public addBranch(branch: BranchModel) {
        this.branches.push(branch)
    }

    public updateBranch(branch: BranchModel) {

    }
}
