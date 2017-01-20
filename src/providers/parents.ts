import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {ParentModel} from '../models/parent-model';
import { AuthData } from './auth-data';

@Injectable()
export class Parents {

    parents: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.parents = af.database.list('/parents');
    }

    public getParent(parentId: string) {
        return this.af.database.object('/parents/' + parentId);
    }

    public addParent(parent: ParentModel) {
        this.parents.push(parent);
    }

    public updateParent(parent: ParentModel) {
        this.af.database.object('/parents/'+parent.id).set(parent);
    }
}
