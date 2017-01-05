import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {BranchModel} from '../models/branch-model';

@Injectable()
export class Branches {

    constructor(public http: Http) {
        console.log('Hello Branches Provider');
    }

    public getUserBranches() {

    }

    public getBranch(branchId: string) {

    }

    public addBranch(branch: BranchModel) {

    }

    public updateBranch(branch: BranchModel) {

    }
}
