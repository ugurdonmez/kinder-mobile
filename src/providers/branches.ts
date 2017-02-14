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
        var userId = this.authData.getUserId();

        // var user_branch_ids = this.af.database.list('/user-branches/'+userId);
        // // console.log("user_branch_ids:");
        // // console.log(user_branch_ids);
        //
        // return user_branch_ids;

        return this.af.database.list('/branches', {
            query: {
                orderByChild: 'adminUserId',
                equalTo: userId
            }
        });
    }

    public getBranch(branchId: string) {
        return this.af.database.object('/branches/' + branchId);
    }

    public getAllBranches(){
        return this.af.database.list('/branches/');
    }

    public addBranch(branch: BranchModel) {
        branch.adminUserId = this.authData.getUserId();
        this.branches.push(branch);
        // var pushedBranch = this.branches.push(branch);
        // var branchId = pushedBranch.key;
        //console.log("branchId: " + branchId);

        // var userId = this.authData.getUserId();
        // var user_branches = this.af.database.list('/user-branches/'+userId);
        // user_branches.push({'branchId':branchId});
    }

    public updateBranch(branch: BranchModel) {
        this.af.database.object('/branches/'+branch.id).set(branch);
    }

    addSchoolToBranch(branchId: string, schoolId: string) {
        // schoollar zaten branch'larini tutuyor, buna gerek yok o yuzden.
        // duplicate data olunca duzenlemeler, silmeler eklemeler biraz zor oluyor.
        // let branchSchoolsList = this.af.database.list('/branches/' + branchId + '/schools');
        // branchSchoolsList.push(schoolId);
    }

    deleteBranch(branchId: string){
        this.af.database.object('/branches/' + branchId).remove();
    }
}
