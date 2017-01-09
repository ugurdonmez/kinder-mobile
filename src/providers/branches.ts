import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {BranchModel} from '../models/branch-model';
import { AuthData } from './auth-data';

@Injectable()
export class Branches {

    branches: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.branches = af.database.list('/branches');
    }

    public getUserBranches() {
        //this comment will be deleted when this method is completed
        var userId = this.authData.getUserId();
        var user_branches = this.af.database.list('/user-branches/'+userId);
        //this comment will be deleted when this method is completed
    }

    public getBranch(branchId: string) {
        var fetchedBranch = this.af.database.object('/branches/' + branchId);
        return fetchedBranch;
    }

    public addBranch(branch: BranchModel) {
        var pushedBranch = this.branches.push(branch);
        var branchId = pushedBranch.key;
        //console.log("branchId: " + branchId);

        var userId = this.authData.getUserId();
        var user_branches = this.af.database.list('/user-branches/'+userId);
        user_branches.push({'branchId':branchId});
    }

    public updateBranch(branch: BranchModel) {

    }
}
