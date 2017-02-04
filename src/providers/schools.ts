import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {SchoolModel} from '../models/school-model';
import { AuthData } from './auth-data';

@Injectable()
export class Schools {

    schools: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.schools = af.database.list('/schools');
    }

    public getSchool(schoolId: string) {
        return this.af.database.object('/schools/' + schoolId);
    }

    public getAllSchools(){
        return this.af.database.list('/schools/');
    }

    getSchoolsOfBranch(branchId: string){
        return this.af.database.list('/schools', {
            query: {
                orderByChild: 'branchId',
                equalTo: branchId
            }
        });
    }

    public addSchool(school: SchoolModel) {
        this.schools.push(school);
    }

    public updateSchool(school: SchoolModel) {
        this.af.database.object('/schools/'+school.id).set(school);
    }
}
