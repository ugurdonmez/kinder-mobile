import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {TeacherModel} from '../models/teacher-model';
import { AuthData } from './auth-data';

@Injectable()
export class Teachers {

    teachers: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.teachers = af.database.list('/teachers');
    }

    // TODO ugur hoca'nin github'dan issue #6'ya verecegi yanita gore geri eklenebilir
    // public getUserTeachers(callback) {
    //     let teacherCursors : any[] = [];
    //     var userId = this.authData.getUserId();
    //
    //     var user_teacher_ids = this.af.database.list('/user-teachers/'+userId, {preserveSnapshot: true});
    //     // console.log("user_teacher_ids:");
    //     // console.log(user_teacher_ids);
    //
    //     user_teacher_ids.subscribe(snapshots=>{
    //             snapshots.forEach(
    //                 snapshot=>{
    //                     // console.log(snapshot.val().teacherId);
    //                     teacherCursors.push(snapshot.val().teacherId);
    //                 });
    //             // console.log(teacherCursors)
    //             callback(teacherCursors)
    //         }
    //     )
    // }

    public getTeacher(teacherId: string) {
        return this.af.database.object('/teachers/' + teacherId);
    }

    public addTeacher(teacher: TeacherModel) {
        this.teachers.push(teacher);


        // TODO ugur hoca'nin github'dan issue #6'ya verecegi yanita gore asagidaki kisim geri eklenebilir
        // var teacherId = pushedTeacher.key;
        //console.log("teacherId: " + teacherId);
        // var userId = this.authData.getUserId();
        // var user_teachers = this.af.database.list('/user-teachers/'+userId);
        // user_teachers.push({'teacherId':teacherId});
    }

    public updateTeacher(teacher: TeacherModel) {
        this.af.database.object('/teachers/'+teacher.id).set(teacher);
    }
}
