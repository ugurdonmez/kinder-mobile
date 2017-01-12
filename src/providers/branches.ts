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

    public getUserBranches(callback) {
        let branchCursors : any[] = [];
        var userId = this.authData.getUserId();

        var user_branch_ids = this.af.database.list('/user-branches/'+userId, {preserveSnapshot: true});
        // console.log("user_branch_ids:");
        // console.log(user_branch_ids);

        user_branch_ids.subscribe(snapshots=>{
            snapshots.forEach(
                snapshot=>{
                    // console.log(snapshot.val().branchId);
                    branchCursors.push(snapshot.val().branchId);
                });
            // console.log(branchCursors)
            callback(branchCursors)
        }
        )
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
