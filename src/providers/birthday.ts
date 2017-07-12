import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';
import {AuthData} from "./auth-data";
import {Parents} from "./parents";
import {ParentModel} from "../models/parent-model";

@Injectable()
export class Birthday {

    constructor(public af: FirebaseApp, private authDataProvider: AuthData, private parentsProvider: Parents){
    }

    // TODO if we use subscribe, this function can't return. if not subscribe, we can't query the birthdays.
    // not using angularfire2 might be a solution. query with ".child('studentBirthDate')" might work in firebase library.
    // also, we can subscribe here and use callback, but it's redundant.
    // in this case, retrieving the birthdays should be handled on the front-end.
    // returns students of class.
    public getBirthdays(classId) : Promise<ParentModel[]>{
        return this.parentsProvider.getParentsOfClass(classId)
    }
}
