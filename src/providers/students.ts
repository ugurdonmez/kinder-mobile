import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {StudentModel} from '../models/student-model';
import { AuthData } from './auth-data';

@Injectable()
export class Students {

    students: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.students = af.database.list('/students');
    }

    public getStudent(studentId: string) {
        return this.af.database.object('/students/' + studentId);
    }

    public addStudent(student: StudentModel) {
        var pushedStudent = this.students.push(student);
    }

    public updateStudent(student: StudentModel) {
        this.af.database.object('/students/'+student.id).set(student);
    }
}
