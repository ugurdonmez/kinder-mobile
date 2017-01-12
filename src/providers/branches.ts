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
        //this comment will be deleted when this method is completed

        let branchCursors : any[] = [];
        var userId = this.authData.getUserId();

        var user_branch_ids = this.af.database.list('/user-branches/'+userId, {preserveSnapshot: true});
        // console.log("user_branch_ids:");
        // console.log(user_branch_ids);


        var branchIds;
        // console.log("icindekiler");
        // user_branch_ids.subscribe(snapshots=>console.log(snapshots));
        user_branch_ids.subscribe(snapshots=>{
            snapshots.forEach(
                snapshot=>{
                    // console.log(snapshot.val().branchId);
                    branchCursors.push(snapshot.val().branchId);
                });
            // console.log("branchCursors:")
            // console.log(branchCursors)
            callback(branchCursors)
        }
        )







        // user_branch_ids.subscribe(snapshots=>{
        //     snapshots.forEach(snapshot=>{
        //
        //         console.log(snapshot.val);
        //     })
        // });

        // user_branch_ids.subscribe(snapshots=>{
        //     snapshots.forEach(snapshot=>{
        //         let key = snapshot.val
        //         console.log("key: "+key);
        //         var userBranchSnapshot = this.af.database.object('/branches/', {preserveSnapshot: false})
        //         branchCursors.push(userBranchSnapshot)
        //
        //     }
        //     )
        // }
        // );

        // console.log("branchCursors:");
        // console.log(branchCursors);
        //
        // console.log("branches:");
        // var branchData;
        // for (branchData in branchCursors){
        //     console.log(branchData);
        // }
        // branchCursors.subscribe(
        //     snapshots=>{
        //         snapshots.forEach(snapshot=>
        //         {
        //             console.log(snapshot.val);
        //         })
        //     }
        // )
        // for (let user_branch_id of user_branch_ids)
        // {
        //
        // }
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
